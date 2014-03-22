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
    skipBios : true

} );

// Finally, we start the engine. Its clock will be managed by the `Timer` instance.

var buffer = Fs.readFileSync( process.argv[ 2 ] );
var arrayBuffer = new Uint8Array( buffer ).buffer;

engine.start( arrayBuffer );
