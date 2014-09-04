import { EmitterMixin } from 'virtjs/mixins/EmitterMixin';
import { mixin }        from 'virtjs/utils/ObjectUtils';

import { MBC1 }         from 'virtjs-gbjit/mbcs/MBC1';
import { MBC3 }         from 'virtjs-gbjit/mbcs/MBC3';
import { NoMBC }        from 'virtjs-gbjit/mbcs/NoMBC';

var MBC5 = function ( ) {};

var cartridgeTypes = {

     0 : NoMBC,

     1 : MBC1.bind( null, { } ),
     2 : MBC1.bind( null, { ram : true } ),
     3 : MBC1.bind( null, { ram : true, battery : true } ),

    15 : MBC3.bind( null, { } ),
    16 : MBC3.bind( null, { timer : true } ),
    17 : MBC3.bind( null, { timer : true, battery : true } ),
    18 : MBC3.bind( null, { ram : true } ),
    19 : MBC3.bind( null, { ram : true, battery : true } ),

    25 : MBC5.bind( null, { } ),
    26 : MBC5.bind( null, { ram : true } ),
    27 : MBC5.bind( null, { ram : true, battery : true } ),
    28 : MBC5.bind( null, { rumble : true } ),
    29 : MBC5.bind( null, { rumble : true, ram : true } ),
    30 : MBC5.bind( null, { rumble : true, ram : true, battery : true } )

};

export class MMU extends mixin( null, EmitterMixin ) {

    constructor( { events = [ ] } ) {

        super( );

        this._fastReadUint8dEvent = !!~events.indexOf( 'read' ) ? { } : null;
        this._writeEvent = !!~events.indexOf( 'write' ) ? { } : null;
        this._postWriteEvent = this._writeEvent ? { } : null;

        if ( ! this._readEvent )
            this.readUint8 = this._fastReadUint8;

        if ( ! this._writeEvent && ! this._postWriteEvent )
            this.writeUint8 = this._fastWriteUint8;

        this._gpu = null;
        this._keyio = null;

    }

    link( { gpu, keyio, jit } ) {

        this._jit = jit;
        this._gpu = gpu;
        this._keyio = keyio;

    }

    setup( environment ) {

        this._environment = environment;

        this._hram = new Uint8Array( environment.hramBuffer );
        this._wram = new Uint8Array( environment.wramBuffer );
        this._vram = new Uint8Array( environment.vramBuffer );
        this._oam = new Uint8Array( environment.oamBuffer );

        var type = new Uint8Array( environment.romBuffer )[ 0x0147 ];

        this._mbc = new ( cartridgeTypes[ type ] )( );
        this._mbc.link( { jit : this._jit } );
        this._mbc.setup( environment );

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

        jit.invalidateAddress( address );

    }

