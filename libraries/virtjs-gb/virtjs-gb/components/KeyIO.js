export class KeyIO {

    constructor( { input } ) {

        this._keys = { 0x10 : 0, 0x20 : 0 };

        // Initialized at setup time

        this._environment = null;

        // When a key is pressed, its associed bit is set to 0

        input.on( 'keydown', key => {

            if ( ! ( this._keys[ key & 0xF0 ] & ( key & 0x0F ) ) )
                return ;

            this._keys[ key & 0xF0 ] &= key ^ 0x0F;

            if ( key & this._environment.ioKeyColumn ) {
                this._environment.pendingInterrupts[ 1 ] |= 0x10;
            }

        } );

        // When a key is released, its associed bit is set to 1

        input.on( 'keyup', key => {

            this._keys[ key & 0xF0 ] |= key & 0x0F;

        } );

    }

    setup( environment ) {

        this._environment = environment;

        this._keys[ 0x10 ] = 0x0F;
        this._keys[ 0x20 ] = 0x0F;

    }

    read( ) {

        var keyline = this._environment.ioKeyColumn | 0x0F;

        if ( this._environment.ioKeyColumn & 0x10 )
            keyline &= this._keys[ 0x10 ];

        if ( this._environment.ioKeyColumn & 0x20 )
            keyline &= this._keys[ 0x20 ];

        return keyline;

    }

}
