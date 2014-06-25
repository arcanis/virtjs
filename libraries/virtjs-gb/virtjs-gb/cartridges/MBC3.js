import { createAccessor } from 'virtjs/utils/MemoryUtils';

export class MBC3 {

    constructor( features, engine ) {

        this._features = features;
        this._engine = engine;

        if ( this._engine.devices.data && this._features.battery ) {
            this._engine.devices.data.on( 'requestSave', ( ) => {
                this.save( );
            } );
        }

    }

    save( ) {

        if ( ! this._features.battery )
            return ;

        if ( ! this._engine.devices.data )
            return ;

        if ( this._features.ram ) {
            this._engine.devices.data.save( this._storageName, {
                ram : this._engine.environment.mbc3Ram.buffer
            } );
        }

    }

    setup( ) {

        this._storageName = this._engine.environment.ident ? this._engine.environment.ident + '.' : '';
        this._storageName += 'cartridge';

        var saved = this._engine.devices.data && this._features.battery
            ? this._engine.devices.data.restore( this._storageName ) || { }
            : { };

        this._engine.environment.mbc3Mode = 0x00;
        this._engine.environment.mbc3RamFeature = false;

        var ramBuffer = saved.ram || new ArrayBuffer( 0x2000 * 0x04 );
        this._engine.environment.mbc3Ram = new Uint8Array( ramBuffer );
        this._engine.environment.mbc3Rtc = new Uint8Array( 5 );
        this._engine.environment.mbc3Latch = new Uint8Array( 1 );

        this._engine.environment.mbc3RomBank = 0x01;
        this._engine.environment.mbc3RamBank = 0x00;

        this._romBanks = [ ];
        for ( var romBank = 0; romBank * 0x4000 < this._engine.environment.rom.buffer.byteLength; ++ romBank )
            this._romBanks[ romBank ] = new Uint8Array( this._engine.environment.rom.buffer, romBank * 0x4000, 0x4000 );

        this._ramBanks = [ ];
        for ( var ramBank = 0; ramBank * 0x2000 < this._engine.environment.mbc3Ram.buffer.byteLength; ++ ramBank )
            this._ramBanks[ ramBank ] = new Uint8Array( this._engine.environment.mbc3Ram.buffer, ramBank * 0x2000, 0x2000 );

        this._romBank00 = this._romBanks[ 0x00 ];
        this._romBankNN = null;
        this._ramBankNN = null;

        this._rebank( );

    }

    romMapping( address ) {

        if ( address < 0x4000 ) {
            return createAccessor( this._romBank00Access, this, address );
        } else {
            return createAccessor( this._romBankNNAccess, this, address - 0x4000 );
        }

    }

    ramMapping( address ) {

        return createAccessor( this._ramBankNNAccess, this, address );

    }

    _rebank( ) {

        var romBank = this._engine.environment.mbc3RomBank;
        var ramBank = this._engine.environment.mbc3RamBank;

        this._romBankNN = this._romBanks[ romBank ];
        this._ramBankNN = this._ramBanks[ ramBank ];

    }

    _latch( ) {

        var d = new Date( );

        var rtc = this._engine.environment.mbc3Rtc;

        rtc[ 0 ] = d.getSeconds( );
        rtc[ 1 ] = d.getMinutes( );
        rtc[ 2 ] = d.getHours( );
        rtc[ 3 ] = 0; // hack
        rtc[ 4 ] = 0; // 1

    }

    _romBank00Access( address, value ) {

        if ( typeof value === 'undefined' )
            return this._romBank00[ address ];

        if ( address < 0x2000 ) {

            this._engine.environment.mbc3RamFeature = ( value & 0x0A ) === 0x0A;

        } else {

            this._engine.environment.mbc3RomBank = value & 0x7F;

            if ( this._engine.environment.mbc3RomBank === 0 )
                this._engine.environment.mbc3RomBank += 1;

            this._rebank( );

        }

        return undefined;

    }

    _romBankNNAccess( address, value ) {

        if ( typeof value === 'undefined' )
            return this._romBankNN[ address ];

        if ( address < 0x2000 ) {

            this._engine.environment.mbc3RamFeature = value <= 0x03;

            if ( this._engine.environment.mbc3RamFeature ) {
                this._engine.environment.mbc3RamBank = value & 0x03;
                this._engine.environment.mbc3RtcIndex = 0;
            } else {
                this._engine.environment.mbc3RtcIndex = value - 0x08;
                this._engine.environment.mbc3RamBank = 0x00;
            }

            this._rebank( );

        } else {

            var latchReady = this._engine.environment.mbc3Latch[ 0 ] === 0x00;

            this._engine.environment.mbc3Latch[ 0 ] = value;

            var latch = latchReady && this._engine.environment.mbc3Latch[ 0 ] === 0x01;

            if ( latch ) {
                this._latch( );
            }

        }

        return undefined;

    }

    _ramBankNNAccess( address, value ) {

        if ( typeof value === 'undefined' ) {
            return this._engine.environment.mbc3RamFeature
                ? this._ramBankNN[ address ]
                : this._engine.environment.mbc3Rtc[ this._engine.environment.mbc3RtcIndex ]
            ;
        }

        if ( this._engine.environment.mbc3RamFeature ) {
            this._ramBankNN[ address ] = value;
        } else {
            this._engine.environment.mbc3Rtc[ this._engine.environment.mbc3RtcIndex ] = value;
        }

        return undefined;

    }

};
