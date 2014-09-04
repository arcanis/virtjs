export var full16BitRegisters = [ 'sp' ];

export class Helpers {

    constructor( ) {

        this.baseAddress = 0;

    }

    applyClockCycles( countExpression ) { return `{

        if ((env.gpuClock -= (${countExpression})) <= 0) {
            if (env.triggerGpuCycle()) {
                jit.stop();
            }
        }

    }`; }

    checkForInvalidation( nextAddress ) { return `{

        if ( ! jit.stillValid( ) ) {
            return ${nextAddress};
        }

    }`; }

    jumpTo( addressExpression ) {

        if ( this.baseAddress === addressExpression ) { return `
            continue ;
        `; } else { return `{
            return ${addressExpression};
        }`; }

    }

    readR8( register ) {

        return `(env.${register} >>> 0)`;

    }

    readR16( register ) {

        if ( full16BitRegisters.indexOf( register ) === -1 ) {
            return `((${this.readR8(register[0])} << 8) | ${this.readR8(register[1])})`;
        } else {
            return `(env.${register} >>> 0)`;
        }

    }

    readMem8( addressExpression ) {

        return `env.readUint8(${addressExpression})`;

    }

    readMem16( addressExpression ) {

        return `((${this.readMem8(addressExpression)} << 8) | ${this.readMem8(this.add16(addressExpression, 1))})`;

    }

    writeR8( register, valueExpression ) { return `{

        env.${register} = (${valueExpression});

    }`; }

    writeR16( register, valueExpression ) {

        if ( full16BitRegisters.indexOf( register ) !== -1 ) { return `{
            env.${register} = (${valueExpression});
        }`; } else { return `{
            var writeR16_value = (${valueExpression});
            ${this.writeR8(register[0], 'writeR16_value >>> 8')};
            ${this.writeR8(register[1], 'writeR16_value & 0xFF')};
        }`; }

    }

    writeMem8( addressExpression, valueExpression ) { return `{

            env.writeUint8((${addressExpression}), (${valueExpression}));

    }`; }

    writeMem16( addressExpression, valueExpression ) { return `{

        var writeMem16_address = (${addressExpression});
        var writeMem16_value = (${valueExpression});

        ${this.writeMem8(this.add16('writeMem16_address', 0), 'writeMem16_value >>> 8')};
        ${this.writeMem8(this.add16('writeMem16_address', 1), 'writeMem16_value & 0xFF')}

    }`; }

    pushStack( valueExpression ) { return `{

        ${this.writeR16('sp', this.sub16(this.readR16('sp'), 2))};
        ${this.writeMem16(this.readR16('sp'), valueExpression)};

    }`; }

    popStack( targetIdentifier ) { return `{

        ${targetIdentifier} = ${this.readMem16(this.readR16('sp'))};
        ${this.writeR16('sp', this.add16(this.readR16('sp'), 2))};

    }`; }

    add8( expressionA, expressionB ) {

        return `(((${expressionA}) + (${expressionB})) & 0xFF)`;

    }

    add16( expressionA, expressionB ) {

        return `(((${expressionA}) + (${expressionB})) & 0xFFFF)`;

    }

    sub8( expressionA, expressionB ) {

        return `(((${expressionA}) - (${expressionB})) & 0xFF)`;

    }

    sub16( expressionA, expressionB ) {

        return `(((${expressionA}) - (${expressionB})) & 0xFFFF)`;

    }

    getFlag( flag ) {

        return `(((env.f & (${flag})) === (${flag})) | 0)`;

    }

    setFlag( flag, expression = 'true' ) {

        if ( typeof expression === 'boolean' ) {

            if ( expression ) { return `{
                env.f |= ${flag};
            }`; } else { return `{
                env.f &= ~${flag};
            }`; }

        } else { return `{

            if (${expression}) {
                env.f |= ${flag};
            } else {
                env.f &= ~${flag};
            }

        }`; }

    }

    bcd( expression ) {

        if ( typeof expression === 'boolean' ) {
            return this.setFlag( 0x40, expression );
        } else if ( typeof expression !== 'undefined' ) {
            throw new Error( 'Please cast this flag parameter to boolean' );
        } else {
            return this.getFlag( 0x40 );
        }

    }

    zero( expression ) {

        if ( typeof expression === 'boolean' ) {
            return this.setFlag( 0x80, expression );
        } else if ( typeof expression !== 'undefined' ) {
            return this.setFlag( 0x80, `((${expression}) === 0)` );
        } else {
            return this.getFlag( 0x80 );
        }

    }

    half( after, op, before, mask = 0x0F ) {

        if ( typeof after === 'boolean' ) {
            return this.setFlag( 0x20, after );
        } else if ( typeof after !== 'undefined' ) {
            return this.setFlag( 0x20, `(((${after}) & (${mask})) ${op} ((${before}) & (${mask})))` );
        } else {
            return this.getFlag( 0x20 );
        }

    }

    carry( after, op, before, mask = 0xFF ) {

        if ( typeof after === 'boolean' ) {
            return this.setFlag( 0x10, after );
        } else if ( typeof after !== 'undefined' ) {
            return this.setFlag( 0x10, `(((${after}) & (${mask})) ${op} ((${before}) & (${mask})))` );
        } else {
            return this.getFlag( 0x10 );
        }

    }

}
