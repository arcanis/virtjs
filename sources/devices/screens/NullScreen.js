export class NullScreen {

    validateInputFormat( format ) { /*

        The engines are calling this function to check if a device can work the specified format before setting it. The device should return a boolean.

    */ }

    setInputFormat( format ) { /*

        The engines are calling this function to tell the device what is the format they will be using from now.

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
