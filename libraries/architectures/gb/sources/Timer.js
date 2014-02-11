define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // Bind mappers in order to keep the context when passing them around
            this._dividerMapper_ = this._dividerMapper.bind( this );
            this._controlMapper_ = this._controlMapper.bind( this );

        },

        setup : function ( ) {

            // Clock buffers
            //  - #0 : Base clock buffer
            //  - #1 : Divider buffer
            //  - #3 : Counter buffer
            this._buffers = new Uint8Array( 4 );

            // Timers
            //  - #0 : Divider clock
            //  - #1 : Counter clock
            this._clocks = new Uint8Array( 4 );

            // Counter limit values
            //  - #0 : Reset value
            //  - #1 : Treshold
            this._counterLimits = new Uint8Array( 2 );

            // Configuration flags
            this._flags = new Uint8Array( 1 );

        },

        step : function ( ) {

            this._buffers[ 0 ] += this._engine._cpu._m[ 0 ];

            if ( this._buffers[ 0 ] >= 4 ) {

                this._buffers[ 0 ] -= 4;

                this._buffers[ 1 ] += 1;

                if ( this._buffers[ 1 ] === 16 ) {
                    this._clocks[ 0 ] += 1;
                    this._buffers[ 1 ] = 0;
                }

                if ( this._enableTimer )
                    this._buffers[ 2 ] += 1;

                if ( this._buffers[ 2 ] === this._counterLimits[ 1 ] ) {
                    this._clocks[ 1 ] += 1;
                    this._buffers[ 2 ] = 0;
                    if ( this._clocks[ 1 ] === 0 ) {
                        this._clocks[ 1 ] = this._counterLimits[ 0 ];
                        this._engine._cpu._interruptions[ 1 ] |= 0x04;
                    }
                }

            }

        },

        timerMapping : function ( address ) {

            if ( address === 0x00 )
                return [ this._dividerMapper_, address ];

            if ( address === 0x01 )
                return [ this._clocks, 1 ];

            if ( address === 0x02 )
                return [ this._counterLimits, 0 ];

            if ( address === 0x03 )
                return [ this._controlMapper_, address ];

            return [ Virtjs.MemoryUtil.unadressable( 16 ), address ];

        },

        _dividerMapper : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._clocks[ 0 ];

            this._clocks[ 0 ] = 0;

            return undefined;

        },

        _controlMapper : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return this._flags[ 0 ];

            this._flags[ 0 ] = value;
            this._unpackFlags( value );

            return undefined;

        },

        _unpackFlags : function ( value ) {

            this._enableTimer = !! ( value & 4 );
            this._counterLimits[ 1 ] = ( { 0 : 64, 1 : 1, 2 : 4, 3 : 16 } )[ value & 3 ];

        }

    } );

} );
