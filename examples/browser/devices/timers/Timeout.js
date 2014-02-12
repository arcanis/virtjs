define( function ( ) {

    var Timer = function ( ) {

    };

    Timer.prototype.nextTick = function ( callback ) {

        window.requestAnimationFrame( function ( ) {
            callback( );
        } );

    };

    Timer.prototype.createTimeout = function ( callback, delay ) {

        return window.setTimeout( function ( ) {
            callback( );
        }, delay );

    };

    Timer.prototype.cancelTimeout = function ( timeout ) {

        window.clearTimeout( timeout );

    };

    return Timer;

} );
