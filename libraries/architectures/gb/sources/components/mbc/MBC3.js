/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            this._engine._options.data.on( 'requestSave', function ( ) {

                this._engine.save( 'cartridge', {
                    ram : this._engine.environment.mbc3Ram.buffer
                } );

            }.bind( this ) );

        },

        setup : function ( ) {

            var saved = this._engine._options.data.restore( 'cartridge' ) || { };

            this._engine.environment.mbc3Mode = 0x00;
            this._engine.environment.mbc3RamFeature = false;

            this._engine.environment.mbc3Ram = new Uint8Array( saved.ram || new ArrayBuffer( 0x6000 ) );
            this._engine.environment.mbc3Rtc = new Uint8Array( 5 );
            this._engine.environment.mbc3Latch = new Uint8Array( 1 );

            this._engine.environment.mbc3RomBank = 0x01;
            this._engine.environment.mbc3RamBank = 0x00;

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

            var romBank = this._engine.environment.mbc3RomBank;
            var ramBank = this._engine.environment.mbc3RamBank;

            this._romBankNN = new Uint8Array( this._engine.environment.rom.buffer, romBank * 0x4000, 0x4000 );
            this._ramBankNN = new Uint8Array( this._engine.environment.mbc3Ram.buffer, ramBank * 0x2000, 0x2000 );

        },

        _latch : function ( ) {

            var d = new Date( );

            var rtc = this._engine.environment.mbc3Rtc;

            rtc[ 0 ] = d.getSeconds( );
            rtc[ 1 ] = d.getMinutes( );
            rtc[ 2 ] = d.getHours( );
            rtc[ 3 ] = 0; // hack
            rtc[ 4 ] = 0; // 1

        },

        _romBank00Access : function ( address, value ) {

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

        },

        _romBankNNAccess : function ( address, value ) {

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

        },

        _ramBankNNAccess : function ( address, value ) {

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

    } );

} );
