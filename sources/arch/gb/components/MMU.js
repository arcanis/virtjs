import { EmitterMixin }      from '../../../mixins/EmitterMixin';
import { formatHexadecimal } from '../../../utils/FormatUtils';
import { mixin }             from '../../../utils/ObjectUtils';

import { MBC1 }              from '../mbcs/MBC1';
import { MBC3 }              from '../mbcs/MBC3';
import { MBC5 }              from '../mbcs/MBC5';
import { NoMBC }             from '../mbcs/NoMBC';

var MBC4 = function ( ) { throw new Error( 'MBC4 is not yet supported :(' ); };

var timerFrequencies = {

     0b00 : 1024,
     0b01 :   16,
     0b10 :   64,
     0b11 :  256

};

var cartridgeTypes = {

    0x00 : NoMBC,

    0x01 : MBC1.bind( null, { } ),
    0x02 : MBC1.bind( null, { ram : true } ),
    0x03 : MBC1.bind( null, { ram : true, battery : true } ),

    0x0F : MBC3.bind( null, { timer : true, battery : true } ),
    0x10 : MBC3.bind( null, { ram : true, timer : true, battery : true } ),
    0x11 : MBC3.bind( null, { } ),
    0x12 : MBC3.bind( null, { ram : true } ),
    0x13 : MBC3.bind( null, { ram : true, battery : true } ),

    0x15 : MBC4.bind( null, { } ),
    0x16 : MBC4.bind( null, { ram : true } ),
    0x17 : MBC4.bind( null, { ram : true, battery : true } ),

    0x19 : MBC5.bind( null, { } ),
    0x1A : MBC5.bind( null, { ram : true } ),
    0x1B : MBC5.bind( null, { ram : true, battery : true } ),
    0x1C : MBC5.bind( null, { rumble : true } ),
    0x1D : MBC5.bind( null, { rumble : true, ram : true } ),
    0x1E : MBC5.bind( null, { rumble : true, ram : true, battery : true } )

};

var unsignedToSignedConverter = new Int8Array( 1 );

export class MMU extends mixin( null, EmitterMixin ) {

    constructor( { events = [ ] } ) {

        super( );

        this._fastReadUint8Event = !!~events.indexOf( 'read' ) ? { } : null;
        this._writeEvent = !!~events.indexOf( 'write' ) ? { } : null;
        this._postWriteEvent = this._writeEvent ? { } : null;

        if ( ! this._readEvent )
            this.readUint8 = this._fastReadUint8;

        if ( ! this._writeEvent && ! this._postWriteEvent )
            this.writeUint8 = this._fastWriteUint8;

        // Initialized at link time

        this._gpu = null;
        this._keyio = null;

        // Initialized at setup time

        this._environment = null;

        this._hram = null;
        this._oam = null;

        this._vramBanks = null;
        this._vramBankNN = null;

        this._wramBanks = null;
        this._wramBank00 = null;
        this._wramBankNN = null;

        this.mbc = null;

    }

    link( { gpu, keyio } ) {

        this._gpu = gpu;
        this._keyio = keyio;

    }

    setup( environment ) {

        this._environment = environment;

        this._hram = new Uint8Array( this._environment.hramBuffer );
        this._vram = new Uint8Array( this._environment.vramBuffer );
        this._oam = new Uint8Array( this._environment.oamBuffer );

        this._wramBanks = [ ];

        for ( var wramBank = 0; wramBank * 0x1000 < this._environment.wramBuffer.byteLength; ++ wramBank )
            this._wramBanks[ wramBank ] = new Uint8Array( this._environment.wramBuffer, wramBank * 0x1000, 0x1000 );

        this._wramBank00 = this._wramBanks[ 0x00 ];
        this._wramBankNN = this._wramBanks[ this._environment.mmuWramBank ];

        this._vramBanks = [ ];

        for ( var vramBank = 0; vramBank * 0x2000 < this._environment.vramBuffer.byteLength; ++ vramBank )
            this._vramBanks[ vramBank ] = new Uint8Array( this._environment.vramBuffer, vramBank * 0x2000, 0x2000 );

        this._vramBankNN = this._vramBanks[ this._environment.cgbVramBank ];

        var type = new Uint8Array( this._environment.romBuffer )[ 0x0147 ];

        if ( ! cartridgeTypes[ type ] )
            throw new Error( `Invalid cartridge type ${formatHexadecimal(type, 8)}` );

        this.mbc = new ( cartridgeTypes[ type ] )( );
        this.mbc.link( { } );
        this.mbc.setup( this._environment );

    }

