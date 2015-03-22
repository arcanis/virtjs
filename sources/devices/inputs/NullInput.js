export class NullInput {

    pollInputs( ) { /*

        The engines will call this function to tell the device that it should update the input states.

        It means that the devices should not update the input state by themselves, and that they should wait for the engine to tell them to do so.

    */ }

    getState( port, inputCode ) { /*

        The engines will call this function to check a specified input state. It is expected to return a boolean.

        The `port` argument is an integer specifying which controller we're talking about.

    */ }

};
