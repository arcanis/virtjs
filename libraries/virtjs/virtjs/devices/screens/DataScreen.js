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

    setPixel( x, y, color ) {

        var target = this.data;
        var index = ( y * this.inputWidth + x ) * 3;

        target[ index + 0 ] = ( color & 0xFF0000 ) >>> 16;
        target[ index + 1 ] = ( color & 0x00FF00 ) >>>  8;
        target[ index + 2 ] = ( color & 0x0000FF ) >>>  0;

    }

    flushScreen( ) {

    }

}
