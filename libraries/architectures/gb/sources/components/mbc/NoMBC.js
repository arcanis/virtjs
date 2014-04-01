/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

        },

        setup : function ( ) {

            this._engine.environment.nombcRomBank = new Uint8Array( 0x8000 - 0x0000 );
            this._engine.environment.nombcRamBank = new Uint8Array( 0xC000 - 0xA000 );

            this._romMap = [ this._engine.environment.nombcRomBank, null ];
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

        }

    } );

} );
