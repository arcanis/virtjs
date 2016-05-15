import { SerialTimer } from 'virtjs/devices/timers/SerialTimer';

describe(`SerialTimer`, () => {

    describe(`execution flow`, () => {

        it(`should keep running until being stopped`, () => {

            let timer = new SerialTimer();
            let counter = 0;

            let fn = () => {
                if (++counter === 10) {
                    timer.stop();
                } else {
                    timer.nextTick(fn);
                }
            };

            timer.nextTick(fn);
            timer.start();

            expect(counter).to.equal(10);

        });

    });

    describe(`#one()`, () => {

        it(`should run a single iteration before returning`, () => {

            let timer = new SerialTimer();

            let tick = chai.spy(() => {});

            timer.nextTick(tick);
            timer.one();

            expect(tick).to.have.been.called.once;

        });

    });

});
