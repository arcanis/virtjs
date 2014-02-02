define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._keys = { };
            this._keys[ 0x00 ] = 0x0F;
            this._keys[ 0x10 ] = 0x0F;
            this._keys[ 0x20 ] = 0x0F;

            this._engine = engine;

            this._engine._options.keyboard.on( 'keydown', function ( key ) {
                this._keys[ key & 0xF0 ] &= key ^ 0x0F;
            }.bind( this ) );

            this._engine._options.keyboard.on( 'keyup', function ( key ) {
                this._keys[ key & 0xF0 ] |= key;
            }.bind( this ) );

        },

        keyMapping : function ( user, address ) {

            if ( address === 0x00 )
                return this._keyMapper.bind( this );

            throw new Error( 'Invalid memory address (' + Virtjs.FormatUtil.address( user, 16 ) + ')' );

        },

        _keyMapper : function ( value ) {

            if ( typeof value === 'undefined' )
                return this._keys[ this._column ];

            this._column = value & 0x30;

            return undefined;

        }

    } );

} );
