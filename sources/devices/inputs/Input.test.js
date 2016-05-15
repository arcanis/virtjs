import { AggregateInput } from 'virtjs/devices/inputs/AggregateInput';
import { KeyboardInput }  from 'virtjs/devices/inputs/KeyboardInput';
import { ManualInput }    from 'virtjs/devices/inputs/ManualInput';
import { NullInput }      from 'virtjs/devices/inputs/NullInput';

describe(`Input`, () => {

    let inputs = { AggregateInput, ManualInput, NullInput };

    for (let [ name, Input ] of Object.entries(inputs)) {

        describe(name, () => {

            describe(`#pollInputs()`, () => {

                it(`should exists`, () => {

                    let input = new Input();

                    expect(input).to.have.property(`pollInputs`);
                    expect(input.pollInputs).to.be.a(`function`);

                });

            });

            describe(`#getState()`, () => {

                it(`should exists`, () => {

                    let input = new Input();

                    expect(input).to.have.property(`getState`);
                    expect(input.getState).to.be.a(`function`);

                });

                it(`should return a boolean`, () => {

                    let input = new Input();

                    expect(input.getState(0, 0)).to.be.a(`boolean`);

                });

            });

        });

    }

});
