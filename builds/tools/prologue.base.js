( function ( factory ) {

    var library = factory( );

    if ( typeof window !== 'undefined' )
        window.Virtjs = library;

    if ( typeof module !== 'undefined' )
        module.exports = library;

    if ( typeof define === 'function' && define.amd ) {
        define( [ ], function ( ) {
            return library;
        } );
    }

} )( function ( ) {
