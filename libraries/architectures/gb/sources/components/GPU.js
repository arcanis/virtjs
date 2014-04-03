/*global define, preprocess*/

define( [

    'virtjs',

    './gpu/StateMachine'

], function ( Virtjs, StateMachine ) {

    var colors = { 0 : 255, 1 : 192, 2 : 96, 3 : 0 };

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // The GPU states are managed by a separate class - I find it much more readable

            this._states = new StateMachine( engine );

            // Creates a temporary scanline buffer (which does not hold a significant state, and is only used internally)

            this._scanline = new Uint16Array( 160 );

            // Creates all the mappers now, avoiding garbage collection

            this._settingsMapper       = [ this._settingsAccess.bind( this ),   null ];
            this._lcdStatusMapper      = [ this._lcdStatusAccess.bind( this ),  null ];
            this._scrollXMapper        = [ this._scrollAccess.bind( this, 0 ),  null ];
            this._scrollYMapper        = [ this._scrollAccess.bind( this, 1 ),  null ];
            this._lineMapper           = [ this._lineAccess.bind( this ),       null ];
            this._lycMapper            = [ this._lycAccess.bind( this ),        null ];
            this._oamDmaMapper         = [ this._oamDmaAccess.bind( this ),     null ];
            this._bgPaletteMapper      = [ this._paletteAccess.bind( this, 0 ), null ];
            this._sprite1PaletteMapper = [ this._paletteAccess.bind( this, 1 ), null ];
            this._sprite2PaletteMapper = [ this._paletteAccess.bind( this, 2 ), null ];

            this._oamMapper  = [ this._oamAccess.bind( this ),  null ];
            this._vramMapper = [ this._vramAccess.bind( this ), null ];

        },

        setup : function ( ) {

            // GPU sprites (40)
            // These sprites are only the internal representation of the oam (4 bytes per sprite)

            this._sprites = [ ];
            for ( var t = 0; t < 40; ++ t )
                this._sprites[ t ] = { };

            for ( var t = 0; t < 160 ; ++ t )
                this._updateSprite( t );

            this._states.setup( );

        },

        step : function ( time ) {

            // We forward the cycle management to the GPU state machine

            this._states.step( time );

        },

        settingsMapping : function ( address ) {

            if ( address === 0x00 )
                return this._settingsMapper;

            if ( address === 0x01 )
                return this._lcdStatusMapper;

            if ( address === 0x02 )
                return this._scrollYMapper;

            if ( address === 0x03 )
                return this._scrollXMapper;

            if ( address === 0x04 )
                return this._lineMapper;

            if ( address === 0x05 )
                return this._lycMapper;

            if ( address === 0x06 )
                return this._oamDmaMapper;

            if ( address === 0x07 )
                return this._bgPaletteMapper;

            if ( address === 0x08 )
                return this._sprite1PaletteMapper;

            if ( address === 0x09 )
                return this._sprite2PaletteMapper;

            return [ [ 0 ], 0 ];

            return [ Virtjs.MemoryUtil.unaddressable( 16 ), address ];

        },

        oamMapping : function ( address ) {

            this._oamMapper[ 1 ] = address;

            return this._oamMapper;

        },

        vramMapping : function ( address ) {

            this._vramMapper[ 1 ] = address;

            return this._vramMapper;

        },

        _settingsAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._packSettings( );

            this._unpackSettings( value );

        },

        _scrollAccess : function ( index, address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.gpuScrolls[ index ];

            this._engine.environment.gpuScrolls[ index ] = value;

        },

        _lcdStatusAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._packLcdStatus( );

            this._engine.environment.gpuInterrupts = value & 0x78;

        },

        _lineAccess : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.gpuLine;

            throw new Error( 'Invalid write at ' + Virtjs.FormatUtil.address( user, 16 ) );

        },

        _lycAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.gpuLyCompare;

            this._engine.environment.gpuLyCompare = value;

        },

        _oamDmaAccess : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                throw new Error( 'Invalid read at ' + Virtjs.FormatUtil.address( user, 16 ) );

            var start = value << 8;

            for ( var offset = 0; offset < 160; ++ offset ) {
                this._engine.environment.oam[ offset ] = this._engine.mmu.readUint8( start + offset );
                this._updateSprite( offset );
            }

        },

        _paletteAccess : function ( index, address, value ) {

            if ( typeof value === 'undefined' )
                return this._packPalette( index );

            this._unpackPalette( index, value );

        },

        _oamAccess : function ( address, value, user ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.oam[ address ];

            if ( ! this._engine.environment.gpuLCDFeature || this._engine.environment.gpuMode === 0x00 || this._engine.environment.gpuMode === 0x01 ) {
                this._engine.environment.oam[ address ] = value;
                this._updateSprite( address );
            }

        },

        _vramAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.vram[ address ];

            if ( ! this._engine.environment.gpuLCDFeature || this._engine.environment.gpuMode !== 0x03 ) {
                this._engine.environment.vram[ address ] = value;
                this._updateTile( address );
            }

        },

        _packSettings : function ( ) {

            return (

                ( this._engine.environment.gpuBackgroundFeature ? 1 << 0 : 0 ) |
                ( this._engine.environment.gpuSpriteFeature     ? 1 << 1 : 0 ) |
                ( this._engine.environment.gpuSpriteSize        ? 1 << 2 : 0 ) |
                ( this._engine.environment.gpuBackgroundBase    ? 1 << 3 : 0 ) |
                ( this._engine.environment.gpuTilesetBase       ? 1 << 4 : 0 ) |
                ( this._engine.environment.gpuWindowFeature     ? 1 << 5 : 0 ) |
                ( this._engine.environment.gpuWindowTileMap     ? 1 << 6 : 0 ) |
                ( this._engine.environment.gpuLCDFeature        ? 1 << 7 : 0 )

            );

        },

        _unpackSettings : function ( value ) {

            this._engine.environment.gpuBackgroundFeature = ( value & ( 1 << 0 ) ) !== 0;
            this._engine.environment.gpuSpriteFeature     = ( value & ( 1 << 1 ) ) !== 0;
            this._engine.environment.gpuSpriteSize        = ( value & ( 1 << 2 ) ) !== 0;
            this._engine.environment.gpuBackgroundBase    = ( value & ( 1 << 3 ) ) !== 0;
            this._engine.environment.gpuTilesetBase       = ( value & ( 1 << 4 ) ) !== 0;
            this._engine.environment.gpuWindowFeature     = ( value & ( 1 << 5 ) ) !== 0;
            this._engine.environment.gpuWindowTileMap     = ( value & ( 1 << 6 ) ) !== 0;
            this._engine.environment.gpuLCDFeature        = ( value & ( 1 << 7 ) ) !== 0;

        },

        _packLcdStatus : function ( ) {

            return (
                ( this._engine.environment.gpuMode        << 0 ) |
                ( this._engine.environment.gpuCoincidence << 2 ) |
                ( this._engine.environment.gpuInterrupts  << 3 )
            );

        },

        _packPalette : function ( index, value ) {

            var palette = this._engine.environment.palettes[ index ];

            return (
                ( palette[ 0 ] << 0 ) |
                ( palette[ 1 ] << 2 ) |
                ( palette[ 2 ] << 4 ) |
                ( palette[ 3 ] << 6 )
            );

        },

        _unpackPalette : function ( index, value ) {

            var palette = this._engine.environment.palettes[ index ];

            palette[ 0 ] = ( value >> 0 ) & 0x3;
            palette[ 1 ] = ( value >> 2 ) & 0x3;
            palette[ 2 ] = ( value >> 4 ) & 0x3;
            palette[ 3 ] = ( value >> 6 ) & 0x3;

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

                this._engine.environment.tilesets[ tileIndex ][ y ][ x ] =
                    ( this._engine.environment.vram[ rowAddress + 0 ] & mask ? 0x1 : 0 ) |
                    ( this._engine.environment.vram[ rowAddress + 1 ] & mask ? 0x2 : 0 )
                ;

            }

        },

        _updateSprite : function ( address ) {

            var sprite = this._sprites[ address >> 2 ];
            var value = this._engine.environment.oam[ address ];

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

            if ( this._engine.environment.gpuLCDFeature && this._engine.environment.gpuBackgroundFeature ) {
                this._backgroundScanline( this._scanline, line );
            } else for ( var x = 0, X = this._scanline.length; x < X; ++ x ) {
                this._scanline[ x ] = 0x00FF;
            }

            if ( this._engine.environment.gpuLCDFeature && this._engine.environment.gpuSpriteFeature ) {
                this._spritesScanline( this._scanline, line );
            }

            for ( var x = 0, y = line, X = this._scanline.length; x < X; ++ x ) {

                var trueColor = this._scanline[ x ] & 0xFF;

                this._engine._options.screen.setPixel( x, y, trueColor, trueColor, trueColor );

            }

        },

        _vblank : function ( ) {

            this._engine.environment.pendingInterrupts |= 0x01;

            this._engine._options.screen.flushScreen( );

            this._engine._continue = false;

        },

        _backgroundScanline : function ( scanline, line ) {

            // Fetch the background map base, which depends on a CPU flag

            var mapBase = this._engine.environment.gpuBackgroundBase ? 0x1C00 : 0x1800;

            // Fetch the offset of the first tile, which depends on a CPU flag

            var tilesOffset = this._engine.environment.gpuTilesetBase ? 0 : 256;

            // Compute the actual position of the pixel in the world (i.e. taking the scroll into count)

            var actualY = ( this._engine.environment.gpuScrolls[ 1 ] + line ) & 0xFF;

            // Fetch the top-left mapping coordinates
            // Note that these coordinates will be <= than the pixel
            //  - actualY >> 3 : "divide by 8 then floor", since there is 8 lines/columns per tile
            //  - PREVIOUS << 5 : "multiply per 32", since there is 32 mappings per line, and that a mapping is a single byte

            var mapOffsetY = ( actualY >> 3 ) << 5;

            // Fetch the pixel coordinates relative to the top-left tile
            //  - VALUE & 0b111 (0x7) : "modulo 8", since there is 8 lines/columns per tile

            var tileY = actualY & 0x7;

            // The first palette is the background palette

            var palette = this._engine.environment.palettes[ 0 ];

            for ( var x = 0; x < 160; ++ x ) {

                // Same computations than before, but for X coordinates

                var actualX = ( this._engine.environment.gpuScrolls[ 0 ] + x ) & 0xFF;
                var mapOffsetX = ( actualX >> 3 ) & 31;
                var tileX = actualX & 0x7;

                // Knowing the map offset, we can fetch the tile index

                var mapOffset = mapBase + mapOffsetY + mapOffsetX;
                var tileIndex = this._engine.environment.vram[ mapOffset ];

                // When using the second tileset, the index is actually a signed number so that whatever the tileset, the same index greater than 0x7F (such as 0xFF) will always point toward the same tile

                if ( ! this._engine.environment.gpuTilesetBase )
                    if ( tileIndex > 0x7f )
                        tileIndex -= 0x100;

                // We just have to get the palette index color, then the color from the palette

                var paletteIndex = this._engine.environment.tilesets[ tilesOffset + tileIndex ][ tileY ][ tileX ];
                var trueColor = colors[ palette[ paletteIndex ] ];

                scanline[ x ] = ( paletteIndex << 8 ) | trueColor;

            }

        },

        _spritesScanline: function ( scanline, line ) {

            // Iterates on each sprite (40 of them)

            for ( var t = 0; t < 40; ++ t ) {

                var sprite = this._sprites[ t ];

                if ( sprite.y + 8 <= line || sprite.y > line )
                    continue ;

                var palette = this._engine.environment.palettes[ 1 + sprite.palette ];

                var tileRow = sprite.yflip ?
                    this._engine.environment.tilesets[ sprite.tile ][ 7 - ( line - sprite.y ) ] :
                    this._engine.environment.tilesets[ sprite.tile ][ 0 + ( line - sprite.y ) ]
                ;

                for ( var tileX = 0; tileX < 8; ++ tileX ) {

                    var x = sprite.x + tileX;

                    if ( x < 0 || x >= 160 )
                        continue ;

                    var actualTileX = sprite.xflip ? 7 - tileX : tileX;
                    var paletteIndex = tileRow[ actualTileX ];
                    var trueColor = colors[ palette[ paletteIndex ] ];

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
