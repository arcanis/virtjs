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

    constructor( { element = document.body } ) {

        this._map = options.map || this._createAutomap( options.inputs );
        this._element = options.element;

        this._onKeyDown_ = this._onKeyDown.bind( this );
        this._onKeyUp_ = this._onKeyUp.bind( this );

        this._attach( );

    }

    destroy( ) {

        this._detach( );

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

    _attach( ) {

        this._element.addEventListener( 'keydown', this._onKeyDown_ );
        this._element.addEventListener( 'keyup', this._onKeyUp_ );

    }

    _detach( ) {

        this._element.removeEventListener( 'keydown', this._onKeyDown_ );
        this._element.removeEventListener( 'keyup', this._onKeyUp_ );

    }

    _onKeyDown( e ) {

        if ( typeof this._map[ e.keyCode ] === 'undefined' )
            return ;

        e.preventDefault( );

        this.emit( 'keydown', this._map[ e.keyCode ] );

    }

    _onKeyUp( e ) {

        if ( typeof this._map[ e.keyCode ] === 'undefined' )
            return ;

        this.emit( 'keyup', this._map[ e.keyCode ] );

    }

};
