export class SerialTimer {

    constructor( ) {

        this._running = false;
        this._nested = false;

        this._actions = [ ];

        this._queues = [ [ ], [ ] ];
        this._activeQueueIndex = 0;

    }

    nextTick( callback ) {

        var activeQueueIndex = this._activeQueueIndex;
        var queue = this._queues[ activeQueueIndex ];
        var callbackIndex = queue.length;

        queue.push( callback );

        return activeQueueIndex << 24 | callbackIndex;

    }

    cancelTick( nextTickId ) {

        var activeQueueIndex = handler >>> 24;
        var callbackIndex = handler & 0x00FFFFFF;

        this._queues[ activeQueueIndex ][ callbackIndex ] = null;

    }

    start( ) {

        this._running = true;

        if ( this._nested )
            return ;

        this._nested = true;

        while ( this._running ) {
            this.one( );
        }

    }

    one( ) {

        var activeQueueIndex = this._activeQueueIndex;
        this._activeQueueIndex = activeQueueIndex ^ 1;

        var queue = this._queues[ activeQueueIndex ];

        for ( var t = 0, T = queue.length; t < T; ++ t )
            queue[ t ] && queue[ t ]( );

        queue.length = 0;

    }

    stop( ) {

        this._running = false;

    }

}
