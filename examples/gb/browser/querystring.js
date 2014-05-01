var Query = ( function ( ) {

    var query = document.location.search.substr( 1 );

    return query.split( '&' ).reduce( function ( map, parameter ) {

        var parts = parameter.split( '=' );

        var key = decodeURIComponent( parts[ 0 ] );
        var value = decodeURIComponent( parts[ 1 ] || 'true' );

        map[ key ] = value;

        return map;

    }, { } );

} )( );
