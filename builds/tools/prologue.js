( function ( factory ) {

    var library = factory( );

    if ( typeof define === 'function' && define.amd ) {
        define( [ ], function ( ) {
            return library;
        } );
    }

} )( function ( ) {
