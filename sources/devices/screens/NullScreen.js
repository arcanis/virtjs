export class NullScreen {

    validateInputFormat( format ) { /*

        The engines are calling this function to check if the device can work with the specified format, before actually setting it. It should return a boolean.

    */ return true; }

    setInputFormat( format ) { /*

        The engines are calling this function to inform the device about the data format that they will receive from this moment.

    */ }

    setInputSize( width, height, pitch = width ) { /*

        The engines are calling this function to tell the device how much width/height they are using.

    */ }

    setInputData( data ) { /*

        The engines are calling this function to set the color of every screen pixel at once.

    */ }

    setOutputSize( width, height ) { /*

        The user code is calling this function to tell the device how much width/height it should actually take on the screen.

    */ }

    flushScreen( ) { /*

        The engines are calling this function every time the screen has been fully updated (usually during vblank).

    */ }

};