    readUint8( address ) {

        var value = this._fastReadUint8( address );

        this._readEvent.address = address;
        this._readEvent.value = value;
        this.emit( 'read', this._readEvent );
        value = this._readEvent.value & 0xFF;

        return value;

    }

    writeUint8( address, value ) {

        this._writeEvent.address = address;
        this._writeEvent.value = value;
        this.emit( 'write', this._writeEvent );
        value = this._writeEvent.value & 0xFF;

        this._fastWriteUint8( address, value );

        this._postWriteEvent.address = address;
        this._postWriteEvent.value = value;
        this.emit( 'post-write', this._postWriteEvent );

    }

    _fastReadUint8( address ) {

        if ( address >= 0x0000 && address < 0x8000 )
            return this.mbc.readRomUint8( address );

        else if ( address >= 0x8000 && address < 0xA000 )
            return this._vram[ address & 0x1FFF ];

        else if ( address >= 0xA000 && address < 0xC000 )
            return this.mbc.readRamUint8( address - 0xA000 );

        else if ( address >= 0xC000 && address < 0xD000 )
            return this._wramBank00[ address - 0xC000 ];

        else if ( address >= 0xD000 && address < 0xE000 )
            return this._wramBankNN[ address - 0xD000 ];

        else if ( address >= 0xE000 && address < 0xF000 )
            return this._wramBank00[ address - 0xE000 ];

        else if ( address >= 0xF000 && address < 0xFE00 )
            return this._wramBankNN[ address - 0xF000 ];

        else if ( address >= 0xFE00 && address < 0xFEA0 )
            return this._oam[ address - 0xFE00 ];

        else if ( address >= 0xFF80 && address < 0xFFFF )
            return this._hram[ address - 0xFF80 ];

        else switch( address ) {

            case 0xFF00:
                return this._keyio.read( );

            case 0xFF04:
                return this._environment.timerDivider;

            case 0xFF05:
                return this._environment.timerCounter;

            case 0xFF06:
                return this._environment.timerCounterModulo;

            case 0xFF07:
                return this._environment.timerCounterControl;

            case 0xFF0F:
                return this._environment.pendingInterrupts;

            case 0xFF40: return (
                ( this._environment.gpuBackgroundFeature ? 1 << 0 : 0 ) |
                ( this._environment.gpuSpriteFeature     ? 1 << 1 : 0 ) |
                ( this._environment.gpuSpriteSize        ? 1 << 2 : 0 ) |
                ( this._environment.gpuBackgroundBase    ? 1 << 3 : 0 ) |
                ( this._environment.gpuTilesetBase       ? 1 << 4 : 0 ) |
                ( this._environment.gpuWindowFeature     ? 1 << 5 : 0 ) |
                ( this._environment.gpuWindowBase        ? 1 << 6 : 0 ) |
                ( this._environment.gpuLcdFeature        ? 1 << 7 : 0 )
            );

            case 0xFF41: return (
                ( this._environment.gpuMode        << 0 ) |
                ( this._environment.gpuCoincidence << 2 ) |
                ( this._environment.gpuInterrupts  << 0 )
            );

            case 0xFF42:
            return this._environment.gpuBgScroll[ 1 ];

            case 0xFF43:
                return this._environment.gpuBgScroll[ 0 ];

            case 0xFF44:
                return this._environment.gpuLy;

            case 0xFF45:
                return this._environment.gpuLyc;

            case 0xFF47: // Cf [MMU1]
                return this._environment.gpuPalettes[ 0 ];

            case 0xFF48: // Cf [MMU1]
                return this._environment.gpuPalettes[ 1 ];

            case 0xFF49: // Cf [MMU1]
                return this._environment.gpuPalettes[ 2 ];

            case 0xFF4A:
                return this._environment.gpuWindowPosition[ 1 ];

            case 0xFF4B:
                return this._environment.gpuWindowPosition[ 0 ];

            case 0xFF4D: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbCurrentSpeed << 7 | this._environment.cgbPrepareSpeedSwitch;
            } else {
                return 0;
            } break ;

            case 0xFF4F: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbVramBank;
            } else {
                return 0;
            } break ;

