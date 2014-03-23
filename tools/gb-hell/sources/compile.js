/*global require, process, __dirname*/

var Fs   = require( 'fs' );
var Swig = require( 'swig' );

var range_8b = [ ];
for ( var t = 0; t < 0xFF; ++ t )
    range_8b.push( t );

Swig.setFilter( 'except', function ( source ) {
    var nope = Array.prototype.slice.call( arguments, 1 );
    return source.filter( function ( value ) {
        return nope.every( function ( possibility ) {
            return possibility.indexOf( value ) === - 1;
        } );
    } );
} );

var asmforTag = new ( require( './asmfor' ) )( );
Swig.setTag( 'asmfor', asmforTag.parse.bind( asmforTag ), asmforTag.compile.bind( asmforTag ), true, false );

var files = process.argv.slice( 2 );
var concatenation = files.map( function ( path ) { return Fs.readFileSync( __dirname + '/../' + path ); } ).join( '' );
var rendering = Swig.compile( concatenation )( {

    r8  : [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ],
    r16 : [ 'bc', 'de', 'hl' ],

    relevant8Bits  : [ 0x00,   0x0F,   0xF0,   0xFF,   0xAA,   0x55   ],
    relevant16Bits : [ 0x0000, 0x00FF, 0xFF00, 0xFFFF, 0xAAAA, 0x5555 ],

    addresses      : [ 0xC000, 0xC001, 0xC002, 0xC003, 0xC004, 0xC005 ]

} );

process.stdout.write( rendering );
