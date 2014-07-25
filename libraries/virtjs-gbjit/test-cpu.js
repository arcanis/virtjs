import { ExpectationReader } from 'virtjs/core/tests/ExpectationReader';
import { TestResults }       from 'virtjs/core/tests/TestResults';
import { NullScreen }        from 'virtjs/devices/screens/NullScreen';
import { bufferToUint8 }     from 'virtjs/tools';

import { Engine }            from 'virtjs-gbjit/Engine';
import { TestEnvironment }   from 'virtjs-gbjit/TestEnvironment';

var createReadStream = require( 'fs' ).createReadStream;
var readFileSync = require( 'fs' ).readFileSync;

var engine = new Engine( { devices : {
        screen : new NullScreen( )
} } );

var expectations = new ExpectationReader( );
var environment = new TestEnvironment( {
    romBuffer : bufferToUint8( readFileSync( 'hell.gb' ) ).buffer,
    expectations : expectations
} );

engine.setup( environment );

var error = null;
expectations.stream.on( 'data', ( ) => {
    if ( error ) return ;
    try { engine.run( ); }
    catch ( e ) { error = e; }
} );

var stream = createReadStream( './expectations.txt' );
stream.pipe( expectations.stream );

expectations.then( function ( ) {

    var result = new TestResults( environment );
    console.log( result.toString( ) );

    var result = new TestResults( environment, 0xCB00 );
    console.log( result.toString( ) );

    if ( error ) {
        setTimeout( function ( ) {
            throw error;
        } );
    }

} );
