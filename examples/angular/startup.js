/*global require, angular*/

require( [

    'virtjs',
    'virtjs-gb',

    './devices/data/LocalStorage',
    './devices/inputs/Button',
    './devices/inputs/Keyboard',
    './devices/screens/WebGL',
    './devices/timers/RAFrame'

], function ( Virtjs ) {

    window.Virtjs = Virtjs;

    angular.element( document ).ready( function ( ) {
        angular.bootstrap( document, [ 'application' ] );
    } );

} );
