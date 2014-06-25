import { createAccessor, createUnaddressable } from 'virtjs/utils/MemoryUtils';

export class IO {

    constructor( engine ) {

        this._engine = engine;

        // Key store (they are not in the environment because we don't want to serialize pressed keys)

        this._keys = { };

        // When a key is pressed, its associed bit is set to 0

        this._engine.devices.input.on( 'keydown', key => {

            if ( ! ( this._keys[ key & 0xF0 ] & ( key & 0x0F ) ) )
                return ;

            this._keys[ key & 0xF0 ] &= key ^ 0x0F;

            if ( key & this._engine.environment.ioKeyColumn ) {
                this._engine.environment.pendingInterrupts[ 1 ] |= 0x10;
            }

        } );

        // When a key is released, its associed bit is set to 1

        this._engine.devices.input.on( 'keyup', key => {

            this._keys[ key & 0xF0 ] |= key & 0x0F;

        } );

    }

    setup( ) {

        // By default, all keys are released

        this._keys[ 0x10 ] = 0x0F;
        this._keys[ 0x20 ] = 0x0F;

    }

    keyMapping( address ) {

        if ( address === 0x00 )
            return createAccessor( this._keyAccess, this );

        return createUnadressable( 16 );

    }

    _keyAccess( value ) {

        if ( typeof value === 'undefined' ) {

            var keyline = this._engine.environment.ioKeyColumn | 0x0F;

            if ( this._engine.environment.ioKeyColumn & 0x10 )
                keyline &= this._keys[ 0x10 ];

            if ( this._engine.environment.ioKeyColumn & 0x20 )
                keyline &= this._keys[ 0x20 ];

            return keyline;

        } else {

            this._engine.environment.ioKeyColumn = value & 0x30;

        }

    }

};
