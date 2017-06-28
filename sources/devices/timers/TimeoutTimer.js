import { AsyncTimer } from './AsyncTimer';

export class TimeoutTimer extends AsyncTimer {

    /**
     * A TimeoutTimer is a timer device that makes use of the setTimeout/clearTimeout API to trigger asynchronous ticks.
     *
     * @constructor
     *
     * @param {object} [options] - The timer options.
     * @param {number} [options.framesPerSecond] - The number of frames that should be triggered every second.
     */

    constructor({ framesPerSecond = 60 } = {}) { // eslint-disable-line no-useless-constructor

        super();

        this.framesPerSecond = 60;

    }

    prepare(callback) {

        return setTimeout(callback, 1000 / this.framesPerSecond);

    }

    cancel(timeoutId) {

        clearTimeout(timeoutId);

    }

}
