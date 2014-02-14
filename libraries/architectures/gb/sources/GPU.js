/*global Virtjs, define, preprocess*/

define( [

    './gpu/StateMachine'

], function ( StateMachine ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // Creates the state machine which will manage clock rendering
            this._states = new StateMachine( this );

            // Creates palettes
            this._palettes = [ ];
            for ( var t = 0; t < 4; ++ t )
                this._palettes[ t ] = null;

            // Creates tilesets (only 32*8, the last 8 dimension being created during setup)
            this._tilesets = [ ];
            for ( var t = 0; t < 32 * 32; ++ t ) {
                this._tilesets[ t ] = [ ];
                for ( var y = 0; y < 8; ++ y ) {
                    this._tilesets[ t ][ y ] = null;
                }
            }

            // Creates sprite structures (40)
            this._sprites = [ ];
            for ( var t = 0; t < 40; ++ t ) {
                this._sprites[ t ] = {
                    x        : null,
                    y        : null,
                    tile     : null,
                    palette  : null,
                    xflip    : null,
                    yflip    : null,
                    priority : null
                };
            }

            // Creates the temporary scanline buffer
            // We're using 2 bytes per pixel to store both the palette color and the palette index
            this._scanline = new Uint16Array( 160 );

            // Bind mappers in order to keep the context when passing them around
            this._settingsMapper_           = this._settingsMapper.bind( this );
            this._lcdStatusMapper_          = this._lcdStatusMapper.bind( this );
            this._scrollMapper_X_           = this._scrollMapper.bind( this, 0 );
            this._scrollMapper_Y_           = this._scrollMapper.bind( this, 1 );
            this._lineMapper_               = this._lineMapper.bind( this );
            this._oamDmaMapper_             = this._oamDmaMapper.bind( this );
            this._paletteMapper_Background_ = this._paletteMapper.bind( this, 0 );
            this._paletteMapper_Sprite1_    = this._paletteMapper.bind( this, 1 );
            this._paletteMapper_Sprite2_    = this._paletteMapper.bind( this, 2 );
            this._oamMapper_                = this._oamMapper.bind( this );
            this._vramMapper_               = this._vramMapper.bind( this );

        },

        setup : function ( ) {

            // State Machine
            this._states.setup( );

            // Background Scroll Registers
            this._scrolls = new Uint8Array( 2 );

            // Video RAM
            this._vram = new Uint8Array( 8 * 1024 );

            // Sprite Informations
            this._oam = new Uint8Array( 160 );

            // Background Palettes
            for ( var paletteIndex = 0, paletteCount = this._palettes.length; paletteIndex < paletteCount; ++ paletteIndex )
                this._palettes[ paletteIndex ] = new Uint8Array( 4 );

            // Tilesets Unpacking
            for ( var tilesetIndex = 0, tilesetCount = this._tilesets.length; tilesetIndex < tilesetCount; ++ tilesetIndex )
                for ( var rowIndex = 0, rowCount = 8; rowIndex < rowCount; ++ rowIndex )
                    this._tilesets[ tilesetIndex ][ rowIndex ] = new Uint8Array( 8 );

            // Sprite Unpacking
            for ( var t = 0, T = this._oam.length; t < T; ++ t )
                this._updateSprite( t );

            // GPU Options
            this._unpackSettings( 0 );

        },

        step : function ( ) {

            // We forward the cycle management to the GPU state machine
            this._states.step( this._engine._cpu._m[ 0 ] );

        },

        settingsMapping : function ( address ) {

            if ( address === 0x00 )
                return [ this._settingsMapper_, address ];

            if ( address === 0x01 )
                return [ this._lcdStatusMapper_, address ];

            if ( address === 0x02 )
                return [ this._scrollMapper_Y_, address ];

            if ( address === 0x03 )
                return [ this._scrollMapper_X_, address ];

            if ( address === 0x04 )
                return [ this._lineMapper_, address ];

            if ( address === 0x06 )
                return [ this._oamDmaMapper_, address ];

            if ( address === 0x07 )
                return [ this._paletteMapper_Background_, address ];

            if ( address === 0x08 )
                return [ this._paletteMapper_Sprite1_, address ];

            if ( address === 0x09 )
                return [ this._paletteMapper_Sprite2_, address ];

            return [ [ 0 ], 0 ];

            return [ Virtjs.MemoryUtil.unaddressable( 16 ), address ];

        },

        oamMapping : function ( address ) {

            return [ this._oamMapper_, address ];

        },

        vramMapping : function ( address ) {

            return [ this._vramMapper_, address ];

        },

        _settingsMapper : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._packSettings( );

            this._unpackSettings( value );

            return undefined;

        },

        _scrollMapper : function ( index, address, value ) {

            if ( typeof value === 'undefined' )
                return this._scrolls[ index ];

            this._scrolls[ index ] = value;

            return undefined;

        },

        _lcdStatusMapper : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                return this._states._mode;

            if ( value & 3 )
                throw new Error( 'Invalid write at ' + Virtjs.FormatUtil.address( user, 16 ) );

            return undefined;

        },

        _lineMapper : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                return this._states._line;

            throw new Error( 'Invalid write at ' + Virtjs.FormatUtil.address( user, 16 ) );

        },

        _oamDmaMapper : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                throw new Error( 'Invalid read at ' + Virtjs.FormatUtil.address( user, 16 ) );

            var start = value << 8;

            for ( var offset = 0; offset < 160; ++ offset ) {
                this._oam[ offset ] = this._engine._mmu.readUint8( start + offset );
                this._updateSprite( offset );
            }

            return undefined;

        },

        _paletteMapper : function ( index, address, value ) {

            if ( typeof value === 'undefined' )
                return this._packPalette( index );

            this._unpackPalette( index, value );

            return undefined;

        },

        _oamMapper : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                return this._oam[ address ];

            if ( this._enableLCD && ( this._states._mode === 2 || this._states._mode === 3 ) )
                return undefined;

            this._oam[ address ] = value;
            this._updateSprite( address );

            return undefined;

        },

        _vramMapper : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._vram[ address ];

            if ( this._enableLCD && ( this._states._mode === 3 ) )
                return undefined;

            this._vram[ address ] = value;
            this._updateTile( address );

            return undefined;

        },

        _packSettings : function ( ) {

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

        },

        _unpackSettings : function ( value ) {

            this._enableBackground  = ( value & ( 1 << 0 ) ) !== 0;
            this._enableSprites     = ( value & ( 1 << 1 ) ) !== 0;
            this._spriteSize        = ( value & ( 1 << 2 ) ) !== 0;
            this._backgroundMapBase = ( value & ( 1 << 3 ) ) !== 0;
            this._tilesetBase       = ( value & ( 1 << 4 ) ) !== 0;
            this._enableWindows     = ( value & ( 1 << 5 ) ) !== 0;
            this._windowTileMap     = ( value & ( 1 << 6 ) ) !== 0;
            this._enableLCD         = ( value & ( 1 << 7 ) ) !== 0;

        },

        _packPalette : function ( index, value ) {

            var palette = this._palettes[ index ];

            return (
                ( palette[ 0 ] << 0 ) |
                ( palette[ 1 ] << 2 ) |
                ( palette[ 2 ] << 4 ) |
                ( palette[ 3 ] << 6 )
            );

        },

        _unpackPalette : function ( index, value ) {

            var palette = this._palettes[ index ];

            palette[ 0 ] = ( value >> 0 ) & 0x3;
            palette[ 1 ] = ( value >> 2 ) & 0x3;
            palette[ 2 ] = ( value >> 4 ) & 0x3;
            palette[ 3 ] = ( value >> 6 ) & 0x3;

        },

        _resetVram : function ( ) {

            for ( var t = 0, T = this._vram.length; t < T; ++ t ) {
                this._vram[ t ] = 0;
            }

        },

        _updateTile : function ( address ) {

            // The row address
            var rowAddress = address & 0xFFFE;

            // Fetch the tile index inside the tile map ([0;384[)
            //  - rowAddress >> 4 : "divide by 16 then floor", since there is 16 bytes per tile
            var tileIndex = rowAddress >> 4;

            // Fetch the row index inside the tile ([0;8[)
            //  - rowAdress >> 1 : we remove the last bit, and get the row index inside the _whole map_
            //  - PREVIOUS & 0b111 (0x7) : "modulo 8" operation, since there is 8 rows per tile
            var y = ( rowAddress >> 1 ) & 0x7;

            for ( var x = 0; x < 8; ++ x ) {

                var mask = 1 << ( 7 - x );

                this._tilesets[ tileIndex ][ y ][ x ] =
                    ( this._vram[ rowAddress + 0 ] & mask ? 0x1 : 0 ) |
                    ( this._vram[ rowAddress + 1 ] & mask ? 0x2 : 0 )
                ;

            }

        },

        _updateSprite : function ( address ) {

            var sprite = this._sprites[ address >> 2 ];
            var value = this._oam[ address ];

            switch ( address & 0x3 ) {

                case 0 : sprite.y = value - 16; break ;
                case 1 : sprite.x = value - 8;  break ;
                case 2 : sprite.tile = value;   break ;

                case 3 : sprite.palette = value & 0x10 ? 1 : 0;
                /*and*/  sprite.xflip = value & 0x20 ? true : false;
                /*and*/  sprite.yflip = value & 0x40 ? true : false;
                /*and*/  sprite.priority = value & 0x80 ? 1 : 0;

            }

        },

        _hblank : function ( line ) {

            if ( this._enableLCD && this._enableBackground ) {
                this._backgroundScanline( this._scanline, line );
            } else for ( var x = 0, X = this._scanline.length; x < X; ++ x ) {
                this._scanline[ x ] = 0x00FF;
            }

            if ( this._enableLCD && this._enableSprites ) {
                this._spritesScanline( this._scanline, line );
            }

            for ( var x = 0, y = line, X = this._scanline.length; x < X; ++ x ) {

                var trueColor = this._scanline[ x ] & 0xFF;

                this._engine._options.screen.setPixel( x, y, [
                    trueColor, trueColor, trueColor
                ] );

            }

        },

        _vblank : function ( ) {

            this._engine._cpu._interruptions[ 1 ] |= 0x01;

            this._engine._options.screen.flushScreen( );

            this._engine._continue = false;

        },

        _backgroundScanline : function ( scanline, line ) {

            // Fetch the background map base, which depends on a CPU flag
            var mapBase = this._backgroundMapBase ? 0x1C00 : 0x1800;

            // Fetch the offset of the first tile, which depends on a CPU flag
            var tilesOffset = this._tilesetBase ? 0 : 129;

            // Compute the actual position of the pixel in the world (i.e. taking the scroll into count)
            var actualY = ( this._scrolls[ 1 ] + line ) & 0xFF;

            // Fetch the top-left mapping coordinates
            // Note that these coordinates will be <= than the pixel
            //  - actualY >> 3 : "divide by 8 then floor", since there is 8 lines/columns per tile
            //  - PREVIOUS << 5 : "multiply per 32", since there is 32 mappings per line, and that a mapping is a single byte
            var mapOffsetY = ( actualY >> 3 ) << 5;

            // Fetch the pixel coordinates relative to the top-left tile
            //  - VALUE & 0b111 (0x7) : "modulo 8", since there is 8 lines/columns per tile
            var tileY = actualY & 0x7;

            // The first palette is the background palette
            var palette = this._palettes[ 0 ];

            for ( var x = 0; x < 160; ++ x ) {

                // Same computations than before, but for X coordinates
                var actualX = ( this._scrolls[ 0 ] + x ) & 0xFF;
                var mapOffsetX = ( actualX >> 3 ) & 31;
                var tileX = actualX & 0x7;

                // Knowing the map offset, we can fetch the tile index
                var mapOffset = mapBase + mapOffsetY + mapOffsetX;
                var tileIndex = this._vram[ mapOffset ];

                var paletteIndex = this._tilesets[ tilesOffset + tileIndex ][ tileY ][ tileX ];
                var trueColor = ( { 0 : 255, 1 : 192, 2 : 96, 3 : 0 } )[ palette[ paletteIndex ] ];

                scanline[ x ] = ( paletteIndex << 8 ) | trueColor;

            }

        },

        _spritesScanline: function ( scanline, line ) {

            for ( var t = 0, T = this._sprites.length; t < T; ++ t ) {

                var sprite = this._sprites[ t ];

                if ( sprite.y + 8 <= line || sprite.y > line )
                    continue ;

                var palette = this._palettes[ 1 + sprite.palette ];

                var tileRow = sprite.yflip ?
                    this._tilesets[ sprite.tile ][ 7 - ( line - sprite.y ) ] :
                    this._tilesets[ sprite.tile ][ 0 + ( line - sprite.y ) ]
                ;

                for ( var tileX = 0; tileX < 8; ++ tileX ) {

                    var x = sprite.x + tileX;

                    if ( x < 0 || x >= 160 )
                        continue ;

                    var actualTileX = sprite.xflip ? 7 - tileX : tileX;
                    var paletteIndex = tileRow[ actualTileX ];
                    var trueColor = ( { 0 : 255, 1 : 192, 2 : 96, 3 : 0 } )[ palette[ paletteIndex ] ];

                    if ( tileRow[ actualTileX ] === 0 )
                        continue ;

                    if ( scanline[ x ] & 0xFF00 && ! sprite.priority )
                        continue ;

                    scanline[ x ] = ( paletteIndex << 8 ) | trueColor;

                }

            }

        }

    } );

} );
