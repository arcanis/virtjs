/*global require, module*/

require.config( {

    paths : {
        'devices' : '../assets/devices/'
    },

    map : {
        '*' : {
            'virtjs' : '../../../libraries/base/index',
            'virtjs-gb' : '../../../libraries/architectures/gb/index'
        }
    },

    shim : {

        'Escodegen' : {
            exports : 'escodegen' },

        'sources/debugger' : {
            deps : [ 'virtjs' ] },

        'devices/data/LocalStorage' : {
            deps : [ 'virtjs' ] },

        'devices/inputs/Button' : {
            deps : [ 'virtjs' ] },

        'devices/inputs/Keyboard' : {
            deps : [ 'virtjs' ] },

        'devices/screens/WebGL' : {
            deps : [ 'virtjs' ] },

        'devices/timers/RAFrame' : {
            deps : [ 'virtjs' ] },

        'devices/debug/Tracer' : {
            deps : [ 'virtjs' ] }

    }

} );
