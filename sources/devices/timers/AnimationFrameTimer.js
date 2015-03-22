import { AsyncTimer } from './AsyncTimer';

export class AnimationFrameTimer extends AsyncTimer {

    prepare( callback ) {

        return window.requestAnimationFrame( callback );

    }

    cancel( animationFrameId ) {

        window.cancelAnimationFrame( animationFrameId );

    }

}
