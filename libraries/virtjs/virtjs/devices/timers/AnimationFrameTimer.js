export class AnimationFrameTimer {

    nextTick( callback ) {

        return requestAnimationFrame( callback );

    }

    cancelTick( marker ) {

        cancelAnimationFrame( marker );

    }

}
