import { EmitterMixin }      from 'virtjs/mixins/EmitterMixin';
import { formatHexadecimal } from 'virtjs/utils/FormatUtils';
import { mixin }             from 'virtjs/utils/ObjectUtils';

import { MBC1 }              from 'virtjs-gb/mbcs/MBC1';
import { MBC3 }              from 'virtjs-gb/mbcs/MBC3';
import { MBC5 }              from 'virtjs-gb/mbcs/MBC5';
import { NoMBC }             from 'virtjs-gb/mbcs/NoMBC';

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
        this._wram = null;
        this._vram = null;
        this._oam = null;

        this.mbc = null;

    }

    link( { gpu, keyio } ) {

        this._gpu = gpu;
        this._keyio = keyio;

    }

    setup( environment ) {

        this._environment = environment;

        this._hram = new Uint8Array( this._environment.hramBuffer );
        this._wram = new Uint8Array( this._environment.wramBuffer );
        this._vram = new Uint8Array( this._environment.vramBuffer );
        this._oam = new Uint8Array( this._environment.oamBuffer );

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
            return this.mbc.readRamUint8( address );

        else if ( address >= 0xC000 && address < 0xE000 )
            return this._wram[ address & 0x1FFF ];

        else if ( address >= 0xE000 && address < 0xFE00 )
            return this._wram[ address & 0x1FFF ];

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

            case 0xFF47:
                return this._gpu.getPalette( 0 );

            case 0xFF48:
                return this._gpu.getPalette( 1 );

            case 0xFF49:
                return this._gpu.getPalette( 2 );

            case 0xFF4A:
                return this._environment.gpuWindowPosition[ 1 ];

            case 0xFF4B:
                return this._environment.gpuWindowPosition[ 0 ];

            case 0xFFFF:
                return this._environment.enabledInterrupts;

            default:
                //console.log('invalid read at ' + address);
            return 0;

        }

    }

    _fastWriteUint8( address, value ) {

        if ( address >= 0x0000 && address < 0x8000 )
            this.mbc.writeRomUint8( address, value );

        else if ( address >= 0x8000 && address < 0xA000 ) {
            if ( ! this._environment.gpuLcdFeature || this._environment.gpuMode !== 0x03 ) {
                this._vram[ address & 0x1FFF ] = value;
                if ( address < 0x9800 ) {
                    this._gpu.updateTile( address & 0x1FFF );
                }
            }
        }

        else if ( address >= 0xA000 && address < 0xC000 )
            this.mbc.writeRamUint8( address, value );

        else if ( address >= 0xC000 && address < 0xE000 )
            this._wram[ address & 0x1FFF ] = value;

        else if ( address >= 0xE000 && address < 0xFE00 )
            this._wram[ address & 0x1FFF ] = value;

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

            case 0xFF47:
                this._gpu.setPalette( 0, value );
            break ;

            case 0xFF48:
                this._gpu.setPalette( 1, value );
            break ;

            case 0xFF49:
                this._gpu.setPalette( 2, value );
            break ;

            case 0xFF4A:
                this._environment.gpuWindowPosition[ 1 ] = value;
            break ;

            case 0xFF4B:
                this._environment.gpuWindowPosition[ 0 ] = value;
            break ;

            case 0xFFFF:
                this._environment.enabledInterrupts = value;
            break ;

            default:
                //console.log('invalid write at ' + address);
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

}
