import { Engine as BaseEngine } from 'virtjs/core/Engine';
import { JIT }                  from 'virtjs/core/JIT';
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

    constructor( { testMode, devices, events = [ ] } = { } ) {

        this._instructionEvent = !!~events.indexOf( 'instruction' ) ? { } : null;
        this._setupEvent = !!~events.indexOf( 'setup' ) ? { } : null;

        this.screen = devices.screen;

        this._gpu = new GPU( {
            screen : devices.screen
        } );

        this._keyio = new KeyIO( {
            input : devices.keys
        } );

        this._mmu = new MMU( {
        } );

        this._compiler = new Compiler( {
            testMode : testMode,
            emitEvents : this._instructionEvent
        } );

        this._mmu.link( {
            keyio : this._keyio,
            gpu : this._gpu
        } );

        this._gpu.link( {
            mmu : this._mmu
        } );

        this._compiler.link( {
            mmu : this._mmu
        } );

        this._runTimer = null;

    }

    setup( environment ) {

        this.environment = environment;
        environment.engine = this;

        environment.exit = ( jit ) => { this.stop( ); }

        environment.readUint8 = ( address ) => this._mmu.readUint8( address );
        environment.writeUint8 = ( address, value ) => this._mmu.writeUint8( address, value );

        environment.triggerInstructionEvent = ( address, opcode ) => this._triggerInstructionEvent( address, opcode );
        environment.triggerInterrupts = ( retAddress ) => this._triggerInterrupts( retAddress );
        environment.triggerGpuCycle = ( ) => this._gpu.nextMode( );

        this._gpu.setup( environment );
        this._keyio.setup( environment );
        this._mmu.setup( environment );

        this._jit = new JIT( this._compiler, environment );
        this._jit.jumpTo( environment.pc );

        if ( this._setupEvent ) {
            this.emit( 'setup', this._setupEvent );
        }

    }

    loadBuffer( buffer, { autostart } = { } ) {

        this.setup( new Environment( {
            romBuffer : fixRomSize( buffer )
        } ) );

        if ( autostart ) {
            this.run( );
        }

    }

    disassembleAt( address ) {

        this._compiler.disassembleAt( address );

    }

    stop( ) {

        if ( this._jit )
            this._jit.stop( );

        window.cancelAnimationFrame( this._runTimer );

    }

    run( ) {

        var run = ( ) => {

            this._runTimer = window.requestAnimationFrame( run );

            this._jit.continue( );

        };

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
