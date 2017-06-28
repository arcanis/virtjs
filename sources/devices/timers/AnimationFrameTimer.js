import { AsyncTimer } from './AsyncTimer';

export class AnimationFrameTimer extends AsyncTimer {

    /**
     * An AnimationFrameTimer is a timer device that makes use of the requestAnimationFrame/cancelAnimationFrame API from modern browsers to trigger asynchronous ticks.
     *
     * @constructor
     */

    constructor() { // eslint-disable-line no-useless-constructor

        super();

    }

    prepare(callback) {

        return window.requestAnimationFrame(callback);

    }

    cancel(animationFrameId) {

        window.cancelAnimationFrame(animationFrameId);

    }

}
