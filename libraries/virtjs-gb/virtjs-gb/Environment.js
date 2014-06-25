export class Environment {

    constructor( buffer, options ) {

        // ROM

        this.rom = new Uint8Array( buffer );
        this.ident = options.ident;

        // Address registers

        this.pc = new Uint16Array( [ 0x0000 ] );
        this.sp = new Uint16Array( [ 0xfffe ] );

        // Standard CPU registers

        this.af = { }; // Since 'f' doesn't really exist, we need a getter
        this.a = new Uint8Array( 1 );
        this.f = { }; // Same here

        this.bc = new Uint16Array( 1 );
        this.b = new Uint8Array( this.bc.buffer, 1, 1 );
        this.c = new Uint8Array( this.bc.buffer, 0, 1 );

        this.de = new Uint16Array( 1 );
        this.d = new Uint8Array( this.de.buffer, 1, 1 );
        this.e = new Uint8Array( this.de.buffer, 0, 1 );

        this.hl = new Uint16Array( 1 );
        this.h = new Uint8Array( this.hl.buffer, 1, 1 );
        this.l = new Uint8Array( this.hl.buffer, 0, 1 );

        // Miscellaneous flags

        this.mmuBiosLocked = false;

        this.gpuBackgroundFeature = true;
        this.gpuSpriteFeature     = false;
        this.gpuLCDFeature        = true;
        this.gpuCoincidence       = false;
        this.gpuMode              = 0x02;
        this.gpuInterrupts        = 0x00;
        this.gpuLyCompare         = 0;
        this.gpuSpriteSize        = 0;
        this.gpuTilesetBase       = 1;
        this.gpuBackgroundBase    = 0;
        this.gpuScrolls           = new Uint8Array( 2 );

        this.gpuWindowFeature     = false;
        this.gpuWindowBase        = 0;
        this.gpuWindowPosition    = new Uint8Array( 2 );

        this.gpuClock             = 0;
        this.gpuFrameClock        = 0;
        this.gpuLine              = 0;

        this.cpuInterruptFeature = false;
        this.cpuZero             = false;
        this.cpuHalf             = false;
        this.cpuCarry            = false;
        this.cpuBCD              = false;
        this.cpuMode             = 0x02;

        this.ioKeyColumn = 0x00;

        this.enabledInterrupts = 0x00;
        this.pendingInterrupts = 0x00;

        // Memory

        this.wram = new Uint8Array( 8192 );
        this.hram = new Uint8Array( 127 );

        this.oam = new Uint8Array( 175 );
        this.vram = new Uint8Array( 8192 );

        this.nombcRomBank = null;
        this.nombcRamBank = null;

        this.mbc1Mode = null;
        this.mbc1RamFeature = false;

        this.mbc1Ram = null;

        this.mbc1RomBank = 0x01;
        this.mbc1RamBank = 0x00;

        this.mbc3Mode = null;
        this.mbc3RamFeature = false;

        this.mbc3Ram = null;
        this.mbc3Rtc = null;
        this.mbc3Latch = null;

        this.mbc3RomBank = 0x01;
        this.mbc3RamBank = 0x00;

        // GPU background palettes (4 of them, each being 4 bytes)

        this.palettes = [ ];
        for ( var t = 0; t < 4; ++ t )
            this.palettes[ t ] = new Uint8Array( 4 );

        // GPU tilesets (32 of them, each being 8*8 array)

        this.tilesets = [ ];
        for ( var t = 0; t < 32 * 32; ++ t ) {
            this.tilesets[ t ] = [ ];
            for ( var y = 0; y < 8; ++ y ) {
                this.tilesets[ t ][ y ] = new Uint8Array( 8 );
            }
        }

        // Set register names so they can be used in the debug() functions

        [ 'af', 'a', 'f', 'bc', 'b', 'c', 'de', 'd', 'e', 'hl', 'h', 'l' ].forEach( register => {
            this[ register ].xRegister = register;
        } );

        // 'F' getter & setters (since they are slow, the 'f' register should not be accessed directly by the emulator itself)

        Object.defineProperty( this.af, '0', {

            get : ( ) => {

                return ( this.a[ 0 ] << 8 ) | ( this.f[ 0 ] << 0 );

            },

            set : ( value ) => {

                this.a[ 0 ] = ( value & 0xFF00 ) >> 8;
                this.f[ 0 ] = ( value & 0x00FF ) >> 0;

            }

        } );

        Object.defineProperty( this.f, '0', {

            get : ( ) => {

                return (
                    ( this.cpuBCD   ? 0x40 : 0x00 ) |
                    ( this.cpuZero  ? 0x80 : 0x00 ) |
                    ( this.cpuHalf  ? 0x20 : 0x00 ) |
                    ( this.cpuCarry ? 0x10 : 0x00 )
                );

            },

            set : ( value ) => {

                this.cpuBCD   = ( value & 0x40 ) !== 0;
                this.cpuZero  = ( value & 0x80 ) !== 0;
                this.cpuHalf  = ( value & 0x20 ) !== 0;
                this.cpuCarry = ( value & 0x10 ) !== 0;

            }

        } );

    }

};
