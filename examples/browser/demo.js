require( [

    'base',
    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/CanvasScanline',
    'devices/timers/Timeout'

], function ( Virt, GB, Keyboard, Screen, Timer ) {

    var AZERTY = { 65 : GB.A, 90 : GB.B, 13 : GB.START, 32 : GB.SELECT
                 , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    var start = function ( ) {

        var screen = new Screen( { className : 'screen' } );
        screen.open( document.body );

        var keyboard = new Keyboard( AZERTY );
        keyboard.open( document.body );

        var timer = new Timer( );

        var engine = window.engine = Virt.create( GB, {
            screen : screen,
            timer : timer,
            keyboard : keyboard,
            skipBios : true
        } );

        engine.start( xhr.response );

    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', '../assets/gb/opus5.gb', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
