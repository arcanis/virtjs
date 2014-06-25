import { ImmediateTimer } from 'virtjs/devices/timers/ImmediateTimer';
import { NullInput }      from 'virtjs/devices/inputs/NullInput';
import { NullScreen }     from 'virtjs/devices/screens/NullScreen';
import { Engine }         from 'virtjs-gb';

function toArrayBuffer( buffer ) {

    var ab = new ArrayBuffer( buffer.length );
    var view = new Uint8Array( ab );

    for ( var t = 0; t < buffer.length; ++ t )
        view[ t ] = buffer[ t ];

    return ab;

}

export default ( function ( require ) {

    var Fs = require( 'fs' );

    var engine = new Engine( { devices : {
        timer : new ImmediateTimer( ),
        input : new NullInput( ),
        screen : new NullScreen( )
    } } );

    var rom = Fs.readFileSync( 'flappy.gb' );
    engine.load( toArrayBuffer( rom ) );

} );
