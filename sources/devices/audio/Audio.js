/**
 * @name Audio
 * @interface
 */

/**
 * An engine will call this function to check if the device supports the specified input format.
 *
 * Return true if the audio device supports the specified input format.
 *
 * @method
 * @name Audio#validateInputFormat
 *
 * @param {AudioInputFormat} format - The input format to validate.
 */

/**
 * An engine will call this function to inform the device of the new input format.
 *
 * Throw an exception if the audio device doesn't support the new input format.
 *
 * @method
 * @name Audio#setInputFormat
 *
 * @param {AudioInputFormat} format - The new input format.
 */

/**
 * An engine will call this function to send samples that the audio device will queue to be played.
 *
 * Regardless of the input format, the samples are expected to be interlaced (for example, a mono stream will have [left, left, left], whereas a stereo stream will have [left, right, left, right, left, right]).
 *
 * @param {number[]} samples - The samples to queue.
 */
