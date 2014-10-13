export function* range( from, to ) {
    while ( from < to ) {
        yield from ++;
    }
}

export function nodeToUint8( ... buffers ) {

    var totalByteLength = buffers.reduce( ( sum, buffer ) => sum + buffer.length, 0 );
    var array = new Uint8Array( totalByteLength ), offset = 0;

    buffers.forEach( buffer => {
        for ( var t = 0, T = array.length; t < T; ++ t )
            array[ offset ++ ] = buffer[ t ]; } );

    return array;

}

export function binaryStringToUint8( ... strings ) {

    var totalByteLength = strings.reduce( ( sum, string ) => sum + string.length, 0 );
    var array = new Uint8Array( totalByteLength ), offset = 0;

    strings.forEach( string => {
        for ( var t = 0, T = string.length; t < T; ++ t )
            array[ offset ++ ] = string.charCodeAt( t ); } );

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

var base64DataUrl = /^data:[^;]*;base64,([a-zA-Z0-9+/]+={0,2})$/;

export function fetch( path ) {

    return new Promise( ( resolve, reject ) => {

        var isBlob = typeof Blob !== 'undefined' && path instanceof Blob;
        var isDataURI = path.match( base64DataUrl );
        var isBrowser = typeof window !== 'undefined';
        var isWeb = isBrowser || /^(https?:\/\/|blob:)/.test( path );

        if ( ! isWeb && path.indexOf( ':' ) !== -1 )
            throw new Error( 'Invalid protocol' );

        if ( isBlob ) {

            var fileReader = new FileReader( );

            fileReader.addEventListener( 'load', e => { resolve( e.target.result ); } );
            fileReader.addEventListener( 'error', e => { reject( ); } );

            fileReader.readAsArrayBuffer( path );

        } else if ( isDataURI ) {

            if ( isBrowser ) {
                resolve( binaryStringToUint8( atob( isDataURI[ 1 ] ) ).buffer );
            } else {
                resolve( nodeToUint8( new Buffer( isDataURI[ 1 ], 'base64' ) ).buffer );
            }

        } else if ( isBrowser ) {

            var xhr = new XMLHttpRequest( );

            xhr.open( 'GET', path, true );
            xhr.responseType = 'arraybuffer';

            xhr.onload = ( ) => resolve( xhr.response );
            xhr.onerror = ( ) => reject( xhr.status );

            xhr.send( null );

        } else if ( isWeb ) {

            var protocol = path.substr( 0, path.indexOf( ':' ) );
            var web = module.require( protocol /* http or https */ );

            var buffers = [ ];

            web.get( path, function ( res ) {

                res.on( 'data', chunk => {
                    buffers.push( chunk );
                } );

                res.on( 'error', err => {
                    reject( err.message );
                } );

                res.on( 'end', ( ) => {
                    resolve( nodeToUint8( ... buffers ).buffer );
                } );

            } );

        } else {

            var fs = module.require( 'fs' );

            fs.readFile( path, ( err, buffer ) => {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( nodeToUint8( buffer ).buffer );
                }

            } );

        }

    } );

}
