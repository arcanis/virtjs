var defaultTranslationMap = {

    LEFT   : [ 37 ], // arrow left
    RIGHT  : [ 39 ], // arrow right
    UP     : [ 38 ], // arrow up
    DOWN   : [ 40 ], // arrow down

    A      : [ 65, 81 ], // 'A', 'Q'
    B      : [ 90, 87 ], // 'Z', 'W'

    START  : [ 13 ], // enter
    SELECT : [ 32 ]  // space

};

export class KeyboardInput {

    constructor( { element = document.body, keyMap = null, inputMap = null } = { } ) {

        super( );

        this._element = null;
        this._keyMap = keyMap;

        this._activeKeystate = { };
        this._pendingKeystate = 0;
        this._keystateChanged = false;

        this._onKeyDown_ = e => { this._onKeyDown( e ); };
        this._onKeyUp_ = e => { this._onKeyUp( e ); };

        if ( element )
            this.setElement( element );

        if ( inputMap ) {
            this.applyInputMap( inputMap );
        }

    }

    setElement( element ) {

        if ( this._element )
            this._detach( this._element );

        this._element = element;

        if ( this._element ) {
            this._attach( this._element );
        }

    }

    applyInputMap( inputs, options ) {

        this.setKeyMap( this._parseInputMap( inputs, options ) );

    }

    setKeyMap( map ) {

        this._map = map;

        this._activeInputState = { };
        this._pendingInputState = { };
        this._inputStateChanged = false;

        for ( var keyCode of Object.keys( this._map ) ) {
            var inputCode = this._map[ keyCode ];
            this._activeInputState[ inputCode ] = false;
        }

    }

    pollInputs( ) {

        if ( ! this._inputStateChanged )
            return ;

        for ( var inputCode of Object.keys( this._pendingInputState ) )
            this._activeInputState[ inputCode ] = this._pendingInputState[ inputCode ];

        this._pendingInputState = { };
        this._inputStateChanged = false;

    }

    getState( port, inputCode ) {

        if ( port !== 0 )
            return false;

        return this._activeInputState[ inputCode ];

    }

    _parseInputMap( inputMap, { translationMap = defaultTranslationMap } = { } ) {

        var keyMap = { };

        for ( var inputName of Object.keys( inputMap ) ) {

            if ( ! translationMap[ inputName ] )
                throw new Error( `Unrecognized input name ${inputName}` );

            var inputCode = inputMap[ inputName ];

            for ( var keyCode of translationMap[ inputName ] ) {
                keyMap[ keyCode ] = inputCode;
            }

        }

        return keyMap;

    }

    _attach( element ) {

        element.addEventListener( 'keydown', this._onKeyDown_ );
        element.addEventListener( 'keyup', this._onKeyUp_ );

    }

    _detach( ) {

        element.removeEventListener( 'keydown', this._onKeyDown_ );
        element.removeEventListener( 'keyup', this._onKeyUp_ );

    }

    _onKeyDown( e ) {

        if ( [ 'select', 'input', 'textarea' ].includes( e.target.tagName.toLowerCase( ) ) )
            return ;

        if ( e.keyCode === 8 /* backspace */ )
            e.preventDefault( );

        if ( e.metaKey || e.ctrlKey || e.shiftKey || e.altKey )
            return ;

        if ( ! this._map )
            return ;

        var inputCode = this._map[ e.keyCode ];

        if ( typeof inputCode === 'undefined' )
            return ;

        e.preventDefault( );

        this._pendingInputState[ inputCode ] = true;
        this._inputStateChanged = true;

    }

    _onKeyUp( e ) {

        if ( ! this._map )
            return ;

        var inputCode = this._map[ e.keyCode ];

        if ( typeof inputCode === 'undefined' )
            return ;

        this._pendingInputState[ inputCode ] = false;
        this._inputStateChanged = true;

    }

};
