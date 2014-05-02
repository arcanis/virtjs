/*global define*/

define( [

    '../../utils/Class',

    '../../mixins/Emitter'

], function ( ClassUtil, EmitterMixin ) {

    return ClassUtil.extend( [

        EmitterMixin

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

} );
