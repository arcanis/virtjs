export function fetchBinary( url ) {

    return new Promise( function ( resolve, reject ) {

        var onload = function ( ) {
            if ( xhr.status === 200 ) {
                resolve( xhr.response );
            } else {
                reject( new Error( 'Server answered with ' + xhr.status ) );
            }
        };

        var onerror = function ( e ) {
            console.log( e );
            reject( new Error( ) );
        };

        var xhr = new XMLHttpRequest( );
        xhr.open( 'GET', url, true );
        xhr.responseType = 'arraybuffer';
        xhr.onload = onload;
        xhr.onerror = onerror;
        xhr.send( null );

    } );

};
