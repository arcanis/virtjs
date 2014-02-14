define( [

    '../utils/Class',
    '../utils/Debug'

], function ( ClassUtil, DebugUtil ) {

    return ClassUtil.extend( {

        initialize : function ( ) {

            // This line will setup the right branches when used by the build tool
            DebugUtil.preprocessFunction( this, '_setStatus', this._options );

            this._setStatus( 'stopped' );
            this._waiting = false;

        },

        start : function ( autoResume ) {

            if ( typeof autoResume === 'undefined' )
                autoResume = true;

            if ( this._status !== 'stopped' )
                return ;

            this.setup( );
            this.load.apply( this, arguments );

            this._setStatus( 'paused' );

            if ( autoResume ) {
                this.resume( );
            }

        },

        resume : function ( ) {

            if ( this._status !== 'paused' )
                return ;

            this._setStatus( 'running' );

            if ( ! this._waiting ) {
                this._nextTick( );
            }

        },

        pause : function ( ) {

            if ( this._status !== 'running' )
                return ;

            this._setStatus( 'paused' );

        },

        one : function ( ) {

            if ( this._status !== 'paused' )
                return ;

            this._setStatus( 'running' );
            this.step( );
            this._setStatus( 'paused' );

        },

        stop : function ( ) {

            if ( this._status !== 'running' && this._status !== 'paused' )
                return ;

            this._setStatus( 'stopped' );

        },

        _setStatus : function ( status ) {

            this._status = status;

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'status' ) !== - 1 ) {
                this.emit( 'status', { status : status } );
            }

        },

        _nextTick : function ( ) {

            if ( this._status !== 'running' ) {

                this._waiting = false;

            } else {

                this.step( );

                this._waiting = true;

                this._options.timer.nextTick( this._nextTick.bind( this ) );

            }

        }

    } );

} );
