var System = require( 'systemjs' );

System.map[ 'traceur' ] = '../widgets/vendors/traceur';
System.map[ 'virtjs' ] = '../../libraries/virtjs/virtjs';
System.map[ 'virtjs-gb' ] = '../../libraries/virtjs-gb/virtjs-gb';

System.import( 'exec' ).then( function ( m ) {
    m.default( require );
} ).catch( function ( e ) {
    setTimeout( function ( ) {
        throw e;
    } );
} );
