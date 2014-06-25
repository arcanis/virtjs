export class ImmediateTimer {

    nextTick( callback ) {

        setImmediate( ( ) => {
            callback( );
        } );

    }

    createTimeout( callback, delay ) {

        return setTimeout( ( ) => {
            callback( );
        }, delay );

    }

    cancelTimeout( timeout ) {

        clearTimeout( timeout );

    }

};
