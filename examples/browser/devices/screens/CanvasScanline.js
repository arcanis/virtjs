define( [

], function ( ) {

    var CanvasScanline = function ( options ) {

        this._options = options || { };
        this._lines = [ ];

        this._canvas = document.createElement( 'canvas' );
        this._context = this._canvas.getContext( '2d' );

        if ( this._options.className ) {
            this._canvas.className = this._options.className;
        }

    };

    CanvasScanline.prototype.open = function ( element ) {

        element.appendChild( this._canvas );

    };

    CanvasScanline.prototype.setSize = function ( width, height ) {

        this._data = [ ];

        this._canvas.width = width;
        this._canvas.height = height;

        for ( var y = 0; y < height; ++ y ) {
            this._data[ y ] = this._context.getImageData( 0, y, width, 1 );
        }

    };

    CanvasScanline.prototype.setPixel = function ( x, y, color ) {

        var set = this._data[ y ].data;

        set[ x * 4 + 0 ] = color[ 0 ];
        set[ x * 4 + 1 ] = color[ 1 ];
        set[ x * 4 + 2 ] = color[ 2 ];
        set[ x * 4 + 3 ] = 255;

    };

    CanvasScanline.prototype.flushLine = function ( y ) {

        this._context.putImageData( this._data[ y ], 0, y );

    };

    CanvasScanline.prototype.flushScreen = function ( ) {

        for ( var y = 0; y < this._canvas.height; ++ y ) {
            this.flushLine( y );
        }

    };

    return CanvasScanline;

} );
