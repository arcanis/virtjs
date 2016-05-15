import { ImmediateTimer } from 'virtjs/devices/timers/ImmediateTimer';

describe(`AsyncTimer`, () => {

    describe(`execution flow`, () => {

        it(`should not call registered ticks if stopped before even starting`, () => {

            let timer = new ImmediateTimer();
            let tick = chai.spy(() => {});

            timer.nextTick(tick);

            let promise = timer.start();
            timer.stop();

            return promise.then(() => {
                expect(tick).to.not.have.been.called();
            });

        });

    });

});
