/*global define*/

define( [

    '../../utils/Class',
    '../../utils/Object',

    '../../mixins/Emitter'

], function ( ClassUtil, ObjectUtil, EmitterMixin ) {

    return ClassUtil.extend( [

        EmitterMixin

    ], {

        initialize : function ( options ) {

            this._options = ObjectUtil.extend( {
                element : document.body,
                map : { }
            }, options );

            this._onKeyDown_ = this._onKeyDown.bind( this );
            this._onKeyUp_ = this._onKeyUp.bind( this );

            this._attach( );

        },

        destroy : function ( ) {

            this._detach( );

        },

        _attach : function ( ) {

            this._options.element.addEventListener( 'keydown', this._onKeyDown_ );
            this._options.element.addEventListener( 'keyup', this._onKeyUp_ );

        },

        _detach : function ( ) {

            this._options.element.removeEventListener( 'keydown', this._onKeyDown_ );
            this._options.element.removeEventListener( 'keyup', this._onKeyUp_ );

        },

        _onKeyDown : function ( e ) {

            if ( typeof this._options.map[ e.keyCode ] === 'undefined' )
                return ;

            e.preventDefault( );

            this.emit( 'keydown', this._options.map[ e.keyCode ] );

        },

        _onKeyUp : function ( e ) {

            if ( typeof this._options.map[ e.keyCode ] === 'undefined' )
                return ;

            this.emit( 'keyup', this._options.map[ e.keyCode ] );

        }

    } );

} );
