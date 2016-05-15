export class NullInput {

    /**
     * A NullInput is an input device that will never transmit any key as pressed. Even if you don't want any fancy keyboard support or similar, {@link ManualInput} is probably a better candidate than NullInput since the later allows you to programmatically trigger key events should you need to, whereas NullInput will never ever do anything.
     *
     * @constructor
     * @implements {Input}
     */

    constructor() { // eslint-disable-line no-useless-constructor

        // nothing

    }

    pollInputs() {

        // nothing

    }

    getState(port, inputCode) {

        return false;

    }

}
