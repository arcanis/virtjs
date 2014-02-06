define( [

    './Format'

], function ( FormatUtil ) {

    var unadressableHandlers = { };

    return {

        unaddressable : function ( bits ) {

            if ( typeof unadressableHandlers[ bits ] === 'undefined' ) {
                unadressableHandlers[ bits ] = function ( address, value, user ) {
                    throw new Error( 'Address ' + FormatUtil.address( user, bits ) + ' is unaddressable' );
                };
            }

            return unadressableHandlers[ bits ];

        }

    };

} );
