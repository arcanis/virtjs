var base64DataUrl = /^data:[^;]*;base64,([a-zA-Z0-9+/]+={0,2})$/;

function nodeToUint8( ... buffers ) {

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

export function base64ToUint8( ... strings ) {

    var isBrowser = typeof window !== 'undefined';

    if ( isBrowser ) {
        return binaryStringToUint8( ... strings.map( string => atob( string ) ) );
    } else {
        return nodeToUint8( ... strings.map( string => new Buffer( string, 'base64' ) ) );
    }

}

export function fetchArrayBuffer( path ) {

    return new Promise( ( resolve, reject ) => {

        var isBlob = typeof Blob !== 'undefined' && path instanceof Blob;
        var isDataURI = typeof path === 'string' && path.match( base64DataUrl );
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

            resolve( base64ToUint8( isDataURI[ 1 ] ).buffer );

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
