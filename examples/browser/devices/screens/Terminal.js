define( [

], function ( ) {

    var Screen = function ( term ) {

        this._term = term;

        this._colorMap = {
            '000000' : '49',
            'ffffff' : '107'
        };

    };

    Screen.prototype.setSize = function ( width, height ) {

        this._term.resize( width * 2 + 1, height + 1 );

    };

    Screen.prototype.setPixel = function ( x, y, color ) {

        var colorKey = ( '000000' + color.toString( 16 ).toLowerCase( ) ).substr( - 6 );
        var actualColor = this._colorMap[ colorKey ];

        this._term.cursorPos( [ y + 1, x * 2 + 1 ] );
        this._term.write( '\x1b[' + actualColor + 'm  ' );

    };

    return Screen;

} );
