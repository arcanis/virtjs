/*global Virtjs, Query, require, loadRom*/

require( [

    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/WebGL',
    'devices/timers/RAFrame'

], function ( GB ) {

    var AZERTY = { 65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
                 , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    // Emulator external devices

    var fpsMeter = new window.FPSMeter( );

    var screen = new Virtjs.screen.WebGL( );
    screen.canvas.className = 'screen';
    document.body.appendChild( screen.canvas );

    var keyboard = new Virtjs.input.Keyboard( AZERTY );
    keyboard.listen( document.body );

    var timer = new Virtjs.timer.RAFrame( { fpsMeter : fpsMeter } );

    // A few plugs

    var resize = function ( ) {
        screen.setOutputSize( window.innerWidth, window.innerHeight ); };

    window.addEventListener( 'resize', resize );
    resize( );

    // Emulator engine

    var engine = window.engine = Virtjs.create( GB, {

        screen   : screen,
        timer    : timer,
        keyboard : keyboard,

        skipBios : true,

        events : [ 'instruction' ]

    } );

    engine.cpu.on( 'instruction', function (e) {
        if (e.address === 0xc2cc) console.log( 'step 1 ok' );
        if (e.address === 0xc2bf) console.log( engine.timer._clocks[1], engine.timer._counterLimits[1] );
        if (e.address === 0xc2c5) console.log( engine.timer._clocks[1], engine.timer._counterLimits[1] );
        if (e.address === 0xc2d3) console.log( 'step 2 ok' );
        if (!window.x) return ;
        window.x.push( '' );
    } );

    // ROM loader

    loadRom( Query.rom || '2048-sanqui.gb', function ( response ) {
        engine.load( response );
    } );

} );
