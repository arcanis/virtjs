define( [

    'virt.js/virt/Format',

    'virt.js/gb/gpu/StateMachine'

], function ( Format, StateMachine ) {

    var GPU = function ( engine ) {

        this._engine = engine;

        // GPU Options
        this._unpackFlags( 0 );

        // Creates tilesets
        this._tileset = [ ];
        for ( var t = 0; t < 32 * 32; ++ t ) {
            this._tileset[ t ] = [ ];
            for ( var y = 0; y < 8; ++ y ) {
                this._tileset[ t ][ y ] = new Uint8Array( 8 );
            }
        }

        // Background Scroll Registers
        this._scrollX = new Uint8Array( 1 );
        this._scrollY = new Uint8Array( 1 );

        // Background Palettes
        this._palettes = new Uint8Array( 4 );

        // Current Scanline
        this._scanline = new Uint8Array( 1 );

        // Video RAM
        this._vram = new Uint8Array( 8 * 1024 );

        // GPU State Machine
        this._states = new StateMachine( this );

    };

    GPU.prototype.cycle = function ( ) {

        // We forward the cycle management to the GPU state machine
        this._states.step( this._engine._cpu._m[ 0 ] );

    };

    GPU.prototype.settingMapping = function ( user, address ) {

        if ( address === 0x00 )
            return this._flagMapper.bind( this, user, address );

        if ( address === 0x01 )
            return [ [ 0 ], 0 ];

        if ( address === 0x02 )
            return this._scrollYMapper.bind( this, user, address );

        if ( address === 0x03 )
            return this._scrollXMapper.bind( this, user, address );

        if ( address === 0x04 )
            return this._scanlineMapper.bind( this, user, address );

        if ( address === 0x07 )
            return this._paletteMapper.bind( this, user, address );

        throw new Error( 'Invalid memory address (' + Format.address( user, 2 ) + ')' );

    };

    GPU.prototype.vramMapping = function ( user, address ) {

        return this._vramMapper.bind( this, user, address );

    };

    GPU.prototype._flagMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._packFlags( );

        this._unpackFlags( value );

        return undefined;

    };

    GPU.prototype._scrollXMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._scrollX[ 0 ];

        this._scrollX[ 0 ] = value;

        return undefined;

    };

    GPU.prototype._scrollYMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._scrollY[ 0 ];

        this._scrollY[ 0 ] = value;

        return undefined;

    };

    GPU.prototype._scanlineMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._states._line;

        throw new Error( 'Invalid write at ' + Format.address( user, 2 ) );

    };

    GPU.prototype._paletteMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._packPalettes( );

        this._unpackPalettes( value );

        return undefined;

    };

    GPU.prototype._vramMapper = function ( user, address, value ) {

        if ( typeof value === 'undefined' )
            return this._vram[ address ];

        this._vram[ address ] = value;
        this._updateTile( address );

        return undefined;

    };

    GPU.prototype._packFlags = function ( ) {

        return (

            ( this._enableBackground  ? 1 << 0 : 0 ) |
            ( this._enableSprites     ? 1 << 1 : 0 ) |
            ( this._spriteSize        ? 1 << 2 : 0 ) |
            ( this._backgroundMapBase ? 1 << 3 : 0 ) |
            ( this._tilesetBase       ? 1 << 4 : 0 ) |
            ( this._enableWindows     ? 1 << 5 : 0 ) |
            ( this._windowTileMap     ? 1 << 6 : 0 ) |
            ( this._enableLCD         ? 1 << 7 : 0 )

        );

    };

    GPU.prototype._unpackFlags = function ( value ) {

        this._enableBackground  = ( value & ( 1 << 0 ) ) !== 0;
        this._enableSprites     = ( value & ( 1 << 1 ) ) !== 0;
        this._spriteSize        = ( value & ( 1 << 2 ) ) !== 0;
        this._backgroundMapBase = ( value & ( 1 << 3 ) ) !== 0;
        this._tilesetBase          = ( value & ( 1 << 4 ) ) !== 0;
        this._enableWindows     = ( value & ( 1 << 5 ) ) !== 0;
        this._windowTileMap     = ( value & ( 1 << 6 ) ) !== 0;
        this._enableLCD         = ( value & ( 1 << 7 ) ) !== 0;

    };

    GPU.prototype._packPalettes = function ( ) {

        return (
            ( this._palettes[ 0 ] << 0 ) |
            ( this._palettes[ 1 ] << 2 ) |
            ( this._palettes[ 2 ] << 4 ) |
            ( this._palettes[ 3 ] << 6 )
        );

    };

    GPU.prototype._unpackPalettes = function ( value ) {

        this._palettes[ 0 ] = ( value >> 0 ) & 0x3;
        this._palettes[ 1 ] = ( value >> 2 ) & 0x3;
        this._palettes[ 2 ] = ( value >> 4 ) & 0x3;
        this._palettes[ 3 ] = ( value >> 6 ) & 0x3;

    };

    GPU.prototype._updateTile = function ( address ) {

        // The row address
        var rowAddress = address & ~0x0001;

        // Fetch the tile index inside the tile map ([0;384[)
        //  - rowAddress >> 4 : "divide by 16 then floor", since there is 16 bytes per tile
        var tileIndex = rowAddress >> 4;

        // Fetch the row index inside the tile ([0;8[)
        //  - rowAdress >> 1 : we remove the last bit, and get the row index inside the _whole map_
        //  - PREVIOUS & 0b111 (0x7) : "modulo 8" operation, since there is 8 rows per tile
        var y = ( rowAddress >> 1 ) & 0x7;

        for ( var x = 0; x < 8; ++ x ) {

            var mask = 1 << ( 7 - x );

            this._tileset[ tileIndex ][ y ][ x ] =
                ( this._vram[ address + 0 ] & mask ? 0x1 : 0 ) |
                ( this._vram[ address + 1 ] & mask ? 0x2 : 0 )
            ;

        }

    };

    GPU.prototype._hblank = function ( line ) {

        var actualX = this._scrollX[ 0 ];
        var actualY = ( line + this._scrollY[ 0 ] ) & 0xFF;

        // Fetch the top-left mapping coordinates
        // Note that these coordinates will be <= than the pixel
        //  - VALUE >> 3 : "divide by 8 then floor", since there is 8 lines/columns per tile
        var mapX = actualX >> 3;
        var mapY = actualY >> 3;

        // Compute the offset of the first mapping of the line being refreshed
        //   - mapsY << 5 : "multiply per 32", since there is 32 mappings per line, and that a mapping is a single byte
        //   - += PREVIOUS : we add this to the base map offset, which depends on a GPU flag
        var mapsOffset = this._backgroundMapBase ? 0x1C00 : 0x1800;
        mapsOffset += ( mapY << 5 ) + mapX;

        // Fetch the offset of the first tile, which depends on a CPU flag
        var tilesOffset = this._tilesetBase ? 0 : 129;

        // Fetch the pixel coordinates relative to the top-left tile
        //  - VALUE & 0b111 (0x7) : "modulo 8", since there is 8 lines/columns per tile
        var tileX = actualX & 0x7;
        var tileY = actualY & 0x7;

        for ( var x = 0, y = line; x < 160; ++ x ) {

            var tileIndex = this._vram[ mapsOffset ];

            var paletteColor = this._palettes[ this._tileset[ tilesOffset + tileIndex ][ tileY ][ tileX ] ];
            var trueColor = ( { 0 : 255, 1 : 192, 2 : 96, 3 : 0 } )[ paletteColor ];

            this._engine._options.screen.setPixel( x, y, [ trueColor, trueColor, trueColor ] );

            tileX += 1;

            if ( tileX === 8 ) {
                mapsOffset += 1;
                tileX = 0;
            }

        }

    };

    GPU.prototype._vblank = function ( ) {

        this._engine._options.screen.flushScreen( );

        this._engine._continue = false;

    };

    return GPU;

} );
