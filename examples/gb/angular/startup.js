/*global require, angular*/

require( [

    'virtjs',
    'virtjs-gb'

], function ( Virtjs, Gameboy ) {

    window.Virtjs = Virtjs;
    window.Virtjs.engine.GameBoy = Gameboy;

    angular.element( document ).ready( function ( ) {
        angular.bootstrap( document, [ 'application' ] );
    } );

} );
