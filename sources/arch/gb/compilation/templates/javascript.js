export var templates = {

    'NOP' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};

    `,

    'DI' : ( address, nextAddress, parameters, h ) => `

        ${h.delayInterruptSwitch(false, 0)};

        ${h.applyClockCycles(1)};

    `,

    'EI' : ( address, nextAddress, parameters, h ) => `

        // Note that EI is the only instruction to have a delayed interrupt switch (not even RETI!)

        ${h.delayInterruptSwitch(true, 1)};

        ${h.applyClockCycles(1)};

    `,

    'PUSH_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.pushStack(h.readR16(parameters[0]))};

        ${h.applyClockCycles(4)};

    `,

    'POP_r16' : ( address, nextAddress, parameters, h ) => `

        var value;
        ${h.popStack('value')};

        ${h.writeR16(parameters[0], 'value')};

        ${h.applyClockCycles(3)};

    `,

    'POP_AF' : ( address, nextAddress, parameters, h ) => `

        var value;
        ${h.popStack('value')};

        ${h.writeR16('af', 'value & 0xFFF0')};

        ${h.applyClockCycles(3)};

    `,

    'LD_r16_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR16(parameters[0], h.readR16(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LD_r16_u16' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR16(parameters[0], parameters[1])};

        ${h.applyClockCycles(3)};

    `,

    'LD_r8_r8' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR8(parameters[0], h.readR8(parameters[1]))};

        ${h.applyClockCycles(1)};

    `,

    'LD_r8_u8' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR8(parameters[0], parameters[1])};

        ${h.applyClockCycles(2)};

    `,

    'LD_r8_(u16)' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(2)};

        ${h.writeR8(parameters[0], h.readMem8(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LD_(u16)_r8' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(2)};

        ${h.writeMem8(parameters[0], h.readR8(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LD_(u16)_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.writeMem16(parameters[0], h.readR16(parameters[1]))};

        ${h.applyClockCycles(5)};

    `,

    'LD_(r16)_u8' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};

        ${h.writeMem8(h.readR16(parameters[0]), parameters[1])};

        ${h.applyClockCycles(2)};

    `,

    'LD_(r16)_r8' : ( address, nextAddress, parameters, h ) => `

        ${h.writeMem8(h.readR16(parameters[0]), h.readR8(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LD_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR8(parameters[0], h.readMem8(h.readR16(parameters[1])))};

        ${h.applyClockCycles(2)};

    `,

    'LD_r8_(r8)' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR8(parameters[0], h.readMem8(h.add16(0xFF00, h.readR8(parameters[1]))))};

        ${h.applyClockCycles(2)};

    `,

    'LD_(r8)_r8' : ( address, nextAddress, parameters, h ) => `

        ${h.writeMem8(h.add16(0xFF00, h.readR8(parameters[0])), h.readR8(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LDH_r8_(u8)' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};

        ${h.writeR8(parameters[0], h.readMem8(h.add16(0xFF00, parameters[1])))};

        ${h.applyClockCycles(2)};

    `,

    'LDH_(u8)_r8' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};

        ${h.writeMem8(h.add16(0xFF00, parameters[0]), h.readR8(parameters[1]))};

        ${h.applyClockCycles(2)};

    `,

    'LDHL_r16_i8' : ( address, nextAddress, parameters, h ) => `

        var hlBefore = ${h.readR16(parameters[0])};
        var hlAfter = ${h.add16('hlBefore', parameters[1])};

        ${h.writeR16('hl', 'hlAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half('hlAfter', '<', 'hlBefore')};
        ${h.carry('hlAfter', '<', 'hlBefore')};

        ${h.applyClockCycles(3)};

    `,

    'LDI_(r16)_r8' : ( address, nextAddress, parameters, h ) => `

        var position = ${h.readR16(parameters[0])};
        ${h.writeMem8('position', h.readR8(parameters[1]))};

        ${h.writeR16(parameters[0], h.add16('position', 1))}

        ${h.applyClockCycles(2)};

    `,

    'LDI_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var position = ${h.readR16(parameters[1])};
        ${h.writeR8(parameters[0], h.readMem8('position'))};

        ${h.writeR16(parameters[1], h.add16('position', 1))};

        ${h.applyClockCycles(2)};

    `,

    'LDD_(r16)_r8' : ( address, nextAddress, parameters, h ) => `

        var position = ${h.readR16(parameters[0])};
        ${h.writeMem8('position', h.readR8(parameters[1]))};

        ${h.writeR16(parameters[0], h.sub16('position', 1))}

        ${h.applyClockCycles(2)};

    `,

    'LDD_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var position = ${h.readR16(parameters[1])};
        ${h.writeR8(parameters[0], h.readMem8('position'))};

        ${h.writeR16(parameters[1], h.sub16('position', 1))};

        ${h.applyClockCycles(2)};

    `,

    'CCF' : ( address, nextAddress, parameters, h ) => `

        ${h.bcd(false)};
        ${h.half(false)};

        if (${h.carry()}) {
            ${h.carry(false)};
        } else {
            ${h.carry(true)};
        }

        ${h.applyClockCycles(1)};

    `,

    'SCF' : ( address, nextAddress, parameters, h ) => `

        ${h.bcd(false)};
        ${h.half(false)};
        ${h.carry(true)};

        ${h.applyClockCycles(1)};

    `,

    'DAA' : ( address, nextAddress, parameters, h ) => `

        var tmpA = ${h.readR8('a')};
        var correction = 0;

        if (${h.half()})
            correction |= 0x06;
        if (${h.carry()})
            correction |= 0x60;

        if (${h.bcd()}) {

            ${h.writeR8('a', h.sub8('tmpA', 'correction'))};

        } else {

            if ((tmpA & 0x0F) > 0x09)
                correction |= 0x06;
            if ((tmpA & 0xFF) > 0x99)
                correction |= 0x60;

            ${h.writeR8('a', h.add8('tmpA', 'correction'))}

        }

        ${h.zero(h.readR8('a'))};
        ${h.half(false)};

        if (correction & 0x60) {
            ${h.carry(true)}
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(1)};

    `,

    'INC_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', 1)};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '<', 'rBefore')};

        ${h.applyClockCycles(1)};

    `,

    'INC_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR16(parameters[0], h.add16(h.readR16(parameters[0]), 1))};

        ${h.applyClockCycles(2)};

    `,

    'INC_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        var mBefore = ${h.readMem8('target')};
        var mAfter = ${h.add8('mBefore', 1)};

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half('mAfter', '<', 'mBefore')};

        ${h.applyClockCycles(2)};

    `,

    'DEC_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', 1)};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(true)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '>', 'rBefore')};

        ${h.applyClockCycles(1)};

    `,

    'DEC_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.writeR16(parameters[0], h.sub16(h.readR16(parameters[0]), 1))};

        ${h.applyClockCycles(2)};

    `,

    'DEC_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        var mBefore = ${h.readMem8('target')};
        var mAfter = ${h.sub8('mBefore', 1)};

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(true)};
        ${h.zero('mAfter')};
        ${h.half('mAfter', '>', 'mBefore')};

        ${h.applyClockCycles(2)};

    `,

    'JR_NZ_i8' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 0) {

            ${h.applyClockCycles(3)};
            ${h.jumpTo(h.add16(nextAddress, parameters[0]))};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'JR_Z_i8' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 1) {

            ${h.applyClockCycles(3)};
            ${h.jumpTo(h.add16(nextAddress, parameters[0]))};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'JR_NC_i8' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 0) {

            ${h.applyClockCycles(3)};
            ${h.jumpTo(h.add16(nextAddress, parameters[0]))};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'JR_C_i8' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 1) {

            ${h.applyClockCycles(3)};
            ${h.jumpTo(h.add16(nextAddress, parameters[0]))};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'JR_i8' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(3)};
        ${h.jumpTo(h.add16(nextAddress, parameters[0]))};

    `,

    'JP_NZ_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 0) {

            ${h.applyClockCycles(4)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'JP_Z_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 1) {

            ${h.applyClockCycles(4)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'JP_NC_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 0) {

            ${h.applyClockCycles(4)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'JP_C_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 1) {

            ${h.applyClockCycles(4)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'JP_u16' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(4)};
        ${h.jumpTo(parameters[0])};

    `,

    'JP_r16' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};
        ${h.jumpTo(h.readR16(parameters[0]))};

    `,

    'CALL_NZ_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 0) {

            ${h.pushStack(nextAddress)};

            ${h.applyClockCycles(6)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'CALL_Z_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 1) {

            ${h.pushStack(nextAddress)};

            ${h.applyClockCycles(6)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'CALL_NC_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 0) {

            ${h.pushStack(nextAddress)};

            ${h.applyClockCycles(6)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'CALL_C_u16' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 1) {

            ${h.pushStack(nextAddress)};

            ${h.applyClockCycles(6)};
            ${h.jumpTo(parameters[0])};

        } else {

            ${h.applyClockCycles(3)};

        }

    `,

    'CALL_u16' : ( address, nextAddress, parameters, h ) => `

        ${h.pushStack(nextAddress)};

        ${h.applyClockCycles(6)};
        ${h.jumpTo(parameters[0])};

    `,

    'RET_NZ' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 0) {

            var retTarget;
            ${h.popStack('retTarget')};

            ${h.applyClockCycles(5)};
            ${h.jumpTo('retTarget')};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'RET_Z' : ( address, nextAddress, parameters, h ) => `

        if (${h.zero()} === 1) {

            var retTarget;
            ${h.popStack('retTarget')};

            ${h.applyClockCycles(5)};
            ${h.jumpTo('retTarget')};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'RET_NC' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 0) {

            var retTarget;
            ${h.popStack('retTarget')};

            ${h.applyClockCycles(5)};
            ${h.jumpTo('retTarget')};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'RET_C' : ( address, nextAddress, parameters, h ) => `

        if (${h.carry()} === 1) {

            var retTarget;
            ${h.popStack('retTarget')};

            ${h.applyClockCycles(5)};
            ${h.jumpTo('retTarget')};

        } else {

            ${h.applyClockCycles(2)};

        }

    `,

    'RET' : ( address, nextAddress, parameters, h ) => `

        var retTarget;
        ${h.popStack('retTarget')};

        ${h.applyClockCycles(4)};
        ${h.jumpTo('retTarget')};

    `,

    'RETI' : ( address, nextAddress, parameters, h ) => `

        ${h.delayInterruptSwitch(true, 0)};

        var retTarget;
        ${h.popStack('retTarget')};

        ${h.applyClockCycles(4)};
        ${h.jumpTo('retTarget')};

    `,

    'RST_u8' : ( address, nextAddress, parameters, h ) => `

        ${h.pushStack(nextAddress)};

        ${h.applyClockCycles(4)};
        ${h.jumpTo(parameters[0])};

    `,

    'ADC_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', h.readR8(parameters[1]))};
        var rAfterCarry = ${h.add8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(false)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '<', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '<', 'rAfter')};

        ${h.applyClockCycles(1)};

    `,

    'ADC_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', parameters[1])};
        var rAfterCarry = ${h.add8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(false)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '<', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '<', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'ADC_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', h.readMem8(h.readR16(parameters[1])))};
        var rAfterCarry = ${h.add8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(false)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '<', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '<', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'ADD_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', h.readR8(parameters[1]))};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        ${h.applyClockCycles(1)};

    `,

    'ADD_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', parameters[1])};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        ${h.applyClockCycles(2)};

    `,

    'ADD_r16_r16' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR16(parameters[0])};
        var rAfter = ${h.add16('rBefore', h.readR16(parameters[1]))};

        ${h.writeR16(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.half('rAfter', '<', 'rBefore', 0x0FFF)};
        ${h.carry('rAfter', '<', 'rBefore', 0xFFFF)};

        ${h.applyClockCycles(2)};

    `,

    'ADD_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.add8('rBefore', h.readMem8(h.readR16(parameters[1])))};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '<', 'rBefore')};
        ${h.carry('rAfter', '<', 'rBefore')};

        ${h.applyClockCycles(2)};

    `,

    'ADD_r16_i8' : ( address, nextAddress, parameters, h ) => `

        var rrBefore = ${h.readR16(parameters[0])};
        var rrAfter = ${h.add16('rrBefore', parameters[1])};

        ${h.writeR16(parameters[0], 'rrAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half('rrAfter', '<', 'rrBefore')};
        ${h.carry('rrAfter', '<', 'rrBefore')};

        ${h.applyClockCycles(4)};

    `,

    'SBC_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', h.readR8(parameters[1]))};
        var rAfterCarry = ${h.sub8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(true)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '>', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '>', 'rAfter')};

        ${h.applyClockCycles(1)};

    `,

    'SBC_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', parameters[1])};
        var rAfterCarry = ${h.sub8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(true)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '>', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '>', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'SBC_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', h.readMem8(h.readR16(parameters[1])))};
        var rAfterCarry = ${h.sub8('rAfter', h.carry())};

        ${h.writeR8(parameters[0], 'rAfterCarry')};

        ${h.bcd(true)};
        ${h.zero('rAfterCarry')};

        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        if (${h.half()} === 0)
            ${h.half('rAfterCarry', '>', 'rAfter')};

        if (${h.carry()} === 0)
            ${h.carry('rAfterCarry', '>', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'CP_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var tmp = ${h.readR8(parameters[0])};
        var cmp = ${h.sub8('tmp', h.readR8(parameters[1]))};

        ${h.bcd(true)};
        ${h.zero('cmp')};
        ${h.half('cmp', '>', 'tmp')};
        ${h.carry('cmp', '>', 'tmp')};

        ${h.applyClockCycles(1)};

    `,

    'CP_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var tmp = ${h.readR8(parameters[0])};
        var cmp = ${h.sub8('tmp', parameters[1])};

        ${h.bcd(true)};
        ${h.zero('cmp')};
        ${h.half('cmp', '>', 'tmp')};
        ${h.carry('cmp', '>', 'tmp')};

        ${h.applyClockCycles(2)};

    `,

    'CP_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var tmp = ${h.readR8(parameters[0])};
        var cmp = ${h.sub8('tmp', h.readMem8(h.readR16(parameters[1])))};

        ${h.bcd(true)};
        ${h.zero('cmp')};
        ${h.half('cmp', '>', 'tmp')};
        ${h.carry('cmp', '>', 'tmp')};

        ${h.applyClockCycles(2)};

    `,

    'SUB_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', h.readR8(parameters[1]))};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(true)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        ${h.applyClockCycles(1)};

    `,

    'SUB_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', parameters[1])};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(true)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        ${h.applyClockCycles(2)};

    `,

    'SUB_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ${h.sub8('rBefore', h.readMem8(h.readR16(parameters[1])))};

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(true)};
        ${h.zero('rAfter')};
        ${h.half('rAfter', '>', 'rBefore')};
        ${h.carry('rAfter', '>', 'rBefore')};

        ${h.applyClockCycles(2)};

    `,

    'AND_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} & ${h.readR8(parameters[1])};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(true)};
        ${h.carry(false)};

        ${h.applyClockCycles(1)};

    `,

    'AND_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} & ${parameters[1]};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(true)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'AND_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} & ${h.readMem8(h.readR16(parameters[1]))};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(true)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'OR_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} | ${h.readR8(parameters[1])};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(1)};

    `,

    'OR_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} | ${parameters[1]};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'OR_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} | ${h.readMem8(h.readR16(parameters[1]))};

        ${h.writeR8(parameters[0], 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'XOR_r8_r8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} ^ ${h.readR8(parameters[1])};

        ${h.writeR8('a', 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(1)};

    `,

    'XOR_r8_u8' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} ^ ${parameters[1]};

        ${h.writeR8('a', 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'XOR_r8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var value = ${h.readR8(parameters[0])} ^ ${h.readMem8(h.readR16(parameters[1]))};

        ${h.writeR8('a', 'value')};

        ${h.bcd(false)};
        ${h.zero('value')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'CPL_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rAfter = ( ~ rBefore ) & 0xFF;

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(true)};
        ${h.half(true)};

        ${h.applyClockCycles(1)};

    `,

    'RR_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rightMostBit = rBefore & 0x01;

        var rAfter = (rBefore >>> 1) | (${h.carry()} << 7);
        ${h.writeR8(parameters[0], 'rAfter')}

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RR_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var mBefore = ${h.readMem8('target')};
        var rightMostBit = mBefore & 0x01;
        var mAfter = (mBefore >>> 1) | (${h.carry()} << 7);

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RRC_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rightMostBit = rBefore & 0x01;
        var rAfter = (rBefore >>> 1) | (rightMostBit << 7);

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RRC_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var mBefore = ${h.readMem8('target')};
        var rightMostBit = mBefore & 0x01;
        var mAfter = (mBefore >>> 1) | (rightMostBit << 7);

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RRA' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8('a')};
        var rightMostBit = rBefore & 0x01;
        var rAfter = (rBefore >>> 1) | (${h.carry()} << 7);

        ${h.writeR8('a', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(1)};

    `,

    'RRCA' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8('a')};
        var rightMostBit = rBefore & 0x01;
        var rAfter = (rBefore >>> 1) | (rightMostBit << 7);

        ${h.writeR8('a', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(1)};

    `,

    'RL_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var leftMostBit = rBefore >>> 7;
        var rAfter = ((rBefore << 1) | ${h.carry()}) & 0xFF;

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RL_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var mBefore = ${h.readMem8('target')};
        var leftMostBit = mBefore >>> 7;
        var mAfter = ((mBefore << 1) | ${h.carry()}) & 0xFF;

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RLC_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var leftMostBit = rBefore >>> 7;
        var rAfter = ((rBefore << 1) | leftMostBit) & 0xFF;

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RLC_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var mBefore = ${h.readMem8('target')};
        var leftMostBit = mBefore >>> 7;
        var mAfter = ((mBefore << 1) | leftMostBit) & 0xFF;

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'RLA' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8('a')};
        var leftMostBit = rBefore >>> 7;
        var rAfter = ((rBefore << 1) | ${h.carry()}) & 0xFF;

        ${h.writeR8('a', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(1)};

    `,

    'RLCA' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8('a')};
        var leftMostBit = rBefore >>> 7;
        var rAfter = ((rBefore << 1) | leftMostBit) & 0xFF;

        ${h.writeR8('a', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero(false)};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(1)};

    `,

    'SLA_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var leftMostBit = rBefore >>> 7;
        var rAfter = (rBefore << 1) & 0xFF;

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'SLA_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var rBefore = ${h.readMem8('target')};
        var leftMostBit = rBefore >>> 7;
        var rAfter = (rBefore << 1) & 0xFF;

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (leftMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'SRA_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var leftMostBit = rBefore >>> 7;
        var rightMostBit = rBefore & 0x01;
        var rAfter = (rBefore >>> 1) | (leftMostBit << 7);

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'SRA_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var rBefore = ${h.readMem8('target')};
        var leftMostBit = rBefore >>> 7;
        var rightMostBit = rBefore & 0x01;
        var rAfter = (rBefore >>> 1) | (leftMostBit << 7);

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'SRL_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};
        var rightMostBit = rBefore & 0x01;
        var rAfter = rBefore >>> 1;

        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'SRL_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var rBefore = ${h.readMem8('target')};
        var rightMostBit = rBefore & 0x01;
        var rAfter = rBefore >> 1;

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};

        if (rightMostBit === 1) {
            ${h.carry(true)};
        } else {
            ${h.carry(false)};
        }

        ${h.applyClockCycles(2)};

    `,

    'BIT_u8_r8' : ( address, nextAddress, parameters, h ) => `

        var bit = ${h.readR8(parameters[1])} & (1 << ${parameters[0]});

        ${h.bcd(false)};
        ${h.zero('bit')};
        ${h.half(true)};

        ${h.applyClockCycles(2)};

    `,

    'BIT_u8_(r16)' : ( address, nextAddress, parameters, h ) => `

        ${h.applyClockCycles(1)};

        var bit = ${h.readMem8(h.readR16(parameters[1]))} & (1 << ${parameters[0]});

        ${h.bcd(false)};
        ${h.zero('bit')};
        ${h.half(true)};

        ${h.applyClockCycles(2)};

    `,

    'RES_u8_r8' : ( address, nextAddress, parameters, h ) => `

        var rAfter = ${h.readR8(parameters[1])} & ~(1 << ${parameters[0]});
        ${h.writeR8(parameters[1], 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'RES_u8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[1])};

        ${h.applyClockCycles(1)};

        var rAfter = ${h.readMem8('target')} & ~(1 << ${parameters[0]});

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'SET_u8_r8' : ( address, nextAddress, parameters, h ) => `

        var rAfter = ${h.readR8(parameters[1])} | (1 << ${parameters[0]});
        ${h.writeR8(parameters[1], 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'SET_u8_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[1])};

        ${h.applyClockCycles(1)};

        var rAfter = ${h.readMem8('target')} | (1 << ${parameters[0]});

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'rAfter')};

        ${h.applyClockCycles(2)};

    `,

    'SWAP_r8' : ( address, nextAddress, parameters, h ) => `

        var rBefore = ${h.readR8(parameters[0])};

        var rAfter = ((rBefore << 4) | (rBefore >>> 4)) & 0xFF;
        ${h.writeR8(parameters[0], 'rAfter')};

        ${h.bcd(false)};
        ${h.zero('rAfter')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'SWAP_(r16)' : ( address, nextAddress, parameters, h ) => `

        var target = ${h.readR16(parameters[0])};

        ${h.applyClockCycles(1)};

        var mBefore = ${h.readMem8('target')};
        var mAfter = ((mBefore << 4) | (mBefore >>> 4)) & 0xFF;

        ${h.applyClockCycles(1)};

        ${h.writeMem8('target', 'mAfter')};

        ${h.bcd(false)};
        ${h.zero('mAfter')};
        ${h.half(false)};
        ${h.carry(false)};

        ${h.applyClockCycles(2)};

    `,

    'STOP_u8' : ( address, nextAddress, parameters, h ) => `

        ${h.stop()};

        ${h.applySpeedSwitch()};

        ${h.applyClockCycles(1)};

    `,

    'HALT' : ( address, nextAddress, parameters, h ) => `

        ${h.halt()};

        ${h.applyClockCycles(1)};

    `

};
