var loadRom = function ( url, callback ) {

    var xhr = new XMLHttpRequest( );

    if ( url.indexOf( ':' ) === - 1 )
        url = '../assets/gb/' + url;

    if ( url.indexOf( '@' ) !== - 1 ) {

        var authOffset = url.indexOf( '@' );
        var auth = url.substr( 0, authOffset ).match( /\/\/([a-zA-Z0-9]*)$/ )[ 1 ];

        url = url.substr( 0, authOffset - auth.length ) + url.substr( authOffset + 1 );

        console.log( url );

    }

    xhr.open( 'GET', url, true );

    xhr.responseType = 'arraybuffer';

    xhr.setRequestHeader( 'Authorization', 'Basic ' + auth );

    xhr.addEventListener( 'load', function ( ) {
        callback( xhr.response );
    } );

    xhr.send( null );

};
