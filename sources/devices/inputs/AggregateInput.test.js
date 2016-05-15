import { AggregateInput } from 'virtjs/devices/inputs/AggregateInput';
import { ManualInput }    from 'virtjs/devices/inputs/ManualInput';

describe(`AggregateInput`, () => {

    describe(`#pollInputs()`, () => {

        it(`should call pollInputs() on each aggregated input`, () => {

            let aggregatedInputA = new ManualInput();
            let aggregatedInputB = new ManualInput();

            let input = new AggregateInput([ aggregatedInputA, aggregatedInputB ]);

            aggregatedInputA.down(0, 0);
            aggregatedInputB.down(1, 1);

            expect(aggregatedInputA.getState(0, 0)).to.be.false;
            expect(aggregatedInputB.getState(1, 1)).to.be.false;

            input.pollInputs();

            expect(aggregatedInputA.getState(0, 0)).to.be.true;
            expect(aggregatedInputB.getState(1, 1)).to.be.true;

        });

    });

    describe(`#getState()`, () => {

        it(`should return true if any of the aggregated input would return true`, () => {

            let aggregatedInputA = new ManualInput();
            let aggregatedInputB = new ManualInput();

            let input = new AggregateInput([ aggregatedInputA, aggregatedInputB ]);

            aggregatedInputA.down(0, 0);
            aggregatedInputB.down(1, 1);

            input.pollInputs();

            expect(input.getState(0, 0)).to.be.true;
            expect(input.getState(1, 1)).to.be.true;
            expect(input.getState(2, 2)).to.be.false;

        });

    });

});