    _fastReadUint8( address ) {

        if ( address >= 0x0000 && address < 0x8000 ) return this._mbc.readRomUint8( address );
        if ( address >= 0x8000 && address < 0xA000 ) return this._vram[ address & 0x1FFF ];
        if ( address >= 0xA000 && address < 0xC000 ) return this._mbc.readRamUint8( address );
        if ( address >= 0xC000 && address < 0xE000 ) return this._wram[ address & 0x1FFF ];
        if ( address >= 0xE000 && address < 0xFE00 ) return this._wram[ address & 0x1FFF ];
        if ( address >= 0xFE00 && address < 0xFEA0 ) return this._oam[ address - 0xFE00 ];
        if ( address >= 0xFF80 && address < 0xFFFF ) return this._hram[ address - 0xFF80 ];

        switch( address ) {

            case 0xFF00: return this._keyio.read( );

            case 0xFF0F: return this._environment.pendingInterrupts;

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
                ( this._environment.gpuInterrupts  << 3 )
            );

            case 0xFF42: return this._environment.gpuBgScroll[ 1 ];
            case 0xFF43: return this._environment.gpuBgScroll[ 0 ];

            case 0xFF44: return this._environment.gpuLy;
            case 0xFF45: return this._environment.gpuLyc;

            case 0xFF47: return this._gpu.getPalette( 0 );
            case 0xFF48: return this._gpu.getPalette( 1 );
            case 0xFF49: return this._gpu.getPalette( 2 );

            case 0xFF4A: return this._environment.gpuWinPosition[ 1 ];
            case 0xFF4B: return this._environment.gpuWinPosition[ 0 ];

            case 0xFFFF: return this._environment.enabledInterrupts;

            default:
                //console.log('invalid read at ' + address);
            return 0;

        }

    }

    _fastWriteUint8( address, value ) {

        if ( address >= 0x0000 && address < 0x8000 ) return this._mbc.writeRomUint8( address, value );
        if ( address >= 0xA000 && address < 0xC000 ) return this._mbc.writeRamUint8( address, value );
        if ( address >= 0xC000 && address < 0xE000 ) return ( this._wram[ address & 0x1FFF ] = value );
        if ( address >= 0xE000 && address < 0xFE00 ) return ( this._wram[ address & 0x1FFF ] = value );
        if ( address >= 0xFF80 && address < 0xFFFF ) return ( this._hram[ address - 0xFF80 ] = value );

        if ( address >= 0x8000 && address < 0xA000 ) {
            if ( ! this._environment.gpuLcdFeature || this._environment.gpuMode !== 0x03 ) {
                this._vram[ address & 0x1FFF ] = value;
                if ( address < 0x9800 ) {
                    this._gpu.updateTile( address & 0x1FFF );
                }
            }
            return ;
        }

        if ( address >= 0xFE00 && address < 0xFEA0 ) {
            if ( ! this._environment.gpuLcdFeature || this._environment.gpuMode <= 0x01 ) {
                this._oam[ address - 0xFE00 ] = value;
                this._gpu.updateSprite( address - 0xFE00 );
            }
            return ;
        }

        switch ( address ) {

            case 0xFF00: return ( this._environment.ioKeyColumn = value & 0x30 );

            case 0xFF0F: return ( this._environment.pendingInterrupts = value );

            case 0xFF40:
                this._environment.gpuBackgroundFeature = value & ( 1 << 0 ) ? true : false;
                this._environment.gpuSpriteFeature     = value & ( 1 << 1 ) ? true : false;
                this._environment.gpuSpriteSize        = value & ( 1 << 2 ) ? 1 : 0;
                this._environment.gpuBackgroundBase    = value & ( 1 << 3 ) ? 1 : 0;
                this._environment.gpuTilesetBase       = value & ( 1 << 4 ) ? 1 : 0;
                this._environment.gpuWindowFeature     = value & ( 1 << 5 ) ? true : false;
                this._environment.gpuWindowBase        = value & ( 1 << 6 ) ? 1 : 0;
                this._environment.gpuLcdFeature        = value & ( 1 << 7 ) ? true : false;
            return ;

            case 0xFF41:
                this._environment.gpuInterrupts = value & 0x78;
            return ;

            case 0xFF42: return ( this._environment.gpuBgScroll[ 1 ] = value );
            case 0xFF43: return ( this._environment.gpuBgScroll[ 0 ] = value );

            case 0xFF44: return ( this._environment.gpuLy = 0 );
            case 0xFF45: return ( this._environment.gpuLyc = value );

            case 0xFF46: return this._gpu.transferDma( value );

            case 0xFF47: return this._gpu.setPalette( 0, value );
            case 0xFF48: return this._gpu.setPalette( 1, value );
            case 0xFF49: return this._gpu.setPalette( 2, value );

            case 0xFF4A: return ( this._environment.gpuWinPosition[ 1 ] = value );
            case 0xFF4B: return ( this._environment.gpuWinPosition[ 0 ] = value );

            case 0xFFFF: return ( this._environment.enabledInterrupts = value );

            default:
                //console.log('invalid write at ' + address);
            return ;

        }

    }

    readUint16( address ) {

        var h = this.readUint8( address + 1 );
        var l = this.readUint8( address + 0 );

        return ( h << 8 ) | ( l << 0 );

    }

}
