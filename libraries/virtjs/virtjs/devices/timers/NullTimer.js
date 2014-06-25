export class NullTimer {

    nextTick( callback ) { /*

        An engine will call this function if it wants a function to be called at the next frame.

    */ }

    createTimeout( callback, delay ) { /*

        An engine will call this function if it wants a function to be called in X milliseconds.

    */ }

    cancelTimeout( timeout ) { /*

        An engine will call this function if it wants to disable a timeout.

    */ }

};
