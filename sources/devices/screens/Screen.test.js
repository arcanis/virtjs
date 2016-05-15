import glContext       from 'gl';

import { NullScreen }  from 'virtjs/devices/screens/NullScreen';
import { WebGLScreen } from 'virtjs/devices/screens/WebGLScreen';

class HeadlessWebGLScreen extends WebGLScreen {

    constructor(options = {}) {

        super(Object.assign(options, {
            canvas: null,
            glBuilder: options => glContext(256, 256, options)
        }));

    }

}

describe(`Screen`, () => {

    let screens = { NullScreen, WebGLScreen: HeadlessWebGLScreen };

    for (let [ name, Screen ] of Object.entries(screens)) {

        describe(name, () => {

            describe(`#setInputSize()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`setInputSize`);
                    expect(screen.setInputSize).to.be.a(`function`);

                });

                it(`should set the #inputWidth, #inputHeight, and #inputPitch members`, () => {

                    let screen = new Screen();

                    screen.setInputSize(256, 256, 1024);

                    expect(screen.inputWidth).to.equal(256);
                    expect(screen.inputHeight).to.equal(256);
                    expect(screen.inputPitch).to.equal(1024);

                    screen.setInputSize(512, 512, 2048);

                    expect(screen.inputWidth).to.equal(512);
                    expect(screen.inputHeight).to.equal(512);
                    expect(screen.inputPitch).to.equal(2048);

                });

                it(`should automatically compute the pitch if missing`, () => {

                    let screen = new Screen();

                    screen.setInputSize(256, 256);

                    expect(screen.inputWidth).to.equal(256);
                    expect(screen.inputHeight).to.equal(256);
                    expect(screen.inputPitch).to.equal(256);

                    screen.setInputSize(512, 512);

                    expect(screen.inputWidth).to.equal(512);
                    expect(screen.inputHeight).to.equal(512);
                    expect(screen.inputPitch).to.equal(512);

                });

            });

            describe(`#validateInputFormat()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`validateInputFormat`);
                    expect(screen.validateInputFormat).to.be.a(`function`);

                });

                it(`should return a boolean`, () => {

                    let screen = new Screen();
                    let inputFormat = { depth: 16, rMask: 0x00000000, gMask: 0x00000000, bMask: 0x00000000 };

                    expect(screen.validateInputFormat(inputFormat)).to.be.a(`boolean`);

                });

            });

            describe(`#setInputFormat()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`setInputFormat`);
                    expect(screen.setInputFormat).to.be.a(`function`);

                });

            });

            describe(`#setInputData()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`setInputData`);
                    expect(screen.setInputData).to.be.a(`function`);

                });

                it(`should set the #inputData member`, () => {

                    let screen = new Screen();
                    let inputData = new Uint8Array(10);

                    expect(screen.inputData).to.be.null;

                    screen.setInputData(inputData);

                    expect(screen.inputData).to.equal(inputData);

                });

            });

            describe(`#setOutputSize()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`setOutputSize`);
                    expect(screen.setOutputSize).to.be.a(`function`);

                });

                it(`should set the #outputWidth and #outputHeight members`, () => {

                    let screen = new Screen();

                    screen.setOutputSize(256, 256);

                    expect(screen.outputWidth).to.equal(256);
                    expect(screen.outputHeight).to.equal(256);

                    screen.setOutputSize(512, 512);

                    expect(screen.outputWidth).to.equal(512);
                    expect(screen.outputHeight).to.equal(512);

                });

            });

            describe(`#flushScreen()`, () => {

                it(`should exist`, () => {

                    let screen = new Screen();

                    expect(screen).to.have.property(`flushScreen`);
                    expect(screen.flushScreen).to.be.a(`function`);

                });

            });

        });

    }

});
