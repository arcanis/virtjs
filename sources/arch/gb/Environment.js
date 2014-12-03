import { memset }         from '../../utils/MemoryUtils';
import { clone }          from '../../utils/ObjectUtils';

import { CYCLES_PER_OAM } from './components/GPU';

export class Environment {

    constructor( { romBuffer, initialState } = { } ) {

        this.pc = 0x0100;
        this.sp = 0xFFFE;

        this.a = 0x11;
        this.f = 0xB0;

        this.b = 0x00;
        this.c = 0x13;

        this.d = 0x00;
        this.e = 0xD8;

        this.h = 0x01;
        this.l = 0x4D;

        this.pendingInterrupts = 0;
        this.enabledInterrupts = 0;

        this.romBuffer = romBuffer;
        this.ramBuffer = new ArrayBuffer( 8192 * 16 );

        this.hramBuffer = new ArrayBuffer( 127 );
        this.wramBuffer = memset( new ArrayBuffer( 4096 * 8 ), 0xFF, 0, 4096 * 8 );
        this.vramBuffer = new ArrayBuffer( 8192 * 2 );
        this.oamBuffer = new ArrayBuffer( 175 );

        this.cgbUnlocked = new Uint8Array( this.romBuffer )[ 0x0143 ] & 0x80;
        this.cgbCurrentSpeed = 0;
        this.cgbPrepareSpeedSwitch = 0;
        this.cgbVramBank = 0;
        this.cgbVramDmaSource = 0x0000;
        this.cgbVramDmaDestination = 0x0000;
        this.cgbVramDmaLength = 0;
        this.cgbVramDmaStatus = 1;
        this.cgbBackgroundCgbPalettes = new Uint8Array( 8 * 4 * 2 );
        this.cgbBackgroundRgbPalettes = [ [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ] ];
        this.cgbBackgroundPaletteOffset = 0;
        this.cgbBackgroundPaletteIncrement = false;
        this.cgbSpriteCgbPalettes = new Uint8Array( 8 * 4 * 2 );
        this.cgbSpriteRgbPalettes = [ [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ], [ 0x000000, 0x000000, 0x000000, 0x000000 ] ];
        this.cgbSpritePaletteOffset = 0;
        this.cgbSpritePaletteIncrement = false;

        this.mmuWramBank = 1;

        this.mbcMode = 0;
        this.mbcRamFeature = false;
        this.mbcRtc = [ 0, 0, 0, 0, 0 ];
        this.mbcRomBank = 1;
        this.mbcRamBank = 0;
        this.mbcRtcIndex = 0;

        this.cpuInterruptFeature = false;
        this.cpuStop = false;
        this.cpuHalt = false;

        this.ioKeyColumn = 0x00;

        this.gpuLcdFeature = true;
        this.gpuBackgroundFeature = true;
        this.gpuSpriteFeature = false;
        this.gpuWindowFeature = false;
        this.gpuSpriteSize = 0;
        this.gpuTilesetBase = 1;
        this.gpuBackgroundBase = 0;
        this.gpuWindowBase = 0;
        this.gpuInterrupts = 0;
        this.gpuMode = 0x02;
        this.gpuClock = CYCLES_PER_OAM;
        this.gpuLy = 0;
        this.gpuLyc = 0;
        this.gpuBgScroll = [ 0, 0 ];
        this.gpuWindowPosition = [ 0, 0 ];
        this.gpuCoincidence = false;
        this.gpuPalettes = [ 0x00, 0x00, 0x00 ];

        this.timerDivider = 0;
        this.timerDividerBuffer = 0;
        this.timerCounter = 0;
        this.timerCounterBuffer = 0;
        this.timerCounterFrequency = 0;
        this.timerCounterFeature = false;
        this.timerCounterModulo = 0;
        this.timerCounterControl = 0;

        var merge = ( high, low ) => ( { get : ( ) => ( this[ high ] << 8 ) | ( this[ low ] ) } );

        Object.defineProperty( this, 'af', merge( 'a', 'f' ) );
        Object.defineProperty( this, 'bc', merge( 'b', 'c' ) );
        Object.defineProperty( this, 'de', merge( 'd', 'e' ) );
        Object.defineProperty( this, 'hl', merge( 'h', 'l' ) );

        if ( initialState != null ) {
            this.loadState( initialState );
        }

    }

    saveState( ) {

        var dataStore = { };

        var ignoredProperties = [ 'romBuffer' ];

        for ( var key of Object.keys( this ) )
            if ( ignoredProperties.indexOf( key ) === -1 )
                dataStore[ key ] = this[ key ];

        return dataStore;

    }

    loadState( state ) {

        for ( var key of Object.keys( state ) ) {
            this[ key ] = clone( state[ key ] );
        }

    }

}
