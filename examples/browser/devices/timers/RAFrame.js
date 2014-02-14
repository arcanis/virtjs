/*global Virtjs*/

( function ( ) {

    Virtjs.timer.RAFrame = Virtjs.ClassUtil.extend( {

        initialize : function ( ) {

        },

        nextTick : function ( callback ) {

            window.requestAnimationFrame( function ( ) {
                callback( );
            } );

        },

        createTimeout : function ( callback, delay ) {

            return window.setTimeout( function ( ) {
                callback( );
            }, delay );

        },

        cancelTimeout : function ( timeout ) {

            window.clearTimeout( timeout );

        }

    } );

} )( );
