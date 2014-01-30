require( [

    'virt.js/Virt',
    'virt.js/Chip8',
    'virt.js/GB',

    'devices/inputs/Keyboard',
    'devices/screens/CanvasScanline',
    'devices/timers/Timeout'

], function ( Virt, Chip8, GB, Keyboard, Screen, Timer ) {

    var screen = new Screen( { className : 'screen' } );
    screen.open( document.body );

    var keyboard = new Keyboard( );
    keyboard.open( document.body );

    var timer = new Timer( );

    var start = function ( ) {

        var engine = window.engine = Virt.create( GB, {
            screen : screen,
            timer : timer,
            keyboard : keyboard,
            skipBios : true
        } );

        engine.start( xhr.response );

    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', '../assets/gb/ttt.gb', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
