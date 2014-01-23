require( [

    'virt.js/Virt',
    'virt.js/Chip8',

    'devices/Screen',
    'devices/Timer',
    'devices/Keyboard'

], function ( Virt, Chip8, Screen, Timer, Keyboard ) {

    var term = new Terminal( { cols : 80, rows : 40 } );
    term.open( document.body );

    var screen = new Screen( term );
    var keyboard = new Keyboard( term );
    var timer = new Timer( );

    var start = function ( ) {
        Virt.create( Chip8, {
            screen : screen,
            timer : timer,
            keyboard : keyboard
        } )( xhr.response );
    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', 'assets/chip8/guess.ch8', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
