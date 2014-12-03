export class NullScreen {

    setInputSize( width, height ) { /*

        The engines are calling this function to tell the device how much width/height they are using.

    */ }

    setOutputSize( width, height ) { /*

        The user code is calling this function to tell the device how much width/height it should actually take on the screen.

    */ }

    setPixel( x, y, r, g, b ) { /*

        The engines are calling this function to set the RGB color of a single pixel.

    */ }

    flushLine( ) { /*

        The engines are calling this function every time a line has been fully updated (usually during hblank).

    */ }

    flushScreen( ) { /*

        The engines are calling this function every time the screen has been fully updated (usually during vblank).

    */ }

};
