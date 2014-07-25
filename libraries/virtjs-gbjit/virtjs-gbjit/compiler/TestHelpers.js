import { Helpers } from 'virtjs-gbjit/compiler/Helpers';

export class TestHelpers extends Helpers {

    jumpTo( addressExpression ) { return `{

        env.pc = (${addressExpression});
        env.testCommit();

        return env.pc;

    }`; }

}
