/*global Virtjs, Query, require, $, loadRom*/

require( [

    'architectures/gb/index',

    'devices/inputs/Keyboard',
    'devices/screens/WebGL',
    'devices/timers/RAFrame',
    'devices/debug/Tracer'

], function ( GB ) {

    var QWAZERTY = { 81 : GB.A,    87 : GB.B
                   , 65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
                   , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN };

    // Custom FPS counter theme (we want a correct box-sizing)

    window.FPSMeter.theme.custom = window.FPSMeter.extend( { }, window.FPSMeter.theme.dark, {
        container : { boxSizing : 'content-box', opacity : '.5' },
        count     : { boxSizing : 'content-box' },
        legend    : { boxSizing : 'content-box' }
    } );

    // Emulator external devices

    var fpsMeter = new window.FPSMeter( document.querySelector( '#display' ), {

        theme : 'custom',

        top : 'auto', bottom : '1px',
        left : '1px', right : 'auto'

    } );

    var screen = new Virtjs.screen.WebGL( { element : document.querySelector( '#display canvas' ) } );
    screen.canvas.className = 'screen';

    var input = new Virtjs.input.Keyboard( { map : QWAZERTY } );

    var timer = new Virtjs.timer.RAFrame( { fpsMeter : fpsMeter } );

    // Emulator engine

    var engine = window.engine = Virtjs.create( GB, {

        devices : {
            screen : screen,
            timer  : timer,
            input  : input
        },

        skipBios : true,

        // Trigger at most one iteration per timer cycle
        maxSubIterations : 1,

        // Select the events which should be triggered by the engine
        events : [ 'load', 'status', 'instruction', 'post-write' ]

    } );

    // ROM loader

    loadRom( Query.rom || '2048-sanqui.gb', function ( response ) {
        engine.load( response );
    } );

    // We're in debugger.js, so let's create a debugger

    var tracer = window.tracer = new Virtjs.debug.Tracer( engine, {

        container : document.querySelector( '#instructions' ),

        memorySize : 65536,
        opcodeSize : 8,
        addressSize : 16

    } );

    if ( Query.break_at ) {
        tracer.setBreakpoint( parseInt( Query.break_at ) );
        tracer.disableDOM( );
    }

    // A few plugs

    var resize = function ( ) {
        tracer.render( );
        screen.setOutputSize( window.innerWidth, window.innerHeight ); };

    window.addEventListener( 'resize', resize );
    resize( );

    // We want to keep track of where we are

    var currentStatus = '/', currentAddress = '/', currentCount = '/';

    var engineStatus = document.querySelector( '#engine-status' );
    var programCounter = document.querySelector( '#program-counter' );
    var instructionCount = document.querySelector( '#instruction-count' );

    var updateLocationDisplay = function ( ) {

        engineStatus.innerText = currentStatus;
        programCounter.innerText = currentAddress;
        instructionCount.innerText = currentCount;

    };

    var resetLocationDisplay = function ( ) {

        engineStatus.innerText = '/';
        programCounter.innerText = '/';
        instructionCount.innerText = '/';

    };

    engine.on( 'status', function ( e ) {

        currentStatus = e.status;

        if ( domEnabled ) {
            updateLocationDisplay( );
        }

    } );

    engine.cpu.on( 'instruction', function ( e ) {

        currentAddress = Virtjs.FormatUtil.address( e.address, 16 );
        ++ currentCount;

        if ( domEnabled ) {
            updateLocationDisplay( );
        }

    } );

    // But also know what are the current register values

    var registerA = document.querySelector( '#register-a' );
    var registerB = document.querySelector( '#register-b' );
    var registerC = document.querySelector( '#register-c' );
    var registerD = document.querySelector( '#register-d' );
    var registerE = document.querySelector( '#register-e' );
    var registerH = document.querySelector( '#register-h' );
    var registerL = document.querySelector( '#register-l' );
    var registerF = document.querySelector( '#register-f' );

    var updateRegisterDisplay = function ( ) {

        registerA.innerText = Virtjs.FormatUtil.binary( engine.environment.a[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.a[ 0 ], 8 ) + ')';
        registerB.innerText = Virtjs.FormatUtil.binary( engine.environment.b[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.b[ 0 ], 8 ) + ')';
        registerC.innerText = Virtjs.FormatUtil.binary( engine.environment.c[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.c[ 0 ], 8 ) + ')';
        registerD.innerText = Virtjs.FormatUtil.binary( engine.environment.d[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.d[ 0 ], 8 ) + ')';
        registerE.innerText = Virtjs.FormatUtil.binary( engine.environment.e[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.e[ 0 ], 8 ) + ')';
        registerH.innerText = Virtjs.FormatUtil.binary( engine.environment.h[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.h[ 0 ], 8 ) + ')';
        registerL.innerText = Virtjs.FormatUtil.binary( engine.environment.l[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.l[ 0 ], 8 ) + ')';
        registerF.innerText = Virtjs.FormatUtil.binary( engine.environment.f[ 0 ], 8 ) + ' (' + Virtjs.FormatUtil.hexadecimal( engine.environment.f[ 0 ], 8 ) + ')';

    };

    var resetRegisterDisplay = function ( ) {

        registerA.innerText = '/';
        registerB.innerText = '/';
        registerC.innerText = '/';
        registerD.innerText = '/';
        registerE.innerText = '/';
        registerH.innerText = '/';
        registerL.innerText = '/';
        registerF.innerText = '/';

    };

    engine.cpu.on( 'instruction', function ( e ) {

        if ( ! domEnabled )
            return ;

        updateRegisterDisplay( );

    } );

    // Some controls, maybe ?

    var breakAt, domEnabled = true;

    var oneControl = document.querySelector( '#control-one' );
    var resumeControl = document.querySelector( '#control-resume' );
    var pauseControl = document.querySelector( '#control-pause' );
    var watchControl = document.querySelector( '#control-watch' );

    oneControl.addEventListener( 'click', function ( ) {
        tracer.one( ); } );

    resumeControl.addEventListener( 'click', function ( ) {
        tracer.continue( ); } );

    pauseControl.addEventListener( 'click', function ( ) {
        tracer.pause( ); } );

    watchControl.addEventListener( 'click', function ( ) {

        if ( breakAt != null )
            return ;

        if ( watchControl.className.match( /\bactive\b/ ) ) {

            watchControl.className = watchControl.className.replace( /\bactive\b/g, '' );
            domEnabled = false;

            tracer.disableDOM( );
            resetLocationDisplay( );
            resetRegisterDisplay( );

            engine.setMaxSubIterations( Infinity );

        } else {

            watchControl.className += ' active ';
            domEnabled = true;

            tracer.enableDOM( );
            updateLocationDisplay( );
            updateRegisterDisplay( );

            engine.setMaxSubIterations( 1 );

        }

    } );

    instructionCount.addEventListener( 'click', function ( ) {

        var current = parseInt( instructionCount.innerText, 10 );

        if ( isNaN( current ) )
            return ;

        var request = parseInt( prompt( 'Continue until which instruction #?', current ), 10 );

        if ( isNaN( request ) )
            return ;

        if ( request <= current )
            return ;

        breakAt = request;

        tracer.disable( );

        engine.setMaxSubIterations( Infinity );

        engine.resume( );

    } );

    engine.cpu.on( 'instruction', function ( e ) {

        if ( currentCount !== breakAt )
            return ;

        breakAt = null;

        tracer.enable( );

        engine.setMaxSubIterations( 1 );

        e.break( );

    } );

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

} );
