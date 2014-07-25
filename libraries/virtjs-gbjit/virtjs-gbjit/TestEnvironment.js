import { TestEnvironment as TestEnvironmentBase } from 'virtjs/core/tests/TestEnvironment';

export class TestEnvironment extends TestEnvironmentBase {

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

        this.romBuffer = romBuffer;
        this.ramBuffer = new ArrayBuffer( 0 );

        this.wramBuffer = new ArrayBuffer( 8192 );

        this.gpuOamBuffer = new ArrayBuffer( 175 );

    }

}
