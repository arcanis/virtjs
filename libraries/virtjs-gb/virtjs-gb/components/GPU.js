var colors = { 0 : 255, 1 : 192, 2 : 96, 3 : 0 };

export var HBLANK_MODE = 0x00;
export var VBLANK_MODE = 0x01;
export var OAM_MODE    = 0x02;
export var VRAM_MODE   = 0x03;

export var CYCLES_PER_HBLANK_LINE =  51 * 4;
export var CYCLES_PER_VBLANK_LINE = 114 * 4;
export var CYCLES_PER_OAM         =  20 * 4;
export var CYCLES_PER_VRAM        =  43 * 4;

export var HBLANK_LINE_COUNT      = 144;
export var MAX_VIRTUAL_LINE_COUNT = 154;

export class GPU {

    constructor( { screen } ) {

        this._screen = screen;
        this._screen.setInputSize( 160, 144 );

        this._scanline = new Uint32Array( 160 );

        // Initialized at link time

        this._mmu = null;

        // Initialized at setup time

        this._environment = null;

        this._oam = null;

        this._vramBanks = null;
        this._vramBank00 = null;
        this._vramBank01 = null;

        this._sprites = null;
        this._tilesets = null;

    }

    link( { mmu } ) {

        this._mmu = mmu;

    }

    setup( environment ) {

        this._environment = environment;

        this._oam = new Uint8Array( environment.oamBuffer );

        this._vramBanks = [ ];

        for ( var vramBank = 0; vramBank * 0x2000 < this._environment.vramBuffer.byteLength; ++ vramBank )
            this._vramBanks[ vramBank ] = new Uint8Array( this._environment.vramBuffer, vramBank * 0x2000, 0x2000 );

        this._vramBank00 = this._vramBanks[ 0x00 ];
        this._vramBank01 = this._vramBanks[ 0x01 ];

        // There is 40 GPU sprites
        // We store each of them in an internal array so we don't have to unserialize whenever we need them.
        // That also means that we have to take care of updating these structures when the mapped memory area changes.

        this._sprites = [ ];

        for ( var t = 0; t < 40; ++ t )
            this._sprites[ t ] = { x : 0, y : 0, bank : 0, tile : 0, paletteDmg : 0, paletteCgb : 0, xflip : 0, yflip : 0, priority : 0 };

        // Since we may be loading a serialized environment, we have to populate the sprite with the right data extracted from the RAM.
        // So we iterate on each data cell as if it was dirty.

        for ( var t = 0; t < 160; ++ t )
            this.updateSprite( t );

        // There is 384*2 GPU tiles (*2 because in CGB mode, there is two VRAM banks)
        // Each tile is encoded on two bytes (those tiles are 8x8 wide, and each pixel takes two bits)

        this._tilesets = [ [ ], [ ] ];

        for ( var t = 0; t < 384; ++ t ) {

            this._tilesets[ 0 ][ t ] = [ ];
            this._tilesets[ 1 ][ t ] = [ ];

            for ( var y = 0; y < 8; ++ y ) {

                this._tilesets[ 0 ][ t ][ y ] = new Uint8Array( 8 );
                this._tilesets[ 1 ][ t ][ y ] = new Uint8Array( 8 );

            }

        }

        // Same as for the sprites, we may be in an unserialized environment. So let's populate it!
        // Don't forget that in CGB mode, there is two vram banks (and since we are lazy, we initialize them both even with DMG).

        for ( var t = 0; t < 384 * 16; ++ t ) {

            this.updateTile( 0, t );
            this.updateTile( 1, t );

        }

        // In CGB mode, the background maps also have metadata associated to them.

        this._metadata = [ ];

        for ( var t = 0; t < 32 * 32 * 2; ++ t )
            this._metadata[ t ] = { bank : 0, paletteCgb : 0, xflip : 0, yflip : 0, priority : 0 };

        // Same as for sprites and tiles

        for ( var t = 0; t < 32 * 32 * 2; ++ t ) {
            this.updateMetadata( t );
        }

    }

    transferDma( value ) {

        var start = value << 8;

        for ( var offset = 0; offset < 160; ++ offset ) {
            this._oam[ offset ] = this._mmu.readUint8( start + offset );
            this.updateSprite( offset );
        }

    }

    setDmgPalette( index, value ) {

        var palette = this._environment.gpuDmgPalettes[ index ];

        palette[ 0 ] = ( value >> 0 ) & 0x3;
        palette[ 1 ] = ( value >> 2 ) & 0x3;
        palette[ 2 ] = ( value >> 4 ) & 0x3;
        palette[ 3 ] = ( value >> 6 ) & 0x3;

    }

