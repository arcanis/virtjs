export class DataScreen {

    constructor( ) {

        this.data = null;

        this.inputWidth = 0;
        this.inputHeight = 0;

    }

    setInputSize( width, height ) {

        this.inputWidth = width;
        this.inputHeight = height;

        this.data = new Uint8Array( this.inputWidth * this.inputHeight * 3 );

    }

    setData( data ) {

        if ( data.length !== this.inputWidth * this.inputHeight * 3 )
            throw new Error( 'Invalid data buffer' );

        this.data.set( data );

    }

    setPixel( x, y, color ) {

        var target = this.data;
        var index = ( y * this.inputWidth + x ) * 3;

        target[ index + 0 ] = ( color & 0xFF0000 ) >>> 16;
        target[ index + 1 ] = ( color & 0x00FF00 ) >>>  8;
        target[ index + 2 ] = ( color & 0x0000FF ) >>>  0;

    }

    flushScreen( ) {

    }

    toDataUrl( mimeType = 'image/png' ) {

        var canvas = document.createElement( 'canvas' );
        var context = canvas.getContext( '2d' );

        canvas.width = this.inputWidth;
        canvas.height = this.inputHeight;

        var data = this.data;
        var pixels = context.createImageData( canvas.width, canvas.height );

        for ( var t = 0, T = canvas.width * canvas.height; t < T; ++ t ) {
            pixels.data[ t * 4 + 0 ] = data[ t * 3 + 0 ];
            pixels.data[ t * 4 + 1 ] = data[ t * 3 + 1 ];
            pixels.data[ t * 4 + 2 ] = data[ t * 3 + 2 ];
            pixels.data[ t * 4 + 3 ] = 255;
        }

        context.putImageData( pixels, 0, 0 );
        return canvas.toDataURL( mimeType );

    }

}
