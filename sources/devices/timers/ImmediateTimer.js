import { AsyncTimer } from './AsyncTimer';

export class ImmediateTimer extends AsyncTimer {

    /**
     * An ImmediateTimer is a timer device that makes use of the setImmediate/clearImmediate API from Node to trigger aynchronous ticks.
     *
     * @constructor
     */

    constructor() { // eslint-disable-line no-useless-constructor

        super();

    }

    prepare(callback) {

        return setImmediate(callback);

    }

    cancel(handler) {

        clearImmediate(handler);

    }

}