    getDmgPalette( index ) {

        var palette = this._environment.gpuDmgPalettes[ index ];

        return (
            ( palette[ 0 ] << 0 ) |
            ( palette[ 1 ] << 2 ) |
            ( palette[ 2 ] << 4 ) |
            ( palette[ 3 ] << 6 )
        );

    }

    updateSprite( address ) {

        var sprite = this._sprites[ address >>> 2 ];
        var value = this._oam[ address ];

        switch ( address & 0x03 ) {

            case 0: sprite.y = value - 16; break ;
            case 1: sprite.x = value -  8; break ;
            case 2: sprite.tile = value;   break ;

            case 3: sprite.paletteCgb = ( value & 0b00000111 ) >>> 0;
            /*and*/ sprite.bank       = ( value & 0b00001000 ) >>> 3;
            /*and*/ sprite.paletteDmg = ( value & 0b00010000 ) >>> 4;
            /*and*/ sprite.xflip      = ( value & 0b00100000 ) >>> 5;
            /*and*/ sprite.yflip      = ( value & 0b01000000 ) >>> 6;
            /*and*/ sprite.priority   = ( value & 0b10000000 ) >>> 7;

        }

    }

    updateMetadata( index ) {

        var metadata = this._metadata[ index ];
        var value = this._vramBank01[ 0x1800 + index ];

        metadata.paletteCgb = ( value & 0b00000111 ) >>> 0;
        metadata.bank       = ( value & 0b00001000 ) >>> 3;
        metadata.xflip      = ( value & 0b00100000 ) >>> 5;
        metadata.yflip      = ( value & 0b01000000 ) >>> 6;
        metadata.priority   = ( value & 0b10000000 ) >>> 7;

    }

    updateTile( vramBank, address ) {

        var rowAddress = address & 0xFFFE;
        var vramBankNN = this._vramBanks[ vramBank ];

        var tileIndex = rowAddress >>> 4;

        var y = ( rowAddress >>> 1 ) & 0x7;

        for ( var x = 0; x < 8; ++ x ) {

            var mask = 1 << ( 7 - x );

            this._tilesets[ vramBank ][ tileIndex ][ y ][ x ] =
                ( vramBankNN[ rowAddress + 0 ] & mask ? 0x1 : 0x0 ) |
                ( vramBankNN[ rowAddress + 1 ] & mask ? 0x2 : 0x0 )
            ;

        }

    }

    compileCgbPaletteToRgb( destination, source, colorOffset ) {

        var cgb15 = ( source[ colorOffset + 1 ] << 8 ) | ( source[ colorOffset ] );

        var tr = ( ( cgb15 >>>  0 ) & 0x1F ) * 0xFF / 0x1F;
        var tg = ( ( cgb15 >>>  5 ) & 0x1F ) * 0xFF / 0x1F;
        var tb = ( ( cgb15 >>> 10 ) & 0x1F ) * 0xFF / 0x1F;

        var rgb32 = ( tr << 16 ) | ( tg << 8 ) | ( tb << 0 );

        var paletteIndex = ( colorOffset >>> ( 2 + 1 ) );
        var colorIndex = ( colorOffset >>> 1 ) & 0b11;

        destination[ paletteIndex ][ colorIndex ] = rgb32;

    }

