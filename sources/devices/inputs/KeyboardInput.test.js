import keysim            from 'keysim';

import { KeyboardInput } from 'virtjs/devices/inputs/KeyboardInput';

describe(`KeyboardInput`, () => {

    describe(`input fetching`, () => {

        it(`should catch every related keydown input on its element`, () => {

            let input = new KeyboardInput();
            let keyboard = keysim.Keyboard.US_ENGLISH;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

        });

        it(`should catch every related keyup input on its element`, () => {

            let input = new KeyboardInput();
            let keyboard = keysim.Keyboard.US_ENGLISH;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), document.body, true, keysim.KeyEvents.UP);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.false;
            expect(input.getState(0, `RIGHT`)).to.be.false;
            expect(input.getState(0, `UP`)).to.be.false;
            expect(input.getState(0, `DOWN`)).to.be.false;

        });

    });

    describe(`#setElement()`, () => {

        it(`should set the bound element`, () => {

            let sub1 = document.createElement('div');
            document.body.appendChild(sub1);

            let sub2 = document.createElement('div');
            document.body.appendChild(sub2);

            let input = new KeyboardInput();
            let keyboard = keysim.Keyboard.US_ENGLISH;

            input.setElement(sub1);

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), sub1, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), sub2, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

        });

        it(`should be available right from the constructor`, () => {

            let sub1 = document.createElement('div');
            document.body.appendChild(sub1);

            let sub2 = document.createElement('div');
            document.body.appendChild(sub2);

            let input = new KeyboardInput({ element: sub1 });
            let keyboard = keysim.Keyboard.US_ENGLISH;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), sub1, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

            for (let action of [ `left`, `right`, `up`, `down` ])
                keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForAction(action), sub2, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `LEFT`)).to.be.true;
            expect(input.getState(0, `RIGHT`)).to.be.true;
            expect(input.getState(0, `UP`)).to.be.true;
            expect(input.getState(0, `DOWN`)).to.be.true;

        });

    });

    describe(`#setKeyMap()`, () => {

        it(`should set the key map`, () => {

            let keyMap = { [48]: [ 0, `HELLO` ] };

            let input = new KeyboardInput();
            let keyboard = keysim.Keyboard.US_ENGLISH;

            input.setKeyMap(keyMap);

            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(48), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `HELLO`)).to.be.true;

        });

        it(`should be available right from the constructor`, () => {

            let keyMap = { [48]: [ 0, `HELLO` ] };

            let input = new KeyboardInput({ keyMap });
            let keyboard = keysim.Keyboard.US_ENGLISH;

            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(48), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `HELLO`)).to.be.true;

        });

        it(`should release any key that isn't used anymore`, () => {

            let keyMap1 = { [48]: [ 0, `A` ], [49]: [ 0, `B` ] };
            let keyMap2 = { [48]: [ 0, `A` ] };

            let input = new KeyboardInput({ keyMap: keyMap1 });
            let keyboard = keysim.Keyboard.US_ENGLISH;

            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(48), document.body, true, keysim.KeyEvents.DOWN);
            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(49), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `A`)).to.be.true;
            expect(input.getState(0, `B`)).to.be.true;

            input.setKeyMap(keyMap2);
            input.pollInputs();

            expect(input.getState(0, `A`)).to.be.true;
            expect(input.getState(0, `B`)).to.be.false;

        });

        it(`should release any key that isn't mapped to the same input anymore`, () => {

            let keyMap1 = { [48]: [ 0, `A` ], [49]: [ 0, `B` ] };
            let keyMap2 = { [48]: [ 0, `A` ], [49]: [ 0, `C` ] };

            let input = new KeyboardInput({ keyMap: keyMap1 });
            let keyboard = keysim.Keyboard.US_ENGLISH;

            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(48), document.body, true, keysim.KeyEvents.DOWN);
            keyboard.dispatchEventsForKeystroke(keyboard.keystrokeForCharCode(49), document.body, true, keysim.KeyEvents.DOWN);

            input.pollInputs();

            expect(input.getState(0, `A`)).to.be.true;
            expect(input.getState(0, `B`)).to.be.true;

            input.setKeyMap(keyMap2);
            input.pollInputs();

            expect(input.getState(0, `A`)).to.be.true;
            expect(input.getState(0, `B`)).to.be.false;
            expect(input.getState(0, `C`)).to.be.false;

        });

    });

});
