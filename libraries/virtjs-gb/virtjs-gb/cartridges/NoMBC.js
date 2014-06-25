import { createAccessor, createPlainOldData } from 'virtjs/utils/MemoryUtils';

export class NoMBC {

    constructor( engine ) {

        this._engine = engine;

    }

    setup( ) {

        this._engine.environment.nombcRomBank = new Uint8Array( 32768 );
        this._engine.environment.nombcRamBank = new Uint8Array( 8192 );

        var rom = this._engine.environment.rom;
        for ( var t = 0, T = rom.length; t < T; ++ t ) {
            this._engine.environment.nombcRomBank[ t ] = rom[ t ];
        }

    }

    romMapping( address ) {

        return createAccessor( this._romAccess, this, address );

    }

    ramMapping( address ) {

        return createPlainOldData( this._engine.environment.nombcRamBank, address );

    }

    _romAccess( address, value ) {

        if ( typeof value === 'undefined' ) {
            return this._engine.environment.nombcRomBank[ address ];
        } else {
            return void 0;
        }

    }

};
