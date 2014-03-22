/*global process, require*/

var Fs = require( 'fs' );

var Virtjs = require( 'virtjs' );
var GB = require( 'virtjs-gb' );

var Screen = require( './devices/screens/Sink' );
var Keyboard = require( './devices/inputs/Null' );
var Timer = require( './devices/timers/Ticker' );

// Instanciates a few input / output devices which will be used by the emulator

var screen = new Screen( );
var keyboard = new Keyboard( );
var timer = new Timer( );

// This done, we can ask Virt.js to create an emulator based on specified options

var engine = Virtjs.create( GB, {

    // Customize devices
    screen   : screen,
    timer    : timer,
    keyboard : keyboard,

    // Directly skips the bios
    skipBios : true,

    // Enable the logging events
    events : [ 'instruction' ]

} );

// Starts logging

engine._cpu.on( 'instruction', function ( e ) {
    if ( e.opcode === 0x76 ) process.exit( );
    console.log( [ '[dbg]',
        //Virtjs.FormatUtil.decimal( e.count, 10 ),
        Virtjs.FormatUtil.address( e.address, 16 ),
        Virtjs.FormatUtil.hexadecimal( e.opcode, 8 ),
        'af:' + Virtjs.FormatUtil.hexadecimal( engine._cpu._af[ 0 ], 16 ),
        'bc:' + Virtjs.FormatUtil.hexadecimal( engine._cpu._bc[ 0 ], 16 ),
        'de:' + Virtjs.FormatUtil.hexadecimal( engine._cpu._de[ 0 ], 16 ),
        'hl:' + Virtjs.FormatUtil.hexadecimal( engine._cpu._hl[ 0 ], 16 ),
        'sp:' + Virtjs.FormatUtil.hexadecimal( engine._cpu._sp[ 0 ], 16 )
    ].join( ' ' ) );
} );

// Finally, we start the engine. Its clock will be managed by the `Timer` instance.

var buffer = Fs.readFileSync( process.argv[ 2 ] );
var arrayBuffer = new Uint8Array( buffer ).buffer;

engine.start( arrayBuffer );
