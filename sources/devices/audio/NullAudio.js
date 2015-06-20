export class NullAudio {

    validateInputFormat( format ) { /*

        The engines are calling this function to check if the device can work with the specified format, before actually setting it. It should return a boolean.

    */ return true; }

    setInputFormat( format ) { /*

        The engines are calling this function to inform the device about the data format that they will receive from this moment.

    */ }

    pushSampleBatch( samples ) { /*

        The engines are calling this function to send a unspecified amount of samples to the device to be played later. The samples are expected to be interlaced, regardless of the input format (for example, a mono stream will have [left, left, left] and a stereo will have [left, right, left, right, left, right]).

    */ }

}
