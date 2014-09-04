import { JIT }                  from 'virtjs/core/jit/JIT';
import { PageSet }              from 'virtjs/core/jit/PageSet';
import { ReadOnlyPage }         from 'virtjs/core/jit/ReadOnlyPage';
import { VersionedPage }        from 'virtjs/core/jit/VersionedPage';
import { Engine as BaseEngine } from 'virtjs/core/Engine';
import { EmitterMixin }         from 'virtjs/mixins/EmitterMixin';
import { mixin }                from 'virtjs/utils/ObjectUtils';

import { Compiler }             from 'virtjs-gbjit/Compiler';
import { Environment }          from 'virtjs-gbjit/Environment';
import { GPU }                  from 'virtjs-gbjit/GPU';
import { KeyIO }                from 'virtjs-gbjit/KeyIO';
import { MMU }                  from 'virtjs-gbjit/MMU';
import { fixRomSize }           from 'virtjs-gbjit/tools';

export var inputs = {

    RIGHT  :  0x21,
    LEFT   :  0x22,
    UP     :  0x24,
    DOWN   :  0x28,

    A      :  0x11,
    B      :  0x12,

    SELECT :  0x14,
    START  :  0x18

};

export class Engine extends mixin( BaseEngine, EmitterMixin ) {

    constructor( { testMode, devices, advanced = { }, events = [ ] } = { } ) {

        super( );

        this._startEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._stopEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._instructionEvent = !!~events.indexOf( 'instruction' ) ? { } : null;
        this._postInstructionEvent = !!~events.indexOf( 'instruction' ) ? { } : null;
        this._setupEvent = !!~events.indexOf( 'setup' ) ? { } : null;

        this._enableJitLoop = advanced.enableJitLoop;
        this._monoInstructionBlocks = advanced.monoInstructionBlocks;

        this.screen = devices.screen;
        this.timer = devices.timer;

        this._gpu = new GPU( {
            screen : devices.screen
        } );

        this._keyio = new KeyIO( {
            input : devices.input
        } );

        this._mmu = new MMU( {
            events : events
        } );

        this._compiler = new Compiler( {
            testMode : testMode,
            emitEvents : this._instructionEvent ? true : false,
            monoInstructionBlocks : this._monoInstructionBlocks
        } );

        this._jit = new JIT( {
            enableLoop : this._enableJitLoop
        } );

        this._compiler.link( {
            mmu : this._mmu
        } );

        this._jit.link( {
            compiler : this._compiler
        } );

        this._mmu.link( {
            keyio : this._keyio,
            gpu : this._gpu,
            jit : this._jit
        } );

        this._gpu.link( {
            mmu : this._mmu
        } );

        this._jit.declarePageSet( 'rom00', 0x0000, 0x3FFF, VersionedPage );
        this._jit.declarePageSet( 'romNN', 0x4000, 0x7FFF, PageSet.bind( null, VersionedPage ) );
        this._jit.declarePageSet( 'misc0', 0x8000, 0x9FFF, VersionedPage );
        this._jit.declarePageSet( 'ramNN', 0xA000, 0xBFFF, PageSet.bind( null, VersionedPage ) );
        this._jit.declarePageSet( 'misc1', 0xC000, 0xFFFF, VersionedPage );

        this._runTimer = null;

    }

    setup( environment ) {

        this.environment = environment;
        this.environment.engine = this;

        this.environment.exit = ( jit ) => { this.stop( ); }

        this.environment.readUint8 = ( address ) => this._mmu.readUint8( address );
        this.environment.writeUint8 = ( address, value ) => this._mmu.writeUint8( address, value );

        this.environment.triggerInstructionEvent = ( address, opcode ) => this._triggerInstructionEvent( address, opcode );
        this.environment.triggerPostInstructionEvent = ( address, opcode ) => this._triggerPostInstructionEvent( address );
        this.environment.triggerInterrupts = ( retAddress ) => this._triggerInterrupts( retAddress );
        this.environment.triggerGpuCycle = ( ) => this._gpu.nextMode( );

        this._jit.setup( this.environment );
        this._gpu.setup( this.environment );
        this._keyio.setup( this.environment );
        this._mmu.setup( this.environment );

        this._jit.jumpTo( this.environment.pc );

        if ( this._setupEvent ) {
            this.emit( 'setup', this._setupEvent );
        }

    }

    loadArrayBuffer( arrayBuffer, { autostart = true } = { } ) {

        this.setup( new Environment( {
            romBuffer : fixRomSize( arrayBuffer )
        } ) );

        if ( autostart ) {
            this.run( );
        }

    }

    disassembleAt( address ) {

        return this._compiler.disassembleAt( address );

    }

    isRunning( ) {

        return this._runTimer !== null;

    }

    stop( ) {

        if ( ! this._runTimer )
            return ;

        this._jit.stop( );

        this.timer.cancelTick( this._runTimer );
        this._runTimer = null;

        if ( this._stopEvent ) {
            this.emit( 'stop', this._stopEvent );
        }

    }

    run( ) {

        if ( this._runTimer )
            return ;

        var run = ( ) => {

            this._runTimer = this.timer.nextTick( run );

            this._jit.resume( );

        };

        if ( this._startEvent )
            this.emit( 'start', this._startEvent );

        run( );

    }

    _triggerInterrupts( retAddress ) {

        var enabledInterrupts = this.environment.enabledInterrupts;
        var pendingInterrupts = this.environment.pendingInterrupts;
        var firedInterrupts = pendingInterrupts & enabledInterrupts;

        // Triggering an interrupt silences the IME flag

        this.environment.cpuInterruptFeature = false;

        // If multiple interrupts should trigger at the same time (multiple bits set), only the first one is executed

        /**/ if ( firedInterrupts & 0x01 ) var bit = 0;
        else if ( firedInterrupts & 0x02 ) var bit = 1;
        else if ( firedInterrupts & 0x04 ) var bit = 2;
        else if ( firedInterrupts & 0x08 ) var bit = 3;
        else if ( firedInterrupts & 0x10 ) var bit = 4;
        else if ( firedInterrupts & 0x20 ) var bit = 5;
        else if ( firedInterrupts & 0x40 ) var bit = 6;
        else if ( firedInterrupts & 0x80 ) var bit = 7;

        // We reset the interrupt flag so it won't be called again (until the next triggering)

        this.environment.pendingInterrupts ^= 1 << bit;

        // Then we execute the RST instruction (cf RST_u8 in compiler/javascript.js)

        this.environment.sp = ( this.environment.sp - 2 ) & 0xFFFF;
        this._mmu.writeUint8( this.environment.sp + 0, retAddress >>> 8 );
        this._mmu.writeUint8( this.environment.sp + 1, retAddress & 0xFF );

        if ( ( this.environment.gpuClock -= 4 ) <= 0 ) {
            if ( this.environment.triggerGpuCycle( ) ) {
                this._jit.stop( );
            }
        }

        switch ( bit ) {
        case 0: return 0x0040;
        case 1: return 0x0048;
        case 2: return 0x0050;
        case 3: return 0x0060;
        default: throw bit;
        }

    }

    _triggerInstructionEvent( address, opcode ) {

        this._instructionEvent.address = address;
        this._instructionEvent.opcode = opcode;
        this._instructionEvent.breakRequested = false;
        this.emit( 'instruction', this._instructionEvent );

        return this._instructionEvent;

    }

};
