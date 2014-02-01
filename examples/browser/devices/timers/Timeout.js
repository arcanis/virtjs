define( function ( ) {

    var Timer = function ( ) {

    };

    Timer.prototype.nextTick = function ( callback ) {

        window.setTimeout( function ( ) {
            callback( );
        }, 0 );

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
