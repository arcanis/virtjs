var loadRom = function ( url, callback ) {

    var xhr = new XMLHttpRequest( );

    if ( url.indexOf( ':' ) === - 1 )
        url = '../assets/gb/' + url;

    if ( url.indexOf( '@' ) !== - 1 ) {

        var authOffset = url.indexOf( '@' );
        var base64Auth = url.substr( 0, authOffset ).match( /\/\/([a-zA-Z0-9]*)$/ )[ 1 ];
        var auth = window.atob( base64Auth );

        var usernameOffset = auth.indexOf( ':' );
        var username = auth.substr( 0, usernameOffset );
        var password = auth.substr( usernameOffset + 1 );

        url = url.substr( 0, authOffset - base64Auth.length ) + url.substr( authOffset + 1 );

        console.log( url );

    }

    xhr.open( 'GET', url, true, username, password );

    if ( username || password )
        xhr.withCredentials = true;

    xhr.responseType = 'arraybuffer';

    xhr.addEventListener( 'load', function ( ) {
        callback( xhr.response );
    } );

    xhr.send( null );

};
