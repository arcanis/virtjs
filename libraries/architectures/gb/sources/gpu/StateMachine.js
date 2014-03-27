define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( gpu ) {

            this._gpu = gpu;

        },

        setup : function ( ) {

            this._clock = 0;
            this._line = 0;

            this._mode = 0x02;
            this._state = this._oam;

        },

        step : function ( cycles ) {

            this._clock += cycles;

            this._state( );

        },

        _setMode : function ( mode ) {

            this._gpu._stat[ 0 ] = ( this._gpu._stat[ 0 ] & 0xFC ) | mode;
            this._mode = mode;

            switch ( mode ) {
                case 0x00 : this._state = this._hblank; break ;
                case 0x01 : this._state = this._vblank; break ;
                case 0x02 : this._state = this._oam;    break ;
                case 0x03 : this._state = this._vram;   break ;
            }

            // The 0x03 (VRAM) mode doesn't trigger interruptions
            if ( mode !== 0x03 && this._gpu._stat[ 0 ] & ( 1 << ( 3 + mode ) ) ) {
                this._gpu._engine._cpu._interruptions[ 1 ] |= 0x02;
            }

        },

        _hblank : function ( ) {

            if ( this._clock < 51 )
                return ;

            this._clock = 0;
            this._line += 1;

            if ( this._line < 144 ) {

                this._setMode( 0x02 );

            } else {

                this._gpu._vblank( );

                this._setMode( 0x01 );

            }

        },

        _vblank : function ( ) {

            if ( this._clock < 114 )
                return ;

            this._clock = 0;
            this._line += 1;

            if ( this._line < 154 )
                return ;

            this._line = 0;

            this._setMode( 0x02 );

        },

        _oam : function ( ) {

            if ( this._clock < 20 )
                return ;

            this._clock = 0;

            this._setMode( 0x03 );

        },

        _vram : function ( ) {

            if ( this._clock < 43 )
                return ;

            this._clock = 0;

            this._gpu._hblank( this._line );

            this._setMode( 0x00 );

        }

    } );

} );
