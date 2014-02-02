define( [

    '../utils/Class'

], function ( ClassUtil ) {

    return ClassUtil.extend( {

        initialize : function ( ) {

            this._status = 'stopped';

        },

        start : function ( ) {

            if ( this._status !== 'stopped' )
                return ;

            this.setup( );
            this.load.apply( this, arguments );

            this._status = 'paused';
            this.resume( );

        },

        resume : function ( ) {

            if ( this._status !== 'paused' )
                return ;

            this._status = 'running';
            this._nextTick( );

        },

        pause : function ( ) {

            if ( this._status !== 'running' )
                return ;

            this._status = 'paused';

        },

        stop : function ( ) {

            if ( this._status !== 'running' && this._status !== 'paused' )
                return ;

            this._status = 'stopped';

        },

        _nextTick : function ( ) {

            this.step( );

            this._options.timer.nextTick( this._nextTick.bind( this ) );

        }

    } );

} );
