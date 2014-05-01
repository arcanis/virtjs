/*global Virtjs, Query, require, loadRom*/

require( [

    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/WebGL',
    'devices/timers/RAFrame'

], function ( GB ) {

    var QWAZERTY = { 81 : GB.A,    87 : GB.B
                   , 65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
                   , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    // Emulator external devices

    var fpsMeter = new window.FPSMeter( );

    var screen = new Virtjs.screen.WebGL( );
    screen.canvas.className = 'screen';
    document.body.appendChild( screen.canvas );

    var input = new Virtjs.input.Keyboard( { map : QWAZERTY } );

    var timer = new Virtjs.timer.RAFrame( { fpsMeter : fpsMeter } );

    // A few plugs

    var resize = function ( ) {
        screen.setOutputSize( window.innerWidth, window.innerHeight ); };

    window.addEventListener( 'resize', resize );
    resize( );

    // Emulator engine

    var engine = window.engine = Virtjs.create( GB, {

        devices : {
            screen : screen,
            timer  : timer,
            input  : input
        },

        skipBios : true

    } );

    // ROM loader

    loadRom( Query.rom || '2048-sanqui.gb', function ( response ) {
        engine.load( response );
    } );

} );
