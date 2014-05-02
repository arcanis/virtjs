/*global require, angular*/

require( [

    'virtjs',
    'virtjs-gb'

], function ( Virtjs ) {

    window.Virtjs = Virtjs;

    angular.element( document ).ready( function ( ) {
        angular.bootstrap( document, [ 'application' ] );
    } );

} );
