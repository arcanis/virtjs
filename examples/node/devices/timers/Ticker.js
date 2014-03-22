/*global require, module, setImmediate, setTimeout, clearTimeout*/

var Virtjs = require( 'virtjs' );

module.exports = Virtjs.ClassUtil.extend( {

    nextTick : function ( callback ) {

        setImmediate( function ( ) {
            callback( );
        } );

    },

    createTimeout : function ( callback, delay ) {

        return setTimeout( function ( ) {
            callback( );
        }, delay );

    },

    cancelTimeout : function ( timeout ) {

        clearTimeout( timeout );

    }

} );
