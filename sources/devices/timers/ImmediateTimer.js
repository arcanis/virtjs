import { AsyncTimer } from './AsyncTimer';

export class ImmediateTimer extends AsyncTimer {

    prepare( callback ) {

        return setImmediate( callback );

    }

    cancel( immediateId ) {

        clearImmediate( nextTickId );

    }

};
