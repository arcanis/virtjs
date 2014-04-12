/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

        },

        setup : function ( ) {

            this._engine.environment.mbc1Mode = 0x00;
            this._engine.environment.mbc1RamFeature = false;

            this._engine.environment.mbc1Ram = new Uint8Array( 0x6000 );

            this._engine.environment.mbc1RomBank = 0x01;
            this._engine.environment.mbc1RamBank = 0x00;

            this._romBank00 = new Uint8Array( this._engine.environment.rom.buffer, 0x0000, 0x4000 );
            this._romBankNN = null;
            this._ramBankNN = null;

            this._romBank00Map = [ this._romBank00Access.bind( this ), null ];
            this._romBankNNMap = [ this._romBankNNAccess.bind( this ), null ];
            this._ramBankNNMap = [ this._ramBankNNAccess.bind( this ), null ];

            this._rebank( );

        },

        romMapping : function ( address ) {

            if ( address < 0x4000 ) {

                this._romBank00Map[ 1 ] = address;
                return this._romBank00Map;

            } else {

                this._romBankNNMap[ 1 ] = address - 0x4000;
                return this._romBankNNMap;

            }

        },

        ramMapping : function ( address ) {

            this._ramBankNNMap[ 1 ] = address;
            return this._ramBankNNMap;

        },

        _rebank : function ( ) {

            var romBank = this._engine.environment.mbc1RomBank;
            var ramBank = this._engine.environment.mbc1RamBank;

            if ( this._engine.environment.mbc1Mode === 0 ) {
                // "the only limitiation is that only RAM Bank 00h can be used during Mode 0 ..."
                ramBank = 0x00;
            } else {
                // "and only ROM Banks 00-1Fh can be used during Mode 1"
                romBank &= 0x1F;
            }

            this._romBankNN = new Uint8Array( this._engine.environment.rom.buffer, romBank * 0x4000, 0x4000 );
            this._ramBankNN = new Uint8Array( this._engine.environment.mbc1Ram.buffer, ramBank * 0x2000, 0x2000 );

        },

        _romBank00Access : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBank00[ address ];

            if ( address < 0x2000 ) {

                this._engine.environment.mbc1RamFeature = ( value & 0x0A ) === 0x0A;

            } else {

                this._engine.environment.mbc1RomBank &= 0x60;
                this._engine.environment.mbc1RomBank |= ( value & 0x1F ) << 0;

                if ( ( this._engine.environment.mbc1RomBank & 0x1F ) === 0 )
                    this._engine.environment.mbc1RomBank += 1;

                this._rebank( );

            }

            return undefined;

        },

        _romBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBankNN[ address ];

            if ( address < 0x2000 ) {

                this._engine.environment.mbc1RomBank &= 0x1F;
                this._engine.environment.mbc1RomBank |= ( value & 0x03 ) << 5;

                this._engine.environment.mbc1RamBank = value & 0x03;

                this._rebank( );

            } else {

                this._engine.environment.mbc1Mode = value & 0x01;

                this._rebank( );

            }

            return undefined;

        },

        _ramBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.mbc1RamFeature ? this._ramBankNN[ address ] : 0;

            if ( this._engine.environment.mbc1RamFeature )
                this._ramBankNN[ address ] = value;

            return undefined;

        }

    } );

} );
