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
            events : [ 'load', 'status', 'instruction' ]

        } );

        // We're in debugger.js, so let's create a debugger

        var instructionTbody = document.querySelector( '#instructions tbody' );
        var tracer = new Virtjs.debug.Tracer( engine, { element : instructionTbody } );

        // We want to keep track of where we are

        var engineStatus = document.querySelector( '#engine-status' );
        var programCounter = document.querySelector( '#program-counter' );
        var instructionCount = document.querySelector( '#instruction-count' );

        engine.on( 'status', function ( e ) {
            engineStatus.innerText = e.status;
        } );

        engine._cpu.on( 'instruction', function ( e ) {
            programCounter.innerText = Virtjs.FormatUtil.address( e.address, 16 );
            instructionCount.innerText = e.count;
        } );

        // Some controls, maybe ?

        var oneControl = document.querySelector( '#control-one' );
        var resumeControl = document.querySelector( '#control-resume' );
        var pauseControl = document.querySelector( '#control-pause' );

        oneControl.addEventListener( 'click', function ( ) {
            engine.one( ); } );
        resumeControl.addEventListener( 'click', function ( ) {
            engine.resume( ); } );
        pauseControl.addEventListener( 'click', function ( ) {
            engine.pause( ); } );

        // Shortcuts, ofc

        document.addEventListener( 'keydown', function ( e ) {

            if ( e.keyCode !== 122 )
                return ;

            e.preventDefault( );

            oneControl.click( );

        } );

        document.addEventListener( 'keydown', function ( e ) {

            if ( e.keyCode !== 119 )
                return ;

            e.preventDefault( );

            if ( engine._status === 'running' ) {
                pauseControl.click( );
            } else {
                resumeControl.click( );
            }

        } );

        // Btw, it's always nice to know if your shortcuts will works

        var toolbar = document.querySelector( '#toolbar' );

        window.addEventListener( 'focus', function ( ) {
            toolbar.className += ' ready '; } );
        window.addEventListener( 'blur', function ( ) {
            toolbar.className = toolbar.className.replace( /\bready\b/g, '' ); } );

        if ( document.hasFocus( ) )
            toolbar.className += ' ready ';

        // Finally, we start the engine. Its clock will be managed by the `Timer` instance.

        engine.start( xhr.response );

    };

    var xhr = new XMLHttpRequest( );
    xhr.open( 'GET', '../assets/gb/tetris.gb', true );
    xhr.onload = start;
    xhr.responseType = 'arraybuffer';
    xhr.send( null );

} );
