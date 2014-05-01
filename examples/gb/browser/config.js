/*global require, module*/

require( {

    paths : {
        'devices' : '../assets/devices/'
    },

    map : {
        '*' : {
            'virtjs' : '../../../libraries/base/index',
            'architectures' : '../../../libraries/architectures/'
        }
    },

    shim : {

        'Escodegen' : {
            exports : 'escodegen' },

        'sources/debugger' : {
            deps : [ 'virtjs' ] },

        'architectures/gb/index' : {
            deps : [ 'virtjs' ] },

        'devices/inputs/Keyboard' : {
            exports : 'Virtjs.input.Keyboard' },

        'devices/screens/WebGL' : {
            exports : 'Virtjs.screen.WebGL' },

        'devices/timers/Timeout' : {
            exports : 'Virtjs.timer.RAFrame' },

        'devices/debug/Tracer' : {
            exports : 'Virtjs.debug.Tracer' }

    }

}, [ 'virtjs', 'require' ], function ( Virtjs, require ) {

    window.Virtjs = Virtjs;

    require( [ module ] );

} );
