export function* range( from, to ) {
    while ( from < to ) {
        yield from ++;
    }
}

export function bufferToUint8( buffer ) {

    var array = new Uint8Array( buffer.length );

    for ( var t = 0, T = array.length; t < T; ++ t )
        array[ t ] = buffer[ t ];

    return array;

}

export var toSigned8 = ( function ( ) {

    var tmp = new Int8Array( 1 );

    return n => {
        tmp[ 0 ] = n;
        return tmp[ 0 ];
    };

} )( );

export function hashString( str ) {

    if ( ! str.length )
        return 0;

    var hash = 0;

    for ( var t = 0, T = str.length; t < T; ++ t ) {
        hash = ( ( hash << 5 ) - hash ) + str.charCodeAt( 0 );
        hash = hash | 0;
    }

    return hash >>> 0;

}
