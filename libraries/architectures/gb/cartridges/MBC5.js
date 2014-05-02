/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( features, engine ) {

            this._features = features;
            this._engine = engine;

            if ( this._engine.devices.data && this._features.battery ) {
                this._engine.devices.data.on( 'requestSave', function ( ) {
                    this.save( );
                }.bind( this ) );
            }

        },

        save : function ( ) {

            if ( ! this._features.battery )
                return ;

            if ( ! this._engine.devices.data )
                return ;

            if ( this._features.ram ) {
                this._engine.devices.data.save( this._storageName, {
                    ram : this._engine.environment.mbc1Ram.buffer
                } );
            }

        },

        setup : function ( ) {

            this._storageName = this._engine.environment.ident ? this._engine.environment.ident + '.' : '';
            this._storageName += 'cartridge';

            var saved = this._engine.devices.data && this._features.battery
                ? this._engine.devices.data.restore( this._storageName ) || { }
                : { };

            this._engine.environment.mbc5Mode = 0x00;
            this._engine.environment.mbc5RamFeature = false;

            var ramBuffer = saved.ram || new ArrayBuffer( 0x2000 * 0x0F );
            this._engine.environment.mbc5Ram = new Uint8Array( ramBuffer );

            this._engine.environment.mbc5RomBank = 0x01;
            this._engine.environment.mbc5RamBank = 0x00;

            this._romBanks = [ ];
            for ( var romBank = 0; romBank * 0x4000 < this._engine.environment.rom.buffer.byteLength; ++ romBank )
                this._romBanks[ romBank ] = new Uint8Array( this._engine.environment.rom.buffer, romBank * 0x4000, 0x4000 );

            this._ramBanks = [ ];
            for ( var ramBank = 0; ramBank * 0x2000 < this._engine.environment.mbc5Ram.buffer.byteLength; ++ ramBank )
                this._ramBanks[ ramBank ] = new Uint8Array( this._engine.environment.mbc5Ram.buffer, ramBank * 0x2000, 0x2000 );

            this._romBank00 = this._romBanks[ 0x00 ];
            this._romBankNN = null;
            this._ramBankNN = null;

            this._rebank( );

        },

        romMapping : function ( address ) {

            if ( address < 0x4000 ) {
                return Virtjs.MemoryUtil.accessor( this._romBank00Access, this, address );
            } else {
                return Virtjs.MemoryUtil.accessor( this._romBankNNAccess, this, address - 0x4000 );
            }

        },

        ramMapping : function ( address ) {

            return Virtjs.MemoryUtil.accessor( this._ramBankNNAccess, this, address );

        },

        _rebank : function ( ) {

            var romBank = this._engine.environment.mbc5RomBank;
            var ramBank = this._engine.environment.mbc5RamBank;

            this._romBankNN = this._romBanks[ romBank ];
            this._ramBankNN = this._ramBanks[ ramBank ];

        },

        _romBank00Access : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBank00[ address ];

            if ( address < 0x2000 ) {

                this._engine.environment.mbc5RamFeature = ( value & 0x0A ) === 0x0A;

            } else {

                if ( address < 0x3000 ) {
                    this._engine.environment.mbc5RomBank &= 0x100;
                    this._engine.environment.mbc5RomBank |= value;
                } else {
                    this._engine.environment.mbc5RomBank &= 0x0FF;
                    this._engine.environment.mbc5RomBank |= ( value & 0x01 ) << 8;
                }

                this._rebank( );

            }

            return undefined;

        },

        _romBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBankNN[ address ];

            this._engine.environment.mbc5RamBank = value & 0x0F;

            this._rebank( );

        },

        _ramBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.mbc5RamFeature ? this._ramBankNN[ address ] : 0;

            if ( this._engine.environment.mbc5RamFeature )
                this._ramBankNN[ address ] = value;

            return undefined;

        }

    } );

} );
