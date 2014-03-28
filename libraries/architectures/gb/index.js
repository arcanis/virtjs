/*global module, Virtjs, define, preprocess*/

define( [

    'virtjs',

    './sources/mbc/Table',

    './sources/CPU',
    './sources/GPU',
    './sources/IO',
    './sources/MMU',
    './sources/Timer',

    './sources/bios'

], function ( Virtjs, MBCTable, CPU, GPU, IO, MMU, Timer, bios ) {

    return Virtjs.Engine.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( ) {

            Virtjs.Engine.prototype.initialize.apply( this, arguments );

            this._options.screen.setInputSize( 160, 144 );

            this._cpu = new CPU( this );
            this._gpu = new GPU( this );
            this._io  = new IO( this );
            this._mmu = new MMU( this );
            this._timer = new Timer( this );

            // It kinda sucks, be the load function will not be able to access the MBCTable anymore after being preprocessed, so we keep it safe here
            this._mbcTable = MBCTable;

            // This line will setup the right branches when used by the build tool
            Virtjs.DebugUtil.preprocessFunction( this, 'load', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'setMaxSubIterations', this._options );

        },

        setup : function ( ) {

            // BIOS
            this._bios = new Uint8Array( bios );

            // Cartridge (instanciated by .load)
            this._cartridge = null;

            // Working RAM
            this._wram = new Uint8Array( 8192 );

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

            var data = new Uint8Array( buffer );
            var mbcType = data[ 0x0147 ];
            this._cartridge = new ( this._mbcTable[ mbcType ] )( data.buffer );

            if ( typeof preprocess !== 'undefined' && preprocess.skipBios ) {

                this._cpu._a[ 0 ] = 0x11; // 0x01 : DMG  |  0x11 : CGB  |  0xFF : MGB
                this._cpu._f[ 0 ] = 0xb0;

                this._cpu._b[ 0 ] = 0x00;
                this._cpu._c[ 0 ] = 0x13;

                this._cpu._d[ 0 ] = 0x00;
                this._cpu._e[ 0 ] = 0xD8;

                this._cpu._h[ 0 ] = 0x01;
                this._cpu._l[ 0 ] = 0x4d;

                this._cpu._pc[ 0 ] = 0x0100;
                this._cpu._sp[ 0 ] = 0xfffe;

                this._mmu._inBios = false;
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
                var instruction = this._cpu._instructionMaps.unprefixed[ opcode ];

                try {
                    var infos = instruction ? instruction.xDefinition.debug.call( this._cpu, address + 1 ) : null;
                } catch ( e ) {
                    var infos = { size : 1, label : '<corrupted : ' + e.message + '>' };
                }

                var label = infos ? infos.label : '-';
                var size  = infos ? infos.size : 1;

                instructions.push( {
                    address : address,
                    opcode : opcode,
                    label : label
                } );

                address += size;

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
