import { ImmediateTimer } from 'virtjs/devices/timers/ImmediateTimer';
import { SerialTimer }    from 'virtjs/devices/timers/SerialTimer';

describe(`Timer`, () => {

    let timers = { SerialTimer, AsyncTimer: ImmediateTimer };

    for (let [ name, Timer ] of Object.entries(timers)) {

        describe(name, () => {

            describe(`execution flow`, () => {

                it(`should not call back a tick that hasn't registered itself again`, () => {

                    let timer = new Timer();
                    let counter = 0;

                    let tick = chai.spy(() => {});
                    timer.nextTick(tick);

                    let ending = () => { if (++counter === 10) timer.stop(); };

                    return Promise.resolve(timer.start(null, ending)).then(() => {
                        expect(tick).to.have.been.called.once;
                    });

                });

            });

            describe(`#nextTick()`, () => {

                it(`should exist`, () => {

                    let timer = new Timer();

                    expect(timer).to.have.property(`nextTick`);
                    expect(timer.nextTick).to.be.a(`function`);

                });

                it(`should return an handler`, () => {

                    let timer = new Timer();

                    expect(timer.nextTick(() => {})).to.exist;

                });

                it(`should return unique handlers`, () => {

                    let timer = new Timer();
                    let fn = () => {};

                    let handler1 = timer.nextTick(() => {});
                    let handler2 = timer.nextTick(() => {});
                    let handler3 = timer.nextTick(fn);
                    let handler4 = timer.nextTick(fn);
                    timer.cancelTick(handler4);
                    let handler5 = timer.nextTick(fn);

                    expect(handler1).to.not.be.oneOf([ handler2, handler3, handler4, handler5 ]);
                    expect(handler2).to.not.be.oneOf([ handler1, handler3, handler4, handler5 ]);
                    expect(handler3).to.not.be.oneOf([ handler1, handler2, handler4, handler5 ]);
                    expect(handler4).to.not.be.oneOf([ handler1, handler2, handler3, handler5 ]);
                    expect(handler5).to.not.be.oneOf([ handler1, handler2, handler3, handler4 ]);

                });

            });

            describe(`#cancelTick()`, () => {

                it(`should exist`, () => {

                    let timer = new Timer();

                    expect(timer).to.have.property(`cancelTick`);
                    expect(timer.cancelTick).to.be.a(`function`);

                });

                it(`should cancel registered ticks`, () => {

                    let timer = new Timer();

                    let tick1 = chai.spy(() => {});
                    let tick2 = chai.spy(() => {});
                    let tick3 = chai.spy(() => {});

                    let ending = () => { timer.stop(); };

                    let handler1 = timer.nextTick(tick1);
                    let handler2 = timer.nextTick(tick2);
                    let handler3 = timer.nextTick(tick3);

                    timer.cancelTick(handler1);
                    timer.cancelTick(handler3);

                    return Promise.resolve(timer.start(null, ending)).then(() => {
                        expect(tick1).to.not.have.been.called();
                        expect(tick2).to.have.been.called.once;
                        expect(tick3).to.not.have.been.called();
                    });

                });

            });

            describe(`#start()`, () => {

                it(`should exist`, () => {

                    let timer = new Timer();

                    expect(timer).to.have.property(`start`);
                    expect(timer.start).to.be.a(`function`);

                });

                it(`should call "beginning" before each iteration`, () => {

                    let timer = new Timer();
                    let counter = 0;

                    let beginning = chai.spy(() => {});

                    timer.nextTick(function tick() {

                        expect(beginning).to.have.been.called.exactly(counter + 1);

                        if (++counter === 10) {
                            timer.stop();
                        } else {
                            timer.nextTick(tick);
                        }

                    });

                    expect(beginning).to.have.been.called.exactly(counter);

                    return timer.start(beginning);

                });

                it(`should call "ending" before each iteration`, () => {

                    let timer = new Timer();
                    let counter = 0;

                    let ending = chai.spy(() => {});

                    timer.nextTick(function tick() {

                        expect(ending).to.have.been.called.exactly(counter);

                        if (++counter === 10) {
                            timer.stop();
                        } else {
                            timer.nextTick(tick);
                        }

                    });

                    expect(ending).to.have.been.called.exactly(counter);

                    return timer.start(null, ending);

                });

                it(`should call both "beginning" and "ending" at the right time`, () => {

                    let timer = new Timer();
                    let counter = 0;

                    let beginning = chai.spy(() => {});
                    let ending = chai.spy(() => {});

                    timer.nextTick(function tick() {

                        expect(beginning).to.have.been.called.exactly(counter + 1);
                        expect(ending).to.have.been.called.exactly(counter);

                        if (++counter === 10) {
                            timer.stop();
                        } else {
                            timer.nextTick(tick);
                        }

                    });

                    expect(beginning).to.have.been.called.exactly(counter);
                    expect(ending).to.have.been.called.exactly(counter);

                    return timer.start(beginning, ending);

                });

            });

            describe(`#resume()`, () => {

                it(`should exist`, () => {

                    let timer = new Timer();

                    expect(timer).to.have.property(`resume`);
                    expect(timer.resume).to.be.a(`function`);

                });

                it(`should be able to resume from an early stop`, () => {

                    let timer = new Timer();
                    let counter = 0;

                    let beginning = () => { timer.stop(); };
                    let ending = () => { if (counter < 10) timer.resume(); };

                    timer.nextTick(function tick() {

                        if (++counter === 10) {
                            timer.stop();
                        } else {
                            timer.nextTick(tick);
                        }

                    });

                    return Promise.resolve(timer.start(beginning, ending)).then(() => {
                        expect(counter).to.equal(10);
                    });

                });

            });

            describe(`#stop()`, () => {

                it(`should exist`, () => {

                    let timer = new Timer();

                    expect(timer).to.have.property(`stop`);
                    expect(timer.stop).to.be.a(`function`);

                });

            });

        });

    }

});
