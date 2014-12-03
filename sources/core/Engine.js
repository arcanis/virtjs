export class Engine {

    constructor( options = { } ) {

        this.devices = options.devices;

        this._setStatus( 'stopped' );
        this._waiting = false;

        this._nextTick_ = ( ) => {
            this._nextTick.call( this );
        };

    }

    load( /* ..., options = { } */ ) {

        // The options are the last element from the parameter list
        // Using `this.load.length` works even if a child class adds parameters to the `load` method.

        var options = arguments[ this.load.length - 1 ] || { };
        var autoResume = options.autoResume;

        if ( typeof autoResume === 'undefined' )
            autoResume = true;

        if ( this._status !== 'stopped' )
            this._setStatus( 'paused' );

        this._load.apply( this, arguments );

        if ( this._status !== 'paused' )
            this._setStatus( 'paused' );

        if ( autoResume )
            this.resume( );

        return this;

    }

    resume( ) {

        if ( this._status !== 'paused' )
            return ;

        this._setStatus( 'running' );

        if ( ! this._waiting ) {
            this._nextTick( );
        }

    }

    pause( ) {

        if ( this._status !== 'running' )
            return ;

        this._setStatus( 'paused' );

    }

    one( ) {

        if ( this._status !== 'paused' )
            return ;

        this._setStatus( 'running' );
        this.step( );
        this._setStatus( 'paused' );

    }

    stop( ) {

        if ( this._status !== 'running' && this._status !== 'paused' )
            return ;

        this._setStatus( 'stopped' );

    }

    _setStatus( status ) {

        this._status = status;

        if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'status' ) !== - 1 ) {
            this.emit( 'status', { status : status } );
        }

    }

    _nextTick( ) {

        if ( this._status !== 'running' ) {

            this._waiting = false;

        } else {

            this.devices.timer.nextTick( this._nextTick_ );

            this.step( );

            this._waiting = true;

        }

    }

    _load( ) {

        throw new Error( 'The _load() method has to be implemented by the engine.' );

    }

};
