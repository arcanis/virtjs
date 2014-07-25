var PassThrough = require( 'stream' ).PassThrough;

var newLineRegex     = /\n+/g;
var commentRegex     = /^ *(#|$)/;
var spacesRegex      = / +/g;
var expectationRegex = /^\$([0-9A-Fa-f]+) 0x([0-9A-Fa-f]+) (.*)$/;
var registerRegex    = /^([a-z]+):([0-9A-Fa-f]+)->([0-9A-Fa-f]+)$/;

function parseExpectation( expectation ) {

    var [ , address, opcode, registerLine ] = expectation.match( expectationRegex );

    var registerList = registerLine.trim( ).split( spacesRegex );
    var registers = [ ];

    for ( var t = 0, T = registerList.length; t < T; ++ t ) {
        var [ , name, before, after ] = registerList[ t ].match( registerRegex );
        registers.push( [ name, parseInt( before, 16 ), parseInt( after, 16 ) ] );
    }

    return {
        address : parseInt( address, 16 ),
        opcode : parseInt( opcode, 16 ),
        registers : registers
    };

}

export class ExpectationReader {

    constructor( ) {

        this._temp = '';
        this._buffer = [ ];

        this.stream = new PassThrough( );

        this.stream.on( 'data', ( buffer ) => {

            var stringBuffer = this._temp + buffer.toString( );
            var endOfBuffer = stringBuffer.lastIndexOf( '\n' );

            this._temp = stringBuffer.substr( endOfBuffer + 1 );
            stringBuffer = stringBuffer.substr( 0, endOfBuffer );

            this._buffer = this._buffer.concat( stringBuffer.split( newLineRegex ) );

        } );

        this.stream.on( 'end', ( ) => {
            this._closed = true;
        } );

        this.promise = new Promise( resolve => {

            if ( this._closed ) {
                resolve( );
            } else this.stream.on( 'end', ( ) => {
                resolve( );
            } );

        } );

    }

    findNext( ) {

        var expectation;

        do { expectation = this._buffer.shift( ); }
        while ( expectation !== undefined && expectation.match( commentRegex ) );

        if ( ! expectation && this._closed )
            return false;

        return expectation;

    }

    readNext( ) {

        var expectation = this.findNext( );

        if ( ! expectation )
            return expectation;

        return parseExpectation( expectation );

    }

    then( ) {

        return this.promise.then.apply( this.promise, arguments );

    }

}
