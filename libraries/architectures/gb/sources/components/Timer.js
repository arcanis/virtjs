/*global define, preprocess*/

define( [

    'virtjs'

], function ( Virtjs ) {

    var frequencies = { 0 : 1, 1 : 64, 2 : 16, 3 : 4 };

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

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

        step : function ( time ) {

            this._clocks[ 0 ] += time * 4;

            if ( ! this._enableTimer )
                return ;

            this._buffers[ 1 ] += time * 4 * 4;

            while ( this._buffers[ 1 ] >= this._counterLimits[ 1 ] ) {
                this._buffers[ 1 ] -= this._counterLimits[ 1 ];
                this._clocks[ 1 ] += 1;
                if ( this._clocks[ 1 ] === 0 ) {
                    this._clocks[ 1 ] = this._counterLimits[ 0 ];
                    this._engine.environment.pendingInterrupts |= 0x04;
                }
            }

        },

        timerMapping : function ( address ) {

            if ( address === 0x00 )
                return Virtjs.MemoryUtil.accessor( this._dividerAccess, this );

            if ( address === 0x01 )
                return Virtjs.MemoryUtil.plainOldData( this._clocks, this, 1 );

            if ( address === 0x02 )
                return Virtjs.MemoryUtil.plainOldData( this._counterLimits, this, 0 );

            if ( address === 0x03 )
                return Virtjs.MemoryUtil.accessor( this._controlAccess, this );

            return Virtjs.MemoryUtil.unadressable( address, 16 );

        },

        _dividerAccess : function ( value ) {

            if ( typeof value === 'undefined' ) {
                return this._clocks[ 0 ];
            } else {
                this._clocks[ 0 ] = 0;
            }

        },

        _controlAccess : function ( value ) {

            if ( typeof value === 'undefined' ) {

                return this._flags[ 0 ];

            } else {

                this._flags[ 0 ] = value;
                this._unpackFlags( value );

            }

        },

        _unpackFlags : function ( value ) {

            this._enableTimer = !! ( value & 4 );
            this._counterLimits[ 1 ] = frequencies[ value & 3 ];

        }

    } );

} );
