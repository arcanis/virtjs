define( [

    'virt.js/gb/CPU',
    'virt.js/gb/GPU',
    'virt.js/gb/MMU',

    'virt.js/gb/bios'

], function ( CPU, GPU, MMU, bios ) {

    var Engine = function ( options ) {

        this._options = options;

        this._options.screen.setSize( 160, 144 );

        this._cpu = new CPU( this );
        this._gpu = new GPU( this );
        this._mmu = new MMU( this );

    };

    Engine.prototype.initialize = function ( ) {

        // BIOS
        this._bios = new Uint8Array( bios );

        // ROM
        this._rom = new Uint8Array( 8192 );

        // Working RAM
        this._wram = new Uint8Array( 8192 );

        // External RAM
        this._eram = new Uint8Array( 8192 );

        // Zero-page RAM
        this._zram = new Uint8Array( 128 );

        // Immediate Enable Flag
        this._ime = new Uint8Array( 1 );

    };

    Engine.prototype.load = function ( buffer ) {

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

    };

    Engine.prototype.cycle = function ( ) {

        this._continue = true;

        while ( this._continue ) {

            this._cpu.cycle( );
            this._gpu.cycle( );

        }

    };

    return Engine;

} );
