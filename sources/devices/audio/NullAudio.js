export class NullAudio {

    /**
     * A NullAudio is an audio device that won't play anything.
     *
     * @constructor
     * @implements {Audio}
     */

    constructor() { // eslint-disable-line no-useless-constructor

        // nothing

    }

    validateInputFormat(format) {

        return true;

    }

    setInputFormat(format) {

        // nothing

    }

    pushSampleBatch(samples) {

        // nothing

    }

}
