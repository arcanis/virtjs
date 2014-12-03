export var toSigned8 = ( function ( ) {

    var tmp = new Int8Array( 1 );

    return function ( n ) {

        tmp[ 0 ] = n;

        return tmp[ 0 ];

    };

} )( );