    nextMode( ) {

        switch ( this._environment.gpuMode ) {

            // HBlank
            case HBLANK_MODE :

            // End of line reached, step to the next one

                this._environment.gpuLy += 1;

                // Check if the new line matches the line in the LYC register

                this._environment.gpuCoincidence =
                    this._environment.gpuLy === this._environment.gpuLyc;

                // If the user program asked for being notified, trigger an interrupt

                if ( this._environment.gpuCoincidence )
                    if ( this._environment.gpuInterrupts & ( 1 << 6 ) )
                        this._environment.pendingInterrupts |= 0x02;

                // Finally, set the new mode (depending on the current new line, it will be OAM or VBlank)

                if ( this._environment.gpuLy < HBLANK_LINE_COUNT ) {

                    this._environment.gpuClock = CYCLES_PER_OAM;
                    this._setMode( OAM_MODE );

                } else {

                    this._environment.gpuClock = CYCLES_PER_VBLANK_LINE;
                    this._setMode( VBLANK_MODE );

                    // In this case, we want to tell the JIT that we're ready to exit the running loop

                    return true;

                }

            return false;

            // VBlank
            case VBLANK_MODE :

                // End of line reached, step to the next one
                // Btw, you may wonder why we're talking about "step to the next one" since the VBlank occurs after all the 144 screen lines have been processed by the HBlank events; it's because the VBlank event has 10 'fake' lines, which will bring the line counter up to 154. Strange, uh?

                this._environment.gpuLy += 1;

                // When we reach the 154th line, we go back to the first one ...

                if ( this._environment.gpuLy === MAX_VIRTUAL_LINE_COUNT )
                    this._environment.gpuLy = 0;

                // ... then we set the coincidence check ...

                this._environment.gpuCoincidence =
                    this._environment.gpuLy === this._environment.gpuLyc;

                // ... then we trigger the interrupt if asked ...

                if ( this._environment.gpuCoincidence )
                    if ( this._environment.gpuInterrupts & ( 1 << 6 ) )
                        this._environment.pendingInterrupts |= 0x02;

                // ... then we go to OAM mode!

                if ( this._environment.gpuLy === 0 ) {

                    this._environment.gpuClock = CYCLES_PER_OAM;
                    this._setMode( OAM_MODE );

                } else {

                    this._environment.gpuClock = CYCLES_PER_VBLANK_LINE;
                    //this._setMode( VBLANK_MODE );

                }

            return false;

            // OAM
            case OAM_MODE :

                // Once the OAM mode is finished, goes to the VRAM mode

                this._environment.gpuClock = CYCLES_PER_VRAM;
                this._setMode( VRAM_MODE );

            return false;

            // VRAM
            case 0x03 :

                // And once the VRAM mode is finished, goes to the HBlank again!

                this._environment.gpuClock = CYCLES_PER_HBLANK_LINE;
                this._setMode( HBLANK_MODE );

                // When we go to the HBLANK_MODE, we have to check if there is an H-Blank DMA going on

                if ( this._environment.cgbUnlocked && this._environment.cgbVramDmaStatus === 0 ) {

                    var source      = 0x0000 + ( this._environment.cgbVramDmaSource      & 0b1111111111110000 );
                    var destination = 0x8000 + ( this._environment.cgbVramDmaDestination & 0b0001111111110000 );

                    this._environment.cgbVramDmaSource += 0x10;
                    this._environment.cgbVramDmaDestination += 0x10;

                    this._mmu.triggerVramDmaTransferCycles( source, destination, 0x10 );

                    if ( this._environment.cgbVramDmaLength > 0 ) {
                        this._environment.cgbVramDmaLength -= 1;
                    } else {
                        this._environment.cgbVramDmaStatus = 1;
                    }

                }

            return false ;

        }

    }

    _setMode( mode ) {

        // Update the mode

        this._environment.gpuMode = mode;

        // Trigger the HBlank / VBlank events

        /****/ if ( mode === HBLANK_MODE ) {
            this._triggerHblank( this._environment.gpuLy );
        } else if ( mode === VBLANK_MODE ) {
            this._triggerVblank( );
        }

        // Trigger interrupts if requested (the VRAM mode (0x03) never trigger interrupts)

        if ( mode !== VRAM_MODE && this._environment.gpuInterrupts & ( 1 << ( 3 + mode ) ) ) {
            this._environment.pendingInterrupts |= 0x02;
        }

    }

    _triggerHblank( line ) {

        // HBlank is when the physical LCD laser is moving from the end of an LCD line to the start of the next line.
        // The Gameboy screen contains 160 lines, and so there is 159 HBlank per frame (the last one being the VBlank, see below).

        // Note that we have to respect the HBlank, and bufferize line during the HBlank (rather than doing all of them at once during the VBlank), because the VRAM is still available at this time, and so the user program will be able to modify the content of the lines below the one being drawn during the line rendering.

        // First, we have to reset the line if there is no LCD display, or no background

        if ( ! this._environment.gpuLcdFeature || ! this._environment.gpuBackgroundFeature )
            for ( var x = 0, X = this._scanline.length; x < X; ++ x )
                this._scanline[ x ] = 0x00FFFFFF;

        // Then if there is no LCD display, we quit instantly

        if ( ! this._environment.gpuLcdFeature )
            return ;

        // We can now display the various features if they are enabled

        // In Non-CGB mode, both background and window are controlled by the 0-bit of the LCDC register. Note that it is different from SGB, where only the background is affected by this flag (so there's a compatibility issue).
        // In CGB mode,

        var showBgWin = this._environment.gpuBackgroundFeature || this._environment.cgbUnlocked;

        if ( showBgWin )
            this._drawBackgroundScanline( line );

        if ( showBgWin && this._environment.gpuWindowFeature )
            this._drawWindowScanline( line );

        if ( this._environment.gpuSpriteFeature )
            this._drawSpriteScanline( line );

        // Finally, we send the rendered line to the output device

        for ( var x = 0, X = this._scanline.length; x < X; ++ x ) {

            // Remove the internal transparency byte from the color
            var color = this._scanline[ x ] & 0x00FFFFFF;

            this._screen.setPixel( x, line, color );

        }

    }

