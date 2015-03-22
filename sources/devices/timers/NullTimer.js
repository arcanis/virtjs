export class NullTimer {

    nextTick( callback ) { /*

        An engine will call this function if it wants a function to be called at the next frame.

    */ }

    cancelTick( nextTickId ) { /*

        An engine will call this function if it wants to cancel a register tick callback.

        The argument passed to cancelTick should be the return value of the matching nextTick call.

    */ }

    start( beginning, ending ) { /*

        You have to call this function in order to actually start the timer.

        The beginning and ending options are optionals, and will be called before and after calling any registered callbacks. Even if multiple callbacks are registered, beginning and ending will be called only once.

    */ }

};
