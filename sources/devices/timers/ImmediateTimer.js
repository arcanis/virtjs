export class ImmediateTimer {

    nextTick( callback ) {

        return setImmediate( callback );

    }

    cancelTick( marker ) {

        clearImmediate( marker );

    }

};
