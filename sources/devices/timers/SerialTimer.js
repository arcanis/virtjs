import { makeFastTick } from 'virtjs/devices/timers/utils';

let HANDLER_FN_SIZE = 31;
let HANDLER_FN_PATTERN = 0x7FFFFFFF;

export class SerialTimer {

    /**
     * A SerialTimer is a synchronous timer device. You can use it to run your emulator synchronously (ie. blocking the main thread). It also has the ability to only run a finite number of ticks before returning, which is quite valuable when debugging engines.
     *
     * @constructor
     * @implements {Timer}
     */

    constructor() {

        this.running = false;
        this.nested = false;

        this.queues = [ [ ], [ ] ];
        this.activeQueueIndex = 0;

    }

    nextTick(callback) {

        let activeQueueIndex = this.activeQueueIndex;
        let queue = this.queues[activeQueueIndex];
        let callbackIndex = queue.length;

        queue.push(callback);

        return activeQueueIndex << HANDLER_FN_SIZE | callbackIndex;

    }

    cancelTick(handler) {

        let activeQueueIndex = handler >>> HANDLER_FN_SIZE;
        let callbackIndex = handler & HANDLER_FN_PATTERN;

        this.queues[activeQueueIndex][callbackIndex] = null;

    }

    start(beginning, ending) {

        if (this.running)
            throw new Error(`You can't start a timer that is already running`);

        if (this.nested)
            throw new Error(`You can't start a timer from its callbacks - use resume instead`);

        let fastTick = makeFastTick(beginning, ending, () => {
            this.one();
        });

        this.running = true;
        this.nested = true;

        while (this.running)
            fastTick();

        this.nested = false;

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
     * Start the emulator. Run a single cycle then exit.
     */

    one() {

        let activeQueueIndex = this.activeQueueIndex;
        this.activeQueueIndex = activeQueueIndex ^ 1;

        let queue = this.queues[activeQueueIndex];

        for (let t = 0, T = queue.length; t < T; ++t)
            queue[t] && queue[t]();

        queue.length = 0;

    }

}
