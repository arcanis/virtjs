import { TestEnvironment as TestEnvironmentBase } from 'virtjs/core/tests/TestEnvironment';
import { CYCLES_PER_OAM }                         from 'virtjs-gbjit/GPU';

export class Environment extends TestEnvironmentBase {

    constructor( { romBuffer, expectations } = { } ) {

        super( { expectations } );

        this.pc = 0x0100;
        this.sp = 0xFFFE;

        this.a = 0x01;
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
        this.ramBuffer = new ArrayBuffer( 8192 );

        this.hramBuffer = new ArrayBuffer( 127 );
        this.wramBuffer = new ArrayBuffer( 8192 );
        this.vramBuffer = new ArrayBuffer( 8192 );
        this.oamBuffer = new ArrayBuffer( 175 );

        this.mbcMode = 0;
        this.mbcRamFeature = false;
        this.mbcRtc = [ 0, 0, 0, 0, 0 ];
        this.mbcRomBank = 1;
        this.mbcRamBank = 0;
        this.mbcRtcIndex = 0;

        this.cpuInterruptFeature = false;

        this.ioKeyColumn = 0x00;

        this.gpuLcdFeature = true;
        this.gpuBackgroundFeature = true;
        this.gpuSpriteFeature = false;
        this.gpuWindowFeature = false;
        this.gpuSpriteSize = 0;
        this.gpuTilesetBase = 1;
        this.gpuBackgroundBase = 0;
        this.gpuWindowBase = 0;
        this.gpuMode = 0x02;
        this.gpuLy = 0;
        this.gpuLyc = 0;
        this.gpuClock = CYCLES_PER_OAM;
        this.gpuBgScroll = [ 0, 0 ];
        this.gpuWinPosition = [ 0, 0 ];
        this.gpuCoincidence = false;
        this.gpuPalettes = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ];

    }

}
