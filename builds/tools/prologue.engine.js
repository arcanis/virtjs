( function ( factory ) {

    var library = factory( );

    if ( typeof Virtjs !== 'undefined' )
        Virtjs.engine[ library.name ] = library;

    if ( typeof define === 'function' && define.amd ) {
        define( [ ], function ( ) {
            return library;
        } );
    }

} )( function ( ) {
