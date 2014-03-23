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

Swig.setTag( 'asmfor', function ( string, line, parser, types, stack, options ) {

    var expectedStates = [ [ types.VAR, types.STRING ], types.COMMA, types.VAR ];
    var states         = [ ];

    var finalize = function ( ) {
        this.out.push( states[ 0 ] );
        this.out.push( states[ 2 ] );
        this.out.push( states[ 4 ] );
    };

    var monitor = function ( type ) {
        parser.on( type, function ( token ) {

            var expected = [ ].concat( expectedStates[ states.length ] ).indexOf( type ) !== - 1;
            if ( ! expected ) return true;

            if ( type === types.VAR ) {
                states.push( '_ctx.' + token.match );
            } else {
                states.push( token.match );
            }

            if ( states.length === expectedStates.length )
                finalize.call( this );

            return undefined;

        } );
    };

    monitor( types.VAR );
    monitor( types.STRING );
    monitor( types.COMMA );
    monitor( types.NUMBER );

    return true;

}, function ( compiler, args, content, parents, options, blockName ) {

    var target = args[ 0 ];
    var from = args[ 1 ];

    var block = compiler( content, parents, options, blockName );

    return [
        '( function ( ) { ' + from + '.map( function ( value ) {',
            '_output += _ctx.asmfor_init( ' + target + ', value );',
            block,
        '} ); } )( );'
    ].join( '' );

}, true, false );

var files = process.argv.slice( 2 );
var concatenation = files.map( function ( path ) { return Fs.readFileSync( __dirname + '/../' + path ); } ).join( '' );
var rendering = Swig.compile( concatenation )( {

    r8  : [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ],
    r16 : [ 'bc', 'de', 'hl' ],

    relevant8Bits  : [ 0x00,   0x0F,   0xF0,   0xFF,   0xAA,   0x55   ],
    relevant16Bits : [ 0x0000, 0x00FF, 0xFF00, 0xFFFF, 0xAAAA, 0x5555 ],

    addresses      : [ 0x0151, 0x0152, 0x0153, 0x0154, 0x0155, 0x0156 ]

} );

process.stdout.write( rendering );
