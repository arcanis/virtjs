/**
 * @name Input
 * @interface
 */

/**
 * An engine will call this function to inform the device that it should update the input state.
 *
 * It means that the devices should never update the input state by themselves, but rather wait for the engine order. It is also important that the update is done synchronously, so that right after returning, the engines are able to call {@link Input#getState}.
 *
 * @method
 * @name Input#pollInputs
 */

/**
 * An engine will call this function to check the current state of a specified input. The function will return true if the input is currently active (pressed), and false otherwise.
 *
 * @method
 * @name Input#getState
 *
 * @param {number} port - The input controller port.
 * @param {number} code - The input code.
 */
