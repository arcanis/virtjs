import { EmitterMixin } from '../../mixins/EmitterMixin';
import { mixin }        from '../../utils/ObjectUtils';

var automapData = {

    LEFT   : [ 37 ], // arrow left
    RIGHT  : [ 39 ], // arrow right
    UP     : [ 38 ], // arrow up
    DOWN   : [ 40 ], // arrow down

    A      : [ 65, 81 ], // 'A', 'Q'
    B      : [ 90, 87 ], // 'Z', 'W'

    START  : [ 13 ], // enter
    SELECT : [ 32 ]  // space

};

export class KeyboardInput extends mixin( null, EmitterMixin ) {

    constructor( { map = null, element = document.body, inputs } = { } ) {

        super( );

        this.element = null;
        this.map = map;

        this._onKeyDown_ = e => { this._onKeyDown( e ); };
        this._onKeyUp_ = e => { this._onKeyUp( e ); };

        if ( element )
            this.setElement( element );

        if ( inputs ) {
            this.setInputs( inputs );
        }

    }

    setElement( element ) {

        if ( this.element )
            this._detach( element );

        this.element = element;
        this._attach( element );

    }

    setInputs( inputs ) {

        this.map = this._createAutomap( inputs );

    }

    destroy( ) {

        this.setElement( null );

    }

    _createAutomap( inputs ) {

        var map = { };

        Object.keys( inputs ).forEach( function ( name ) {

            if ( ! automapData[ name ] )
                return ;

            automapData[ name ].forEach( function ( keyCode ) {
                map[ keyCode ] = inputs[ name ];
            } );

        }, this );

        return map;

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

        if ( e.keyCode === 8 /* backspace */ )
            e.preventDefault( );

        if ( e.metaKey || e.ctrlKey || e.shiftKey || e.altKey )
            return ;

        if ( ! this.map )
            return ;

        if ( typeof this.map[ e.keyCode ] === 'undefined' )
            return ;

        e.preventDefault( );

        this.emit( 'keydown', this.map[ e.keyCode ] );

    }

    _onKeyUp( e ) {

        if ( ! this.map )
            return ;

        if ( typeof this.map[ e.keyCode ] === 'undefined' )
            return ;

        this.emit( 'keyup', this.map[ e.keyCode ] );

    }

};
