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

    setPixel( x, y, r, g, b ) {

        var target = this.data;
        var index = ( y * this.inputWidth + x ) * 3;

        target[ index + 0 ] = r;
        target[ index + 1 ] = g;
        target[ index + 2 ] = b;

    }

    flushScreen( ) {

    }

}
