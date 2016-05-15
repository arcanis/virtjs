export class NullScreen {

    /**
     * A NullScreen is a screen device that doesn't actually render anything. It might be useful if you want to run an engine on Node.
     *
     * @constructor
     * @implements {Screen}
     */

    constructor() {

        this.inputWidth = 0;
        this.inputHeight = 0;
        this.inputPitch = 0;

        this.inputFormat = null;
        this.inputData = null;

        this.outputWidth = 0;
        this.outputHeight = 0;

    }

    validateInputFormat(format) {

        return true;

    }

    setInputFormat(format) {

        this.inputFormat = format;

    }

    setInputSize(width, height, pitch = width) {

        this.inputWidth = width;
        this.inputHeight = height;
        this.inputPitch = pitch;

    }

    setInputData(data) {

        this.inputData = data;

    }

    setOutputSize(width, height) {

        this.outputWidth = width;
        this.outputHeight = height;

    }

    flushScreen() {

        // nothing

    }

}
