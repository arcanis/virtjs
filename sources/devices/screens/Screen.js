/**
 * @name Screen
 * @interface
 */

/**
 * This value contains the width of the input that the screen is expecting to render.
 *
 * Use {@link Screen#setInputSize} to change it.
 *
 * @member
 * @readonly
 * @name Screen#inputWidth
 * @type {number}
 */

/**
 * This value contains the height of the input that the screen is expecting to render.
 *
 * Use {@link Screen#setInputSize} to change it.
 *
 * @member
 * @readonly
 * @name Screen#inputHeight
 * @type {number}
 */

/**
 * This value contains the pitch of the input that the screen is expecting to render.
 *
 * The pitch is the actual amount of data in a pixel row. Some engines add extra data after each row in order to align the data size.
 *
 * Use {@link Screen#setInputSize} to change it.
 *
 * @member
 * @readonly
 * @name Screen#inputPitch
 * @type {number}
 */

/**
 * This value contains the input format that the screen is expecting to render.
 *
 * Use {@link Screen#setInputFormat} to change it.
 *
 * @member
 * @readonly
 * @name Screen#inputFormat
 * @type {ScreenInputFormat}
 */

/**
 * This value contains the data that the screen is currently rendering.
 *
 * Use {@link Screen#setInputData} to change it.
 *
 * @member
 * @readonly
 * @name Screen#inputData
 * @type {*}
 */

/**
 * This value contains the output width of the rendered data.
 *
 * Use {@link Screen#setOutputSize} to change it.
 *
 * @member
 * @readonly
 * @name Screen#outputWidth
 * @type {number}
 */

/**
 * This value contains the output height of the rendered data.
 *
 * Use {@link Screen#setOutputSize} to change it.
 *
 * @member
 * @readonly
 * @name Screen#outputHeight
 * @type {number}
 */

/**
 * An engine will call this function to inform the device of the new input size.
 *
 * @method
 * @name Screen#setInputSize
 *
 * @param {number} width - The new input width.
 * @param {number} height - The new input height.
 * @param {number} [pitch] - The new input pitch.
 */

/**
 * An engine will call this function to check if the device supports the specified input format.
 *
 * Return true if the screen device supports the specified input format.
 *
 * @method
 * @name Screen#validateInputFormat
 *
 * @param {ScreenInputFormat} format - The input format to validate.
 *
 * @return {bool}
 */

/**
 * An engine will call this function to inform the device of the new input format.
 *
 * Throw an exception if the screen device doesn't support the new input format.
 *
 * @method
 * @name Screen#setInputFormat
 *
 * @param {ScreenInputFormat} format - The new input format.
 */

/**
 * An engine will call this function to inform the device of the new input data.
 *
 * @method
 * @name Screen#setInputData
 *
 * @param {*} data - The new input data.
 */

/**
 * Change the output size.
 *
 * @method
 * @name Screen#setOutputSize
 *
 * @param {number} width - The new output width.
 * @param {number} height - The new output height.
 */

/**
 * Render the input data on the screen.
 *
 * @method
 * @name Screen#flushScreen
 */
