/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

        },

        setup : function ( ) {

            this._engine.environment.nombcRomBank = new Uint8Array( 32768 );
            this._engine.environment.nombcRamBank = new Uint8Array( 8192 );

            var rom = this._engine.environment.rom;
            for ( var t = 0, T = rom.length; t < T; ++ t ) {
                this._engine.environment.nombcRomBank[ t ] = rom[ t ];
            }

        },

        romMapping : function ( address ) {

            return Virtjs.MemoryUtil.accessor( this._romAccess, this, address );

        },

        ramMapping : function ( address ) {

            return Virtjs.MemoryUtil.plainOldData( this._engine.environment.nombcRamBank, address );

        },

        _romAccess : function ( address, value ) {

            if ( typeof value === 'undefined' ) {
                return this._engine.environment.nombcRomBank[ address ];
            } else {
                return void 0;
            }

        }

    } );

} );
