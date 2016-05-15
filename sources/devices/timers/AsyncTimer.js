import { SerialTimer }  from 'virtjs/devices/timers/SerialTimer';
import { makeFastTick } from 'virtjs/devices/timers/utils';

export class AsyncTimer {

    /**
     * An AsyncTimer is an asynchronous timer device. You can use it to run your emulator without blocking your main thread. However, unless you really want to implement a new asynchronous device on top of a new API, you're probably looking for {@link AnimationFrameTimer} for browser environments, or {@link ImmediateTimer} for Node.js environments.
     *
     * @constructor
     * @implements {Timer}
     *
     * @param {object} [options] - The timer options.
     * @param {function} [options.prepare] - The callback that will schedule the next cycle
     * @param {function} [options.cancel] - The callback that will abort the next cycle
     *
     * @see {@link AnimationFrameTimer}
     * @see {@link ImmediateTimer}
     */

    constructor({ prepare, cancel } = { }) {

        if (prepare)
            this.prepare = prepare;

        if (cancel)
            this.cancel = cancel;

        this.running = false;
        this.nested = false;

        this.loopHandler = null;
        this.fastLoop = null;

        this.timer = new SerialTimer();

    }

    nextTick(callback) {

        return this.timer.nextTick(callback);

    }

    cancelTick(handler) {

        return this.timer.cancelTick(handler);

    }

    start(beginning, ending) {

        if (this.running)
            throw new Error(`You can't start a timer that is already running`);

        if (this.nested)
            throw new Error(`You can't start a timer from its callbacks - use resume instead`);

        this.running = true;

        let resolve;
        let reject;

        let promise = new Promise((resolveFn, rejectFn) => {

            resolve = resolveFn;
            reject = rejectFn;

        });

        let fastTick = makeFastTick(beginning, ending, () => {

            this.timer.one();

        });

        let mainLoop = () => {

            if (!this.running) {

                resolve();

            } else try {

                this.prepare(mainLoop);

                this.nested = true;
                fastTick();
                this.nested = false;

            } catch (e) {

                this.running = false;
                this.nested = false;

                reject(e);

            }

        };

        this.prepare(mainLoop);

        return promise;

    }

    resume() {

        if (!this.nested)
            throw new Error(`You can't resume a timer from anywhere else than its callbacks - use start instead`);

        if (this.running)
            return;

        this.running = true;

    }

    stop() {

        if (!this.running)
            return;

        this.running = false;

    }

    /**
     * This method should be specialized, either via subclassing, or by passing the proper parameter when instanciating the timer.
     *
     * @protected
     *
     * @type {prepareCallback}
     */

    prepare() {

        throw new Error(`Unimplemented`);

    }

    /**
     * This method should be specialized, either via subclassing, or by passing the proper parameter when instanciating the timer.
     *
     * @protected
     *
     * @type {cancelCallback}
     */

    cancel() {

        throw new Error(`Unimplemented`);

    }

}
