export class NoMBC {

    constructor( ) {

    }

    link( { } ) {

    }

    setup( environment ) {

        this._rom = new Uint8Array( environment.romBuffer );
        this._ram = new Uint8Array( environment.ramBuffer );

    }

    readRomUint8( address ) {

        return this._rom[ address ] | 0;

    }

    readRamUint8( address ) {

        return this._ram[ address ] | 0;

    }

    writeRomUint8( address, value ) {

        return ;

    }

    writeRamUint8( address, value ) {

        this._ram[ address ] = value;

    }

}
