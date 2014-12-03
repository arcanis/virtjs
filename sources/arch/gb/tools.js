export function fixRomSize( romBuffer ) {

    if ( romBuffer.byteLength % 0x4000 === 0 )
        return romBuffer;

    var source = new Uint8Array( romBuffer );
    var destination = new Uint8Array( Math.ceil( romBuffer.byteLength / 0x4000 ) * 0x4000 );

    for ( var t = 0, T = romBuffer.byteLength; t < T; ++ t )
        destination[ t ] = source[ t ];

    return destination.buffer;

}
