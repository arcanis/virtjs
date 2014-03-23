/*global Virtjs, Query, require*/

require( [

    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/WebGL',
    'devices/timers/RAFrame'

], function ( GB ) {

    var AZERTY = { 65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
                 , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    var engines = window.engines = [

        'blargg/01-special.gb',
        'blargg/02-interrupts.gb',
        'blargg/03-op-sp-hl.gb',
        'blargg/04-op-r-imm.gb',
        'blargg/05-op-rp.gb',
        'blargg/06-ld-r-r.gb',
        'blargg/07-jr-jp-call-ret-rst.gb',
        'blargg/08-misc.gb',
        'blargg/09-op-r-r.gb',
        'blargg/10-bitops.gb',
        'blargg/11-op-a-hlm.gb'

    ].map( function ( rom, index ) {

        // Instanciates a few input / output devices which will be used by the emulator

        var screen = new Virtjs.screen.WebGL( { className : 'screen' } );
        screen.open( document.body );

        var keyboard = new Virtjs.input.Keyboard( AZERTY );
        keyboard.open( document.body );

        var timer = new Virtjs.timer.RAFrame( );

        // This done, we can ask Virt.js to create an emulator based on specified options

        var engine = Virtjs.create( GB, {

            // Customize devices
            screen   : screen,
            timer    : timer,
            keyboard : keyboard,

            // Directly skips the bios
            skipBios : true

        } );

        var start = function ( ) {
            engine.start( xhr.response, false ); };

        var xhr = new XMLHttpRequest( );
        xhr.open( 'GET', '../assets/gb/' + rom, true );
        xhr.onload = start;
        xhr.responseType = 'arraybuffer';
        xhr.send( null );

        return engine;

    } );

} );
