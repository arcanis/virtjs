require( [

    'Escodegen',
    'Esprima',

    'base',
    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/CanvasScanline',
    'devices/timers/Timeout'

], function ( Escodegen, Esprima, Virt, GB, Keyboard, Screen, Timer ) {

    var AZERTY = { 65 : GB.A, 90 : GB.B, 13 : GB.START, 32 : GB.SELECT
                 , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    var start = function ( ) {

        // Instanciates a few input / output devices which will be used by the emulator
        var screen = new Screen( { className : 'screen' } );
        screen.open( document.body );

        var keyboard = new Keyboard( AZERTY );
        keyboard.open( document.body );

        var timer = new Timer( );

        // Using these optional dependencies allows to customizes the actual source code without degrading performances.
        Virt.DebugUtil.setEscodegen( window.escodegen );
        Virt.DebugUtil.setEsprima( Esprima );

        // This done, we can ask Virt.js to create an emulator based on specified options
        var engine = window.engine = Virt.create( GB, {
            screen : screen,
            timer : timer,
            keyboard : keyboard,
            skipBios : true
        } );

        // Finally, we start the engine. Its clock will be managed by the `Timer` instance.
        engine.start( xhr.response );

    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', '../assets/gb/tetris.gb', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
