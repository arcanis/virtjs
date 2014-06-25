export class RAFrameTimer {

    constructor( options = { } ) {

        this._tickRequest = null;
        this._nextTicks = [ ];
        this._nextTicksBackup = [ ];

        this._fpsMeter = options.fpsMeter || {
            tickStart : function ( ) { },
            tick : function ( ) { }
        };

        this._onTick_ = ( ) => {
            this._onTick.call( this );
        };

    }

    nextTick( callback ) {

        this._nextTicks.push( callback );

        if ( this._tickRequest === null ) {
            this._tickRequest = window.requestAnimationFrame( this._onTick_ );
        }

    }

    createTimeout( callback, delay ) {

        return window.setTimeout( ( ) => {
            callback( );
        }, delay );

    }

    cancelTimeout( timeout ) {

        window.clearTimeout( timeout );

    }

    _onTick( ) {

        this._tickRequest = null;

        this._fpsMeter.tickStart( );

        var callbacks = this._nextTicks;
        this._nextTicks = this._nextTicksBackup;
        this._nextTicksBackup = callbacks;

        for ( var t = 0, T = callbacks.length; t < T; ++ t )
            callbacks[ t ]( );

        callbacks.length = 0;

        this._fpsMeter.tick( );

    }

};
