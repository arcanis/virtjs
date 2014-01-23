define( function ( ) {

    var Keyboard = function ( term ) {

        term.on( 'data', function ( data ) {

            if ( ! this._onCharacterCallback )
                return ;

            this._onCharacterCallback( data );

        }.bind( this ) );

    };

    Keyboard.prototype.setCharacterCallback = function ( cb ) {

        this._onCharacterCallback = cb;

    };

    return Keyboard;

} );
