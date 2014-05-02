/*global define, setImmediate, setTimeout, clearTimeout*/

define( [

    '../../utils/Class'

], function ( ClassUtil ) {

    return ClassUtil.extend( {

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

} );
