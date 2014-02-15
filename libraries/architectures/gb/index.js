/*global Virtjs, define, preprocess*/

define( [

    './sources/CPU',
    './sources/GPU',
    './sources/IO',
    './sources/MMU',
    './sources/Timer',

    './sources/bios'

], function ( CPU, GPU, IO, MMU, Timer, bios ) {

    Virtjs.engine.GameBoy = Virtjs.Engine.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( ) {

            Virtjs.Engine.prototype.initialize.apply( this, arguments );

            this._options.screen.setSize( 160, 144 );

            this._cpu = new CPU( this );
            this._gpu = new GPU( this );
            this._io  = new IO( this );
            this._mmu = new MMU( this );
            this._timer = new Timer( this );

            // This line will setup the right branches when used by the build tool
            Virtjs.DebugUtil.preprocessFunction( this, 'load', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'setMaxSubIterations', this._options );

        },

        setup : function ( ) {

            // BIOS
            this._bios = new Uint8Array( bios );

            // ROM
            this._rom = new Uint8Array( 32768 );

            // Working RAM
            this._wram = new Uint8Array( 8192 );

            // External RAM
            this._eram = new Uint8Array( 8192 );

            // Zero-page RAM
            this._zram = new Uint8Array( 128 );

            // CPU, GPU, MMU & IO Setup
            this._cpu.setup( );
            this._gpu.setup( );
            this._mmu.setup( );
            this._io.setup( );
            this._timer.setup( );

        },

        load : function ( buffer ) {

            this._mmu._inBios = true;

            this._cpu._a[ 0 ] = 0x01;
            this._cpu._c[ 0 ] = 0x13;
            this._cpu._e[ 0 ] = 0xD8;

            this._cpu._pc[ 0 ] = 0x0000;
            this._cpu._sp[ 0 ] = 0xFFFE;

            var data = new Uint8Array( buffer );
            for ( var t = 0, T = data.length; t < T; ++ t )
                this._rom[ t ] = data[ t ];

            if ( typeof preprocess !== 'undefined' && preprocess.skipBios ) {

                this._mmu._inBios = false;
                this._cpu._pc[ 0 ] = 0x0100
;
            }

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'load' ) !== - 1 ) {
                this.emit( 'load' );
            }

        },

        step : function ( ) {

            this._continue = true;

            if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations !== 'undefined' ) {

                for ( var t = 0; this._status === 'running' && this._continue && t < this._options.maxSubIterations; ++ t ) {
                    this._cpu.step( );
                }

            } else {

                while ( this._status === 'running' && this._continue ) {
                    this._cpu.step( );
                }

            }

        },

        disassemble : function ( ) {

            var instructions = [ ];

            instructions.addressSize = 16;
            instructions.opcodeSize = 8;

            for ( var address = 0; address < this._rom.length; ) {

                var opcode = this._rom[ address ];
                var instruction = this._cpu._instructionMap.standard[ opcode ];

                if ( instruction ) {

                    instructions.push( {
                        address : address,
                        opcode : opcode,
                        instruction : instruction.instructionName
                    } );

                    address += instruction.instructionSize;

                } else {

                    address += 1;

                }

            }

            return instructions;

        },

        setMaxSubIterations : function ( maxSubIterations ) {

            if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations === 'undefined' )
                throw new Error( 'Cannot change the max sub iteration number of this engine - please set maxSubIterations to non-nil at creation' );

            this._options.maxSubIterations = maxSubIterations;

        }

    }, {

        RIGHT  : 0x21,
        LEFT   : 0x22,
        UP     : 0x24,
        DOWN   : 0x28,

        A      : 0x11,
        B      : 0x12,

        SELECT : 0x14,
        START  : 0x18

    } );

} );
