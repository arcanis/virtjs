export var GET = ( function ( queryString ) {

    var GET = { };
    var decode = decodeURIComponent;

    queryString.split( /&/g ).forEach( parameter => {
        var [ key, value ] = parameter.split( '=' );
        if ( key ) GET[ decode( key ) ] = decode( value );
    } );

    return GET;

} )( document.location.search.substr( 1 ) );
