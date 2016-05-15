export class NullTimer {

    /**
     * A NullTimer is a timer device that will never tick. You probably don't want to use it. If you're looking for a synchronous timer, check {@link SerialTimer} instead. If you're looking for an asynchronous timer that works on Node.js, check {@link ImmediateTimer} instead. If you're looking for a synchronous timer that works on Node.js, check {@link SerialTimer} instead.
     *
     * @constructor
     * @implements {Timer}
     *
     * @see {@link SerialTimer}
     */

    constructor() { // eslint-disable-line no-useless-constructor

        // nothing

    }

    nextTick(callback) {

        // nothing

    }

    cancelTick(nextTickId) {

        // nothing

    }

    start(beginning, ending) {

        return new Promise(() => {});

    }

    stop() {

        // nothing

    }

}
