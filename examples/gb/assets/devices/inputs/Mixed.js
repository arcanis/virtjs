/*global Virtjs, require*/

( function ( Virtjs ) {

    Virtjs.input.Mixed = Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( inputs ) {

            this._inputs = inputs;

            this._onEmit_ = this._onEmit.bind( this );

            inputs.forEach( function ( input ) {
                input.on( '*', this._onEmit_ );
            }.bind( this ) );

        },

        destroy : function ( ) {

            this._inputs.forEach( function ( input ) {
                input.destroy( );
            } );

        },

        _onEmit : function ( type, e ) {

            this.emit( type, e );

        }

    } );

} )( window.Virtjs || require( 'virtjs' ) );
