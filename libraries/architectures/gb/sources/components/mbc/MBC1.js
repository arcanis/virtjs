/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( rom ) {

            this._mode = 0x00;

            this._rom = rom;
            this._ram = new ArrayBuffer( 0x6000 );

            this._romBank = 0x01;
            this._ramBank = 0x00;

            this._romBank00 = new Uint8Array( this._rom, 0x0000, 0x4000 );
            this._romBankNN = null;
            this._ramBankNN = null;

            this._rebank( );

            this._romBank00Map = [ this._romBank00Access.bind( this ), null ];
            this._romBankNNMap = [ this._romBankNNAccess.bind( this ), null ];
            this._ramBankNNMap = [ this._ramBankNNAccess.bind( this ), null ];

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

            this._ramBankMapNN[ 1 ] = address;
            return this._ramBankMapNN;

        },

        _rebank : function ( ) {

            var romBank = this._romBank;
            var ramBank = this._ramBank;

            if ( this._mode === 0 ) {
                ramBank = 0x00;
            } else {
                romBank &= 0x1F;
            }

            this._romBankNN = new Uint8Array( this._rom, romBank * 0x4000, 0x4000 );
            this._ramBankNN = new Uint8Array( this._ram, ramBank * 0x2000, 0x2000 );

        },

        _romBank00Access : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBank00[ address ];

            if ( address < 0x2000 ) {

            } else {

                this._romBank &= 0x60;
                this._romBank |= ( value & 0x1F ) << 0;

                if ( ( this._romBank & 0x1F ) === 0 )
                    this._romBank += 1;

                this._rebank( );

            }

            return undefined;

        },

        _romBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._romBankNN[ address ];

            if ( address < 0x2000 ) {

                this._romBank &= 0x1F;
                this._romBank |= ( value & 0x03 ) << 5;

                this._rebank( );

            } else {

                this._mode = value & 0x01;

                this._rebank( );

            }

            return undefined;

        },

        _ramBankNNAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._ramEnabled ? this._ramBankNN[ address ] : 0;

            if ( this._ramEnabled )
                this._ramBankNN[ address ] = value;

            return undefined;

        }

    } );

} );
