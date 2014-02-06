define( [

    'base',

    './sources/CPU',
    './sources/GPU',
    './sources/IO',
    './sources/MMU',

    './sources/bios'

], function ( Virtjs, CPU, GPU, IO, MMU, bios ) {

    return Virtjs.Engine.extend( {

        initialize : function ( ) {

            Virtjs.Engine.prototype.initialize.apply( this, arguments );

            this._options.screen.setSize( 160, 144 );

            this._cpu = new CPU( this );
            this._gpu = new GPU( this );
            this._io  = new IO( this );
            this._mmu = new MMU( this );

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

            if ( this._options.skipBios ) {

                this._mmu._inBios = false;
                this._cpu._pc[ 0 ] = 0x0100;

            }

        },

        step : function ( ) {

            this._continue = true;

            while ( this._continue ) {

                this._cpu.step( );
                this._gpu.step( );

            }

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
