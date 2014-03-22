/*global define, preprocess*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // Key store
            this._keys = { };
            this._keys[ 0x00 ] = null;
            this._keys[ 0x10 ] = null;
            this._keys[ 0x20 ] = null;
            this._keys[ 0x30 ] = null;

            // When a key is pressed, its associed bit is set to 0
            this._engine._options.keyboard.on( 'keydown', function ( key ) {

                if ( ! ( this._keys[ key & 0xF0 ] & ( key & 0x0F ) ) )
                    return ;

                this._keys[ key & 0xF0 ] &= key ^ 0x0F;

                if ( key & this._column ) {
                    this._engine._cpu._interruptions[ 1 ] |= 0x10;
                }

            }.bind( this ) );

            // When a key is released, its associed bit is set to 1
            this._engine._options.keyboard.on( 'keyup', function ( key ) {

                this._keys[ key & 0xF0 ] |= key & 0x0F;

            }.bind( this ) );

            // Bind mappers in order to keep the context when passing them around
            this._keyMapper_ = this._keyMapper.bind( this );

        },

        setup : function ( ) {

            this._column = 0x00;

            this._keys[ 0x10 ] = 0x0F;
            this._keys[ 0x20 ] = 0x0F;

        },

        keyMapping : function ( address ) {

            if ( address === 0x00 )
                return [ this._keyMapper_, address ];

            return [ Virtjs.MemoryUtil.unadressable( 16 ), address ];

        },

        _keyMapper : function ( address, value ) {

            if ( typeof value === 'undefined' ) {

                var keyline = this._column | 0x0F;

                if ( this._column & 0x10 )
                    keyline &= this._keys[ 0x10 ];

                if ( this._column & 0x20 )
                    keyline &= this._keys[ 0x20 ];

                return keyline;

            }

            this._column = value & 0x30;

            return undefined;

        }

    } );

} );