    _triggerVblank( ) {

        // VBlank is when the physical LCD laser is moving from the end of the last LCD line of the screen to the beginning of the first one.
        // For our purposes, we flush the screen only during VBlank, and avoid a lot of expensive data transfers.

        // The VBlank triggers an interrupt
        this._environment.pendingInterrupts |= 0x01;

        // Flushes the screen device display
        this._screen.flushScreen( );

    }

    _drawBackgroundScanline( line ) {

        // Select the right background base address (there is two of them, 0;255 and -127;128)
        var backgroundMapBaseAddress = this._environment.gpuBackgroundBase ? 0x1C00 : 0x1800;

        var scrollX = this._environment.gpuBgScroll[ 0 ];
        var scrollY = this._environment.gpuBgScroll[ 1 ];

        this._drawMixedScanline( backgroundMapBaseAddress, 0, line, scrollX, scrollY );

    }

    _drawWindowScanline( line ) {

        // Select the right background base address (there is two of them, 0;255 and -127;128)
        var backgroundMapBaseAddress = this._environment.gpuWindowBase ? 0x1C00 : 0x1800;

        var positionX = this._environment.gpuWindowPosition[ 0 ] - 7;
        var positionY = this._environment.gpuWindowPosition[ 1 ];

        if ( positionY > line || positionY + 144 <= line )
            return ;

        this._drawMixedScanline( backgroundMapBaseAddress, positionX, line - positionY, 0, 0 );

    }

    _drawMixedScanline( baseAddress, offsetX, line, scrollX, scrollY ) {

        // The background and the window use approximately the same rendering process, the main difference being the place from where the data are read.
        // In order to achieve maximal readability, this function factorizes this rendering process.

        // Just like there is two background base address, there is also two tileset base address, switched depending on a GPU flag
        var tilesOffset = this._environment.gpuTilesetBase ? 0 : 256;

        // Computes the actual position of the pixel in the world (i.e. taking the scroll into count)
        var actualY = ( scrollY + line ) & 0xFF;

        // Fetches the top-left mapping coordinates
        // Note that these coordinates will be <= than the pixel
        //  - actualY >> 3 : "divide by 8 then floor", since there is 8 lines/columns per tile
        //  - PREVIOUS << 5 : "multiply per 32", since there is 32 mappings per line, and that a mapping is a single byte
        var mapOffsetY = ( actualY >>> 3 ) << 5;

        // Fetches the pixel coordinates relative to the top-left tile
        //  - VALUE & 0b111 (0x7) : "modulo 8", since there is 8 lines/columns per tile
        var tileY = actualY & 0x7;

        // The background palette is the first palette
        var palette = this._environment.gpuDmgPalettes[ 0 ];

        // In DMG, we always take the vram palette from the 0x00 bank (since there's only one bank)
        // Check below to see how this variable gets rewrote if we're in CGB mode
        var vramBank = 0x00;

        for ( var x = 0; x < 160; ++ x ) {

            // Same computations than before, but for X coordinates

            var actualX = ( scrollX + offsetX + x ) & 0xFF;
            var mapOffsetX = ( actualX >>> 3 ) & 31;
            var tileX = actualX & 0x7;

            // Knowing the X and Y map offset, we can now fetch the tile index from the VRAM

            var mapOffset = baseAddress + mapOffsetY + mapOffsetX;
            var tileIndex = this._vramBank00[ mapOffset ];

            // When using the second tileset, the index is actually a signed number so that whatever the tileset, the same index greater than 0x7F (such as 0xFF) will always point toward the same tile (that's actually pretty clever!)

            if ( ! this._environment.gpuTilesetBase )
                if ( tileIndex > 0x7f )
                    tileIndex -= 0x100;

            // In CGB, each mixed tile has also metadata associed

            if ( this._environment.cgbUnlocked ) {

                var metadata = this._metadata[ mapOffset - 0x1800 ];

                if ( metadata.xflip )
                    tileX = 8 - ( tileX + 1 );

                if ( metadata.yflip )
                    tileY = 8 - ( tileY + 1 );

                vramBank = metadata.bank;
                palette = this._environment.cgbBackgroundRgbPalettes[ metadata.paletteCgb ];

            }

            // We just have to get the palette index color stored in the tileset cell, then the color from the palette

            var paletteIndex = this._tilesets[ vramBank ][ tilesOffset + tileIndex ][ tileY ][ tileX ];
            var trueColor = palette[ paletteIndex ];

            // We store the palette index inside the 'color' (internally only, it will disappear when sent to the screen device), because the sprite may be behind the background. In such case, we have to know if they are behind a transparent pixel or not.

            this._scanline[ x ] = ( paletteIndex << 24 ) | trueColor;

        }

    }

