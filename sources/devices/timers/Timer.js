/**
 * @name Timer
 * @interface
 */

/**
 * An engine will call this function if it wants to schedule a function to be called at the next tick.
 *
 * @method
 * @name Timer#nextTick
 *
 * @param {function} fn - The function that should be registered.
 * @return {Opaque} handler
 */

/**
 * An engine will call this function if it wants to prevent a scheduled function from being executed.
 *
 * @method
 * @name Timer#cancelTick
 *
 * @param {Opaque} handler - The handler returned by {@link Timer#nextTick}.
 */

/**
 * Start the timer.
 *
 * @method
 * @name Timer#start
 *
 * @param {function} [beginning] - An optional function that will be called before each tick.
 * @param {function} [ending] - An optional function that will be caled after each tick.
 */

/**
 * Stop the timer.
 *
 * @method
 * @name Timer#stop
 */
