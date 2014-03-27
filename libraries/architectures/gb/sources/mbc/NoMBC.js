/*global define*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( rom ) {

            this._romBank = new Uint8Array( rom, 0x0000, 0x8000 );
            this._ramBank = new Uint8Array( 0x2000 );

            this._romMap = [ this._romBank, null ];
            this._ramMap = [ this._ramBank, null ];

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
