export class AsyncTimer {

    constructor( { prepare, cancel } = { } ) {

        if ( prepare )
            this.prepare = prepare;

        if ( cancel )
            this.cancel = cancel;

        this._timer = null;

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

    cancelTick( handler ) {

        var activeQueueIndex = handler >>> 24;
        var callbackIndex = handler & 0x00FFFFFF;

        this._queues[ activeQueueIndex ][ callbackIndex ] = null;

    }

    start( beginning, ending ) {

        if ( this._timer )
            return ;

        var loop = beginning && ending ? ( ) => {

            this._timer = this.prepare( loop );

            beginning( );
            this.one( );
            ending( );

        } : beginning ? ( ) => {

            this._timer = this.prepare( loop );

            beginning( );
            this.one( );

        } : ending ? ( ) => {

            this._timer = this.prepare( loop );

            this.one( );
            ending( );

        } : ( ) => {

            this._timer = this.prepare( loop );

            this.one( );

        };

        loop( );

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

        if ( ! this._timer )
            return ;

        this.cancel( this._timer );
        this._timer = null;

    }

    prepare( ) {

        throw new Error( 'Unimplemented' );

    }

    cancel( ) {

        throw new Error( 'Unimplemented' );

    }

}
