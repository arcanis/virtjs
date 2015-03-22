export class DataScreen {

    constructor( ) {

        this.inputWidth = 0;
        this.inputHeight = 0;

        this.inputFormat = null;
        this.inputData = null;

    }

    validateInputFormat( format ) {

        return true;

    }

    setInputFormat( format ) {

        this.inputFormat = format;

    }

    setInputSize( width, height, pitch = width ) {

        this.inputWidth = width;
        this.inputHeight = height;
        this.inputPitch = pitch;

    }

    setInputData( data ) {

        this.data = data;

    }

    flushScreen( ) {

    }

}