    _drawSpriteScanline( line ) {

        // Did you know that the Gameboy can have 16-lines-tall sprites ? Well, now you know. It is used in Zelda, so if you have an half Link, you know what to look for.
        var size = this._environment.gpuSpriteSize ? 16 : 8;

        // In DMG, we always take the vram palette from the 0x00 bank (since there's only one bank)
        // Check below to see how this variable gets rewrote if we're in CGB mode
        var vramBank = 0x00;

        // We have to iterate on each sprite to know if they are on the currently rendered line

        for ( var t = 0; t < 40; ++ t ) {

            var sprite = this._sprites[ t ];

            // This sprite is not on the rendered line, next
            if ( sprite.y + size <= line || sprite.y > line )
                continue ;

            // Gets the sprite tile index from the inner structure
            var tileIndex = sprite.tile;

            if ( this._environment.gpuSpriteSize ) {

                // If the sprite is multi-tiles (16 lines tall), then we will need to get the first tile of the tile pair (ie. the upper tile will be 0x00 while the lower tile will be 0x01).

                var isBottomTile = line - sprite.y >= 8;

                // SURPRISE ! If your sprite is upside-down (yflip), don't forget to reverse the tiles to (so the upper tile becomes 0x01 and the lower tile becomes 0x00).

                if ( sprite.yflip )
                    isBottomTile = ! isBottomTile;

                // And then we can finally apply the mask to have the behavior described in the two previous comments

                tileIndex = isBottomTile ?
                    tileIndex | 0x01 :
                    tileIndex & 0xFE
                ;

            }

            // In CGB, sprite tiles and palette are a bit different

            if ( this._environment.cgbUnlocked ) {

                vramBank = sprite.bank;

                // Gets the sprite palette specified in the inner structure data
                var palette = this._environment.cgbSpriteRgbPalettes[ sprite.paletteCgb ];

            } else {

                // Gets the sprite palette specified in the inner structure data
                var palette = this._environment.gpuDmgPalettes[ 1 + sprite.paletteDmg ];

            }

            // That's a modulo 8 - we get the tile Y coordinate based on the current rendered line and the sprite Y position
            var tileY = ( line - sprite.y ) & 0x07;

            // However, don't forget to flip it if we're flipping our sprite upside-down (yflip)

            if ( sprite.yflip )
                tileY = 7 - tileY;

            // Good, fetch the tile pixel row

            var tileRow = this._tilesets[ vramBank ][ tileIndex ][ tileY ];

            // If the gameboy is in CGB mode, then the 0 bit of the LCDC register means "Background and windows are behind sprites"

            var ignoreBgPriority = ! this._environment.cgbUnlocked && this._environment.gpuBackgroundFeature;

            // Now we can iterate on this row and set every pixels which are in the rendered part of the screen

            for ( var tileX = 0; tileX < 8; ++ tileX ) {

                var x = sprite.x + tileX;

                // The pixel is out of screen, next
                if ( x < 0 || x >= 160 )
                    continue ;

                // Just like before, don't forget to flip the tile position if we're flip the model horizontally !
                // However, since we're iterating on 'tileX', we have to use another variable.

                var actualTileX = sprite.xflip ? 7 - tileX : tileX;

                // Get the palette index from the tile pixel row

                var paletteIndex = tileRow[ actualTileX ];

                // Check if the sprite pixel is transparent (ie. palette index is 0) - if so, next

                if ( paletteIndex === 0 )
                    continue ;

                // Check if the sprite is behind a non-transparent part of the background - if so, next

                if ( ! ignoreBgPriority && sprite.priority && this._scanline[ x ] & 0xFF000000 )
                    continue ;

                // Apply the color on the scanline

                var trueColor = palette[ paletteIndex ];

                this._scanline[ x ] = ( paletteIndex << 24 ) | trueColor;

            }

        }

    }

};
