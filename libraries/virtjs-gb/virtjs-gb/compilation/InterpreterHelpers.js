import { Helpers } from './Helpers';

export class InterpreterHelpers extends Helpers {

    checkForInvalidation( ) { return `{

    }`; }


    applyClockCycles( countExpression ) { return `{

        interpreter._applyClockCycles(${countExpression});

    }`; }

    jumpTo( addressExpression ) { return `{

        return ${addressExpression};

    }`; }

    endFrame( ) { return `{

        interpreter._running = false;

    }`; }

    writeMem8( addressExpression, valueExpression ) { return `{

        interpreter._mmu.writeUint8((${addressExpression}), (${valueExpression}));

    }`; }

    readMem8( addressExpression ) {

        return `interpreter._mmu.readUint8(${addressExpression})`;

    }

}
