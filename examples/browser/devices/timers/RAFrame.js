/*global Virtjs*/

( function ( ) {

    Virtjs.timer.RAFrame = Virtjs.ClassUtil.extend( {

        initialize : function ( options ) {

            options = options || { };

            this._tick_ = this._tick.bind( this );

            this._tickRequest = null;
            this._nextTicks = [ ];
            this._nextTicksBackup = [ ];

            this._fpsMeter = options.fpsMeter || {
                tickStart : function ( ) { },
                tick : function ( ) { }
            };

        },

        nextTick : function ( callback ) {

            this._nextTicks.push( callback );

            if ( this._tickRequest === null ) {
                this._tickRequest = window.requestAnimationFrame( this._tick_ );
            }

        },

        createTimeout : function ( callback, delay ) {

            return window.setTimeout( function ( ) {
                callback( );
            }, delay );

        },

        cancelTimeout : function ( timeout ) {

            window.clearTimeout( timeout );

        },

        _tick : function ( ) {

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

    } );

} )( );
