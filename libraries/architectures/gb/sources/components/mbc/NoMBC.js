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

            this._romMap = [ this._romAccess.bind( this ), null ];
            this._ramMap = [ this._engine.environment.nombcRamBank, null ];

            var rom = this._engine.environment.rom;
            for ( var t = 0, T = rom.length; t < T; ++ t ) {
                this._engine.environment.nombcRomBank[ t ] = rom[ t ];
            }

        },

        romMapping : function ( address ) {

            this._romMap[ 1 ] = address;
            return this._romMap;

        },

        ramMapping : function ( address ) {

            this._ramMap[ 1 ] = address;
            return this._ramMap;

        },

        _romAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._engine.environment.nombcRomBank[ address ];

            // No set

        }

    } );

} );
