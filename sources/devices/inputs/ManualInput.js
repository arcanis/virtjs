export class ManualInput {

    constructor( ) {

        this._inputMap = null;

        this._devices = { };
        this._pending = { };

    }

    applyInputMap( inputMap ) {

        this._inputMap = inputMap;

        this._devices = { };
        this._pending = { };

    }

    down( port, inputCode ) {

        if ( this._inputMap )
            inputCode = this._inputMap[ inputCode ];

        this._pending[ port ] = this._pending[ port ] || { };
        this._pending[ port ][ inputCode ] = true;

    }

    up( port, inputCode ) {

        if ( this._inputMap )
            inputCode = this._inputMap[ inputCode ];

        this._pending[ port ] = this._pending[ port ] || { };
        this._pending[ port ][ inputCode ] = false;

    }

    pollInputs( ) {

        let pending = this._pending;
        this._pending = { };

        for ( let port of Object.keys( pending ) ) {
            for ( let inputCode of Object.keys( pending[ port ] ) ) {
                this._devices[ port ] = this._devices[ port ] || { };
                this._devices[ port ][ inputCode ] = pending[ port ][ inputCode ];
            }
        }

    }

    getState( port, inputCode ) {

        return Boolean( this._devices[ port ] && this._devices[ port ][ inputCode ] );

    }

}
