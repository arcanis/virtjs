/*global require, module*/

require( {

    paths : {
        'Esprima' : 'vendors/Esprima-140212',
        'Escodegen' : 'vendors/Escodegen-1.2.0.min'
    },

    map : {
        '*' : {
            'base' : '../../libraries/base/index',
            'architectures' : '../../libraries/architectures/'
        }
    },

    shim : {

        'Escodegen' : {
            exports : 'escodegen' },

        'sources/debugger' : {
            deps : [ 'base' ] },

        'architectures/gb/index' : {
            deps : [ 'base' ] },

        'devices/inputs/Keyboard' : {
            exports : 'Virtjs.input.Keyboard' },

        'devices/screens/WebGL' : {
            exports : 'Virtjs.screen.WebGL' },

        'devices/timers/Timeout' : {
            exports : 'Virtjs.timer.RAFrame' },

        'devices/debug/Tracer' : {
            exports : 'Virtjs.debug.Tracer' }

    }

}, [ 'base', 'require' ], function ( Virtjs, require ) {

    window.Virtjs = Virtjs;

    require( [ module ] );

} );
