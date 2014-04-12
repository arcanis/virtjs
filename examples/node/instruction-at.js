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

// Create the engine, but don't start it

var buffer = Fs.readFileSync( process.argv[ 2 ] );
var arrayBuffer = new Uint8Array( buffer ).buffer;

engine.load( arrayBuffer, { autoResume : false } );

// Print the disassembled instruction

var parse = process.argv[ 3 ].match( /^\$([0-9a-fA-F]{4})(\+[0-9]+)?$/ );

if ( ! parse )
    throw new Error( 'Parse error' );

var offset = parseInt( parse[ 1 ], 16 );
var count = Math.max( 1, parseInt( parse[ 2 ], 10 ) || 1 );

for ( var t = 0; t < count; ++ t ) {

    var address = offset + t;

    console.log( [
        Virtjs.FormatUtil.address( address, 16 ),
        engine.disassembleAt( address ).label
    ].join( ' ' ) );

}
