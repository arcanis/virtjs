import { createAccessor, createPlainOldData, createUnaddressable } from 'virtjs/utils/MemoryUtils';

// Frequencies used by the TIMA register
var frequencies = { 0 : 1024, 1 : 16, 2 : 64, 3 : 256 };

export class Timer {

    constructor( engine ) {

        this._engine = engine;

    }

    setup( ) {

        // Clock buffers
        //  - #0 : Divider buffer
        //  - #1 : Counter buffer
        this._buffers = [ 0, 0, 0 ];

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

    }

    step( time ) {

        this._buffers[ 0 ] += time * 4;

        var cycles = this._buffers[ 0 ] % 256;
        this._buffers[ 0 ] -= cycles * 256;
        this._clocks[ 0 ] += cycles;

        if ( ! this._enableTimer )
            return ;

        this._buffers[ 1 ] += time * 4;

        var frequency = frequencies[ this._counterLimits[ 1 ] ];
        var currentClock = this._clocks[ 1 ];

        var cycles = this._buffers[ 1 ] % frequency;
        this._buffers[ 1 ] -= cycles * frequency;
        this._clocks[ 1 ] += cycles;

        if ( this._clocks[ 1 ] < currentClock ) {
            this._clocks[ 1 ] += this._counterLimits[ 0 ];
            this._engine.environment.pendingInterrupts |= 0x04;
        }

    }

    oldStep( time ) {

        this._buffers[ 0 ] += time;

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
                    this._engine.environment.pendingInterrupts |= 0x04;
                }
            }

        }

    }

    timerMapping( address ) {

        if ( address === 0x00 )
            return createAccessor( this._dividerAccess, this );

        if ( address === 0x01 )
            return createPlainOldData( this._clocks, 1 );

        if ( address === 0x02 )
            return createPlainOldData( this._counterLimits, 0 );

        if ( address === 0x03 )
            return createAccessor( this._controlAccess, this );

        return createUnadressable( address, 16 );

    }

    _dividerAccess( value ) {

        if ( typeof value === 'undefined' ) {
            return this._clocks[ 0 ];
        } else {
            this._clocks[ 0 ] = 0;
        }

    }

    _controlAccess( value ) {

        if ( typeof value === 'undefined' ) {
            return this._packFlags( );
        } else {
            this._unpackFlags( value );
        }

    }

    _packFlags( ) {

        return (
            ( this._enableTimer ? 1 << 2 : 0 ) |
            ( this._counterLimits[ 1 ] )
        );

    }

    _unpackFlags( value ) {

        this._enableTimer = !! ( value & 4 );
        this._counterLimits[ 1 ] = value & 3;

    }

};
