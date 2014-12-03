export class NullTimer {

    nextTick( callback ) { /*

        An engine will call this function if it wants a function to be called at the next frame.

    */ }

    cancelTimeout( marker ) { /*

        An engine will call this function if it wants to cancel a delayed frame callback.

        The argument passed to cancelTick should be the return value of the matching nextTick call.

    */ }

};