            case 0xFF51: if ( this._environment.cgbUnlocked ) {
                return ( this._environment.cgbVramDmaSource & 0xFF00 ) >>> 8;
            } else {
                return 0;
            } break ;

            case 0xFF52: if ( this._environment.cgbUnlocked ) {
                return ( this._environment.cgbVramDmaSource & 0x00FF ) >>> 0;
            } else {
                return 0;
            } break ;

            case 0xFF53: if ( this._environment.cgbUnlocked ) {
                return ( this._environment.cgbVramDmaDestination & 0xFF00 ) >>> 8;
            } else {
                return 0;
            } break ;

            case 0xFF54: if ( this._environment.cgbUnlocked ) {
                return ( this._environment.cgbVramDmaDestination & 0x00FF ) >>> 0;
            } else {
                return 0;
            } break ;

            case 0xFF55: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbVramDmaLength | ( this._environment.cgbVramDmaStatus << 7 );
            } else {
                return 0;
            } break ;

            case 0xFF68: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbBackgroundPaletteOffset | ( this._environment.cgbBackgroundPaletteIncrement << 7 );
            } else {
                return 0;
            } break ;

            case 0xFF69: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbBackgroundPalettes[ this._environment.cgbBackgroundPaletteOffset >>> 1 ][ 3 + this._environment.cgbBackgroundPaletteOffset & 1 ];
            } else {
                return 0;
            } break ;

            case 0xFF6A: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbSpritePaletteOffset | ( this._environment.cgbSpritePaletteIncrement << 7 );
            } else {
                return 0;
            } break ;

            case 0xFF6B: if ( this._environment.cgbUnlocked ) {
                return this._environment.cgbSpritePalettes[ this._environment.cgbSpritePaletteOffset >>> 1 ][ 3 + this._environment.cgbSpritePaletteOffset & 1 ];
            } else {
                return 0;
            } break ;

            case 0xFFFF:
                return this._environment.enabledInterrupts;

            default:
                return 0;

        }

    }

    _fastWriteUint8( address, value ) {

        if ( address >= 0x0000 && address < 0x8000 )
            this.mbc.writeRomUint8( address, value );

        else if ( address >= 0x8000 && address < 0xA000 ) {
            if ( ! this._environment.gpuLcdFeature || this._environment.gpuMode !== 0x03 ) {
                this._vramBankNN[ address & 0x1FFF ] = value;
                if ( address < 0x9800 ) {
                    this._gpu.updateTile( this._environment.cgbVramBank, address & 0x1FFF );
                } else if ( this._environment.cgbVramBank === 0x01 ) {
                    this._gpu.updateMetadata( address - 0x9800 );
                }
            }
        }

        else if ( address >= 0xA000 && address < 0xC000 )
            this.mbc.writeRamUint8( address - 0xA000, value );

        else if ( address >= 0xC000 && address < 0xD000 )
            this._wramBank00[ address - 0xC000 ] = value;

        else if ( address >= 0xD000 && address < 0xE000 )
            this._wramBankNN[ address - 0xD000 ] = value;

        else if ( address >= 0xE000 && address < 0xF000 )
            this._wramBank00[ address - 0xE000 ] = value;

        else if ( address >= 0xF000 && address < 0xFE00 )
            this._wramBankNN[ address - 0xF000 ] = value;

        else if ( address >= 0xFE00 && address < 0xFEA0 ) {
            if ( ! this._environment.gpuLcdFeature || this._environment.gpuMode <= 0x01 ) {
                this._oam[ address - 0xFE00 ] = value;
                this._gpu.updateSprite( address - 0xFE00 );
            }
        }

        else if ( address >= 0xFF80 && address < 0xFFFF )
            this._hram[ address - 0xFF80 ] = value;

        else switch ( address ) {

            case 0xFF00:
                this._environment.ioKeyColumn = value & 0x30;
            break ;

            case 0xFF04:
                this._environment.timerDivider = 0;
            break ;

            case 0xFF05:
                this._environment.timerCounter = value;
            break ;

            case 0xFF06:
                this._environment.timerCounterModulo = value;
            break ;

            case 0xFF07:
                this._environment.timerCounterFeature = ( value & 0b100 ) >>> 2;
                this._environment.timerCounterFrequency = timerFrequencies[ ( value & 0b011 ) >>> 0 ];
                this._environment.timerCounterControl = ( value & 0b111 ) >>> 0;
            break ;

            case 0xFF0F:
                this._environment.pendingInterrupts = value;
            break ;

            case 0xFF40:
                this._environment.gpuBackgroundFeature = value & ( 1 << 0 ) ? true : false;
                this._environment.gpuSpriteFeature     = value & ( 1 << 1 ) ? true : false;
                this._environment.gpuSpriteSize        = value & ( 1 << 2 ) ? 1 : 0;
                this._environment.gpuBackgroundBase    = value & ( 1 << 3 ) ? 1 : 0;
                this._environment.gpuTilesetBase       = value & ( 1 << 4 ) ? 1 : 0;
                this._environment.gpuWindowFeature     = value & ( 1 << 5 ) ? true : false;
                this._environment.gpuWindowBase        = value & ( 1 << 6 ) ? 1 : 0;
                this._environment.gpuLcdFeature        = value & ( 1 << 7 ) ? true : false;
            break ;

            case 0xFF41:
                this._environment.gpuInterrupts = value & 0x78;
            break ;

            case 0xFF42:
                this._environment.gpuBgScroll[ 1 ] = value;
            break ;

            case 0xFF43:
                this._environment.gpuBgScroll[ 0 ] = value;
            break ;

            case 0xFF44:
                this._environment.gpuLy = 0;
            break ;

            case 0xFF45:
                this._environment.gpuLyc = value;
            break ;

            case 0xFF46:
                this._gpu.transferDma( value );
            break ;

            case 0xFF47: // Cf [MMU1]
                this._environment.gpuPalettes[ 0 ] = value;
                this._gpu.updateDmgPalette( 0 );

            case 0xFF48: // Cf [MMU1]
                this._environment.gpuPalettes[ 1 ] = value;
                this._gpu.updateDmgPalette( 1 );

            case 0xFF49: // Cf [MMU1]
                this._environment.gpuPalettes[ 2 ] = value;
                this._gpu.updateDmgPalette( 2 );

            case 0xFF4A:
                this._environment.gpuWindowPosition[ 1 ] = value;
            break ;

            case 0xFF4B:
                this._environment.gpuWindowPosition[ 0 ] = value;
            break ;

            case 0xFF4D: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbPrepareSpeedSwitch = value & 0b1;

            } break ;

            case 0xFF4F: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramBank = value & 0b1;
                this._rebankVram( );

            } break ;

            case 0xFF51: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramDmaSource &= this._environment.cgbVramDmaSource & 0x00FF;
                this._environment.cgbVramDmaSource |= value << 8;

            } break ;

            case 0xFF52: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramDmaSource &= this._environment.cgbVramDmaSource & 0xFF00;
                this._environment.cgbVramDmaSource |= value << 0;

            } break ;

            case 0xFF53: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramDmaDestination &= this._environment.cgbVramDmaDestination & 0x00FF;
                this._environment.cgbVramDmaDestination |= value << 8;

            } break ;

            case 0xFF54: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramDmaDestination &= this._environment.cgbVramDmaDestination & 0xFF00;
                this._environment.cgbVramDmaDestination |= value << 0;

            } break ;

            case 0xFF55: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbVramDmaLength = value & ~( 1 << 7 );

                if ( ( value >>> 7 ) === 0 ) {

                    if ( this._environment.cgbVramDmaStatus === 1 ) {

                        var source      = 0x0000 + ( this._environment.cgbVramDmaSource      & 0b1111111111110000 );
                        var destination = 0x8000 + ( this._environment.cgbVramDmaDestination & 0b0001111111110000 );

                        this.triggerVramDmaTransferCycles( source, destination, ( this._environment.cgbVramDmaLength + 1 ) * 0x10 );

                    } else {

                        this._environment.cgbVramDmaStatus = 1;

                    }

                } else {

                    this._environment.cgbVramDmaStatus = 0;

                }

            } break ;

            case 0xFF68: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbBackgroundPaletteOffset = value & 0x3F;
                this._environment.cgbBackgroundPaletteIncrement = value >>> 7;

            } break ;

            case 0xFF69: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbBackgroundCgbPalettes[ this._environment.cgbBackgroundPaletteOffset ] = value;
                this._gpu.compileCgbPaletteToRgb( this._environment.cgbBackgroundRgbPalettes, this._environment.cgbBackgroundCgbPalettes, this._environment.cgbBackgroundPaletteOffset & ~1 );

                if ( this._environment.cgbBackgroundPaletteIncrement ) {
                    this._environment.cgbBackgroundPaletteOffset = ( this._environment.cgbBackgroundPaletteOffset + 1 ) & 0x3F;
                }

            } break ;

            case 0xFF6A: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbSpritePaletteOffset = value & 0x3F;
                this._environment.cgbSpritePaletteIncrement = value >>> 7;

            } break ;

            case 0xFF6B: if ( this._environment.cgbUnlocked ) {

                this._environment.cgbSpriteCgbPalettes[ this._environment.cgbSpritePaletteOffset ] = value;
                this._gpu.compileCgbPaletteToRgb( this._environment.cgbSpriteRgbPalettes, this._environment.cgbSpriteCgbPalettes, this._environment.cgbSpritePaletteOffset & ~1 );

                if ( this._environment.cgbSpritePaletteIncrement ) {
                    this._environment.cgbSpritePaletteOffset = ( this._environment.cgbSpritePaletteOffset + 1 ) & 0x3F;
                }

            } break ;

            case 0xFF70: if ( this._environment.cgbUnlocked ) {

                console.log( '[wram rebank] ' + value );

                this._environment.mmuWramBank = value & 0b111;
                this._wramBankNN = this._wramBanks[ Math.max( 1, this._environment.mmuWramBank ) ];

            } break ;

            case 0xFFFF:
                this._environment.enabledInterrupts = value;
            break ;

        }

    }

    readUint16( address ) {

        var low = this.readUint8( address + 0 );
        var high = this.readUint8( address + 1 );

        return ( high << 8 ) | low;

    }

    readInt8( address ) {

        var n = this.readUint8( address );

        unsignedToSignedConverter[ 0 ] = n;
        return unsignedToSignedConverter[ 0 ];

    }

    triggerVramDmaTransferCycles( source, destination, length ) {

        for ( var t = 0; t < length; ++ t ) {
            this.writeUint8( destination + t, this.readUint8( source + t ) );
        }

    }

    _rebankVram( ) {

        this._vramBankNN = this._vramBanks[ this._environment.cgbVramBank ];

    }

}
