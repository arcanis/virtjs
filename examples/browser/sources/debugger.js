/*global Virtjs, require, $*/

require( [

    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/WebGL',
    'devices/timers/RAFrame',
    'devices/debug/Tracer'

], function ( ) {

    var GB = Virtjs.engine.GameBoy;

    var AZERTY = { 65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
                 , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    var start = function ( ) {

        // Instanciates a few input / output devices which will be used by the emulator
        var screen = new Virtjs.screen.WebGL( { className : 'screen' } );
        // screen.open( document.body );

        var keyboard = new Virtjs.input.Keyboard( AZERTY );
        keyboard.open( document.body );

        var timer = new Virtjs.timer.RAFrame( );

        // Using these optional dependencies allows to customizes the actual source code without degrading performances.
        Virtjs.DebugUtil.setEscodegen( window.escodegen );
        Virtjs.DebugUtil.setEsprima( window.esprima );

        // This done, we can ask Virt.js to create an emulator based on specified options
        var engine = window.engine = Virtjs.create( GB, {

            // Customize devices
            screen    : screen,
            timer    : timer,
            keyboard : keyboard,

            // Directly skips the bios
            skipBios : true,

            // Debug options

            /// Trigger at most one iteration per timer cycle
            maxSubIterations : 1,

            /// Select the events which should be triggered by the engine
            events : [ 'load', 'instruction' ]

        } );

        // We're in debugger.js, so let's create a debugger
        var instructionTable = $( document.getElementById( 'instructions' ) );
        var tracer = new Virtjs.debug.Tracer( engine, { element : instructionTable[ 0 ] } );

        // Finally, we start the engine. Its clock will be managed by the `Timer` instance.
        engine.start( xhr.response );

    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', '../assets/gb/tetris.gb', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
