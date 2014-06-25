System.paths[ 'jquery' ] = './vendors/JQuery-2.1.1.min.js';

System.map[ 'traceur' ] = './vendors/traceur';
System.map[ 'virtjs' ] = '../../libraries/virtjs/virtjs';
System.map[ 'virtjs-gb' ] = '../../libraries/virtjs-gb/virtjs-gb';

console.clear( );

window.addEventListener( 'DOMContentLoaded', function ( ) {
    System.import('application/main').then( function ( m ) {
        return m.default( );
    } ).catch( function ( e ) {
        setTimeout( function ( ) {
            throw e;
        } );
    } );
} );
