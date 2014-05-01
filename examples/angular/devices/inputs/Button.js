/*global Virtjs, require*/

( function ( Virtjs ) {

    Virtjs.input.Mouse = Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( options ) {

            options = Virtjs.ObjectUtil.extend( {

                // Element which should be monitored
                element : document.body

            } );

            this._onMouseDown_ = this._onMouseDown.bind( this );
            this._onMouseUp_ = this._onMouseUp.bind( this );

            this._attach( );

        },

        destroy : function ( ) {

            this._detach( );

        },

        _attach : function ( ) {

            this._options.element.addEventListener( 'mousedown', this._onMouseDown_ );
            this._options.element.addEventListener( 'mouseup', this._onMouseUp_ );

        },

        _detach : function ( ) {

            this._options.element.removeEventListener( 'mousedown', this._onMouseDown_ );
            this._options.element.removeEventListener( 'mouseup', this._onMouseUp_ );

        },

        _onMouseDown : function ( ) {

            if ( typeof this._options.code === 'undefined' )
                return ;

            this.emit( 'keydown', this._options.code );

        },

        _onMouseUp : function ( ) {

            if ( typeof this._options.code === 'undefined' )
                return ;

            this.emit( 'keyup', this._options.code );

        }

    } );

} )( window.Virtjs || require( 'virtjs' ) );
