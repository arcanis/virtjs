define( [

    './Format',
    './Function'

], function ( FormatUtil, FunctionUtil ) {

    return {

        unaddressable : function ( address, bits ) {

            return function ( value, user ) {
                throw new Error( 'Address ' + FormatUtil.address( user, bits ) + ' is unaddressable' );
            };

        },

        immutable : function ( value ) {

            return function ( ) {
                return value;
            };

        },

        accessor : function ( /* accessor, context, ... bindings */ ) {

            if ( ! arguments[ 0 ] )
                throw new Error( 'Undefined accessor cannot be bound' );

            return FunctionUtil.fastBind.apply( FunctionUtil, arguments );

        },

        plainOldData : function ( object, key ) {

            if ( ! object )
                throw new Error( 'Un undefined object cannot be mapped' );

            return [ object, key ];

        }

    };

} );
