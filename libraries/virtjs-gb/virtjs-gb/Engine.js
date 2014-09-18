import { Engine as BaseEngine }        from 'virtjs/core/Engine';
import { EmitterMixin }                from 'virtjs/mixins/EmitterMixin';
import { formatHexadecimal }           from 'virtjs/utils/FormatUtils';
import { createDefensiveProxy, mixin } from 'virtjs/utils/ObjectUtils';
import { preprocessMethods }           from 'virtjs/utils/PreprocessUtils';

import { CPU }         from './components/CPU';
import { GPU }         from './components/GPU';
import { IO }          from './components/IO';
import { MMU }         from './components/MMU';
import { Timer }       from './components/Timer';
import { mbcTypes }    from './tables/mbcTypes';
import { Environment } from './Environment';

export class Engine extends mixin( BaseEngine, EmitterMixin ) {

    constructor( options = { } ) {

        super( options );

        // TODO remove it

        this._options = options;

        // No environment at the beginning - we need to load() one later on

        this.environment = null;

        // Set screen size

        this.devices.screen.setInputSize( 160, 144 );

        // Instanciate engine components

        this.cpu   = new CPU   ( this );
        this.gpu   = new GPU   ( this );
        this.io    = new IO    ( this );
        this.mmu   = new MMU   ( this );
        this.timer = new Timer ( this );

        // These functions will be reinstrumented /and will lose their scopes/

        preprocessMethods( this, [
            'setIterationCountPerFrame',
            'setMaxSubIterations',
            'step',
            '_load',
            '_setupEnvironment'
        ], this._options );

    }

    _load( romBuffer, options ) {

        options = options || { };

        this.environment = this._createEnvironment( romBuffer, options );
        this.cartridge = this._createRomMBC( this.environment );

        this.cpu.setup( );
        this.gpu.setup( );
        this.io.setup( );
        this.timer.setup( );
        this.cartridge.setup( );
        this.mmu.setup( );

        if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'load' ) !== - 1 ) {
            this.emit( 'load' );
        }

    }

    step( ) {

        // If the user has specified a `maxSubIterations` option, we prevent the CPU from running more than this number in a single pass.

        if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations !== 'undefined' ) {

            this._continue = true;

            for ( var t = 0; this._status === 'running' && this._continue && t < this._options.maxSubIterations; ++ t ) {
                this.cpu.step( );
            }

        // If the user has specified a `iterationCountPerFrame` option, we execute this number of iterations at each frame (ie. will run until <N> vblank)

        } else if ( typeof preprocess !== 'undefined' && typeof preprocess.iterationCountPerFrame !== 'undefined' ) {

            this._disableFlush = true;

            for ( var t = 0, T = this._options.iterationCountPerFrame; t < T && this._status === 'running'; ++ t ) {

                this._continue = true;

                while ( this._status === 'running' && this._continue ) {
                    this.cpu.step( );
                }

            }

            this._options.devices.screen.flushScreen( );

        // Finally, in a default case, the emulator will execute a single iteration (ie. will run until vblank)

        } else {

            this._continue = true;

            while ( this._status === 'running' && this._continue ) {
                //window.x && console.timeline( 'Frame Loop' );
                this.cpu.step( );
                //window.x && console.timelineEnd( 'Frame Loop' );
            }

            //window.x && ( window.x -= 1 );

        }

    }

    disassembleAt( address ) {

        try {
            var opcode = this.mmu.readUint8( address );
            var instruction = this.cpu._opcodeMaps.unprefixed[ opcode ];
        } catch ( e ) {
            var infos = { size : 1, label : '<corrupted : cannot fetch opcode>' };
        }

        if ( ! infos ) try { // In some cases, an instruction may be corrupted
            var infos = instruction ? instruction.xDefinition.debug.call( this._cpu, address + 1 ) : { size : 1, label : '<corrupted : null instruction>' };
        } catch ( e ) { // Since we're debugging, we shouldn't fail
            var infos = { size : 1, label : '<corrupted : ' + e.message + '>' };
        }

        infos.address = address;
        infos.opcode = [ ];

        for ( var offset = 0; offset < infos.size; ++ offset )
            infos.opcode.push( this.byteAt( address + offset ) );

        return infos;

    }

    byteAt( address ) {

        try {
            return this.mmu.readUint8( address );
        } catch ( e ) {
            return NaN;
        }

    }

    setMaxSubIterations( maxSubIterations ) {

        if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations === 'undefined' )
            throw new Error( 'Cannot change the sub iteration limit of this engine - please set maxSubIterations to non-nil at creation' );

        this._options.maxSubIterations = maxSubIterations;

    }

    setIterationCountPerFrame( iterationCountPerFrame ) {

        if ( typeof preprocess !== 'undefined' && typeof preprocess.iterationCountPerFrame === 'undefined' )
            throw new Error( 'Cannot change the iteration count per frame of this engine - please set iterationCountPerFrame to non-nil at creation' );

        this._options.iterationCountPerFrame = iterationCountPerFrame;

    }

    _createRomMBC( environment ) {

        var mbcType = environment.rom[ 0x0147 ];

        if ( ! mbcTypes[ mbcType ] )
            throw new Error( 'Unexpected MBC type (' + formatHexadecimal( mbcType, 8 ) + ')' );

        return new ( mbcTypes[ mbcType ] )( this );

    }

    _createEnvironment( romBuffer, options ) {

        if ( options && options.environment )
            return options.environment;

        return this._setupEnvironment( new Environment( romBuffer, options || { } ) );

    }

    _setupEnvironment( environment ) {

        if ( typeof preprocess === 'undefined' || ! preprocess.skipBios )
            return environment;

        // A register -> 0x01 : DMG  |  0x11 : CGB  |  0xFF : MGB

        environment.a[ 0 ] = 0x01;
        environment.f[ 0 ] = 0xb0;

        environment.b[ 0 ] = 0x00;
        environment.c[ 0 ] = 0x13;

        environment.d[ 0 ] = 0x00;
        environment.e[ 0 ] = 0xD8;

        environment.h[ 0 ] = 0x01;
        environment.l[ 0 ] = 0x4d;

        environment.pc[ 0 ] = 0x0100;
        environment.sp[ 0 ] = 0xfffe;

        environment.mmuBiosLocked = true;

        return environment;

    }

};
