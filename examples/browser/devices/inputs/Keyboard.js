/*global Virtjs*/

( function ( ) {

    Virtjs.input.Keyboard = Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( map ) {

            this._map = map;

        },

        listen : function ( element ) {

            element.addEventListener( 'keydown', function ( e ) {

                if ( typeof this._map[ e.keyCode ] === 'undefined' )
                    return ;

                e.preventDefault( );

                this.emit( 'keydown', this._map[ e.keyCode ] );

            }.bind( this ) );

            element.addEventListener( 'keyup', function ( e ) {

                if ( typeof this._map[ e.keyCode ] === 'undefined' )
                    return ;

                this.emit( 'keyup', this._map[ e.keyCode ] );

            }.bind( this ) );

        }

    } );

} )( );
