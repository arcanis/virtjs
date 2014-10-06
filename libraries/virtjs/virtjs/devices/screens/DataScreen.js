export class DataScreen {

    constructor( ) {

        this._inputWidth = 0;
        this._inputHeight = 0;

        this._data = null;

    }

    setInputSize( width, height ) {

        this._inputWidth = width;
        this._inputHeight = height;

        this._data = new Uint8Array( this._inputWidth * this._inputHeight * 3 );

    }

    setPixel( x, y, r, g, b ) {

        var target = this._data;
        var index = ( y * this._inputWidth + x ) * 3;

        target[ index + 0 ] = r;
        target[ index + 1 ] = g;
        target[ index + 2 ] = b;

    }

    flushScreen( ) {

    }

}
