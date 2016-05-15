import { ManualInput } from 'virtjs/devices/inputs/ManualInput';

describe(`ManualInput`, () => {

    describe(`#down()`, () => {

        it(`should set the corresponding key to "pressed"`, () => {

            let input = new ManualInput();

            input.down(0, 0);
            input.pollInputs();

            expect(input.getState(0, 0)).to.be.true;

        });

    });

    describe(`#up()`, () => {

        it(`should set the corresponding key to "released"`, () => {

            let input = new ManualInput();

            input.down(0, 0);
            input.pollInputs();

            expect(input.getState(0, 0)).to.be.true;

            input.up(0, 0);
            input.pollInputs();

            expect(input.getState(0, 0)).to.be.false;

        });

    });

    describe(`#pollInputs()`, () => {

        it(`should send the pending inputs into the current inputs`, () => {

            let input = new ManualInput();

            expect(input.getState(0, 0)).to.be.false;

            input.down(0, 0);

            expect(input.getState(0, 0)).to.be.false;

            input.pollInputs();

            expect(input.getState(0, 0)).to.be.true;

            input.up(0, 0);

            expect(input.getState(0, 0)).to.be.true;

            input.pollInputs();

            expect(input.getState(0, 0)).to.be.false;

        });

    });

    describe(`#setCodeMap()`, () => {

        it(`should set a translation map`, () => {

            let codeMap = { [`LEFT`]: 42 };

            let input = new ManualInput();
            input.setCodeMap(codeMap);

            input.down(0, `LEFT`);
            input.pollInputs();

            expect(input.getState(0, 42)).to.be.true;

        });

        it(`should be available right from the constructor`, () => {

            let codeMap = { [`LEFT`]: 42 };
            let input = new ManualInput({ codeMap });

            input.down(0, `LEFT`);
            input.pollInputs();

            expect(input.getState(0, 42)).to.be.true;

        });

    });

});
