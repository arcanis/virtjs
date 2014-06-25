export class Compiler {

    compileFrom( base, limit ) {

        var header = '';
        var code   = [ ];
        var footer = '';

        // Helpers

        var HL = 'hl', SP = 'sp', PC = 'pc';

        var A = 'a', F = 'f', AF = 'af';
        var B = 'b', C = 'c', BC = 'bc';
        var D = 'd', E = 'd', DE = 'de';

        var add8       = ( a, b )            => `(((${a}) + (${b})) & 0x00FF)`;
        var add16      = ( a, b )            => `(((${a}) + (${b})) & 0xFFFF)`;

        var sub8       = ( a, b )            => `(((${a}) - (${b})) & 0x00FF)`;
        var sub16      = ( a, b )            => `(((${a}) - (${b})) & 0xFFFF)`;

        var readInt8   = ( address )         => `(env.readInt8(${address}) | 0)`;
        var readUint8  = ( address )         => `((${readInt8(address)}) >>> 0)`;
        var writeUint8 = ( address, value )  => `env.writeUint8()`;

        var readR16    = ( register )        => `(((${register[0]}) << 8 ) | (${register[1]}))`;
        var writeR16   = ( register, value ) => `${register[0]} = (${value}) >> 8; ${register[1]} = (${value}) & 0x0F;`;

        var push       = ( value )           => `sp = sp - 2; env.writeUint16(sp, ${value});`;
        var pop        = ( target, value )   => `${target} = env.readUint16(sp); sp = sp + 2;`;

        var release    = ( )                 => `${footer}; return pc;`;
        var jumpTo     = ( address )         => `${footer}; return ${address};`;

        // Header

        for ( let register of [ 'bcd', 'zero', 'half', 'carry' ] ) {
            header += `var ${register} = env.${register} >>> 0;`;
            footer += `env.${register} = ${register};`;
        }

        for ( let register of [ 'b', 'c', 'd', 'e' ] ) {
            header += `var ${register} = env.${register}[0] >>> 0;`;
            footer += `env.${register}[0] = ${register};`;
        }

        for ( let register of [ 'af', 'bc', 'hl' ] ) {
            header += `var ${register} = env.${register}[0] >>> 0;`;
            footer += `env.${register}[0] = ${register};`;
        }

        // Body

        for ( var offset = 0; ! isFinal && offset < limit; ) {

            var [ address, instruction ] = eatInstruction( );

            switch ( instruction[0] ) {

                case 'ADC_r_n' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], instruction[2])};
                    var rAfter        = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], carry)};
                    var rAfterCarry   = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADC_r_r' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], instruction[2])};
                    var rAfter        = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], carry)};
                    var rAfterCarry   = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADC_r_rrm' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], readUint8(instruction[2]))};
                    var rAfter        = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], carry)};
                    var rAfterCarry   = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADD_r_n' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], instruction[2])};
                    var rAfter        = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADD_r_r' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], instruction[2])};
                    var rAfter        = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADD_r_rrm' : code.push( `

                    var rBefore       = ${instruction[1]};
                    ${instruction[1]} = ${add8(instruction[1], readUint8(instruction[2]))};
                    var rAfter        = ${instruction[1]};

                    bcd   = 0;
                    zero  = (rAfterCarry === 0) | 0;
                    half  = ((rAfter & 0x0F) < (rBefore & 0x0F) || (rAfterCarry & 0x0F) < (rAfter & 0x0F)) | 0;
                    carry = (rAfter < rBefore || rAfterCarry < rAfter) | 0;

                ` ); break ;

                case 'ADD_rr_rr' : code.push( `

                    var rrBefore      = ${readR16(instruction[1]};
                    ${instruction[1]} = ${add16(readR16(instruction[1]), readR16(instruction[2]))};
                    var rrAfter       = ${readR16(instruction[1])};

                    bcd   = 0;
                    zero  = (rrAfterCarry === 0) | 0;
                    half  = ((rrAfter & 0x0FFF) < (rrBefore & 0x0FFF) || (rrAfterCarry & 0x0FFF) < (rrAfter & 0x0FFF)) | 0;
                    carry = (rrAfter < rBefore || rrAfterCarry < rrAfter) | 0;

                ` ); break ;

                case 'ADD_rr_sn' : code.push( `

                    var rrBefore      = ${readR16(instruction[1])};
                    ${instruction[1]} = ${add8(readR16(instruction[1]), instruction[2])};
                    var rrAfter       = ${readR16(instruction[1])};

                    bcd   = 0;
                    zero  = 0;
                    half  = ((rrAfter & 0x000F) < (rrBefore & 0x000F) || (rrAfterCarry & 0x000F) < (rrAfter & 0x000F)) | 0;
                    carry = ((rrAfter & 0x00FF) < (rrBefore & 0x00FF) || (rrAfterCarry & 0x00FF) < (rrAfter & 0x00FF)) | 0;

                ` ); break ;

                case 'AND_n' : code.push( `

                    a = a & ${instruction[1]};

                    bcd   = 0;
                    zero  = (a === 0) | 0;
                    half  = 1;
                    carry = 0;

                ` ); break ;

                case 'AND_r' : code.push( `

                    a = a & ${instruction[1]};

                    bcd   = 0;
                    zero  = (a === 0) | 0;
                    half  = 1;
                    carry = 0;

                ` ); break ;

                case 'AND_rrm' : code.push( `

                    a = a & ${readUint8(instruction[1])};

                    bcd   = 0;
                    zero  = (a === 0) | 0;
                    half  = 1;
                    carry = 0;

                ` ); break ;

                case 'CALL_C_nn' : code.push( `

                    if (carry === 1) {
                        ${stack(pc)};
                        ${jumpTo(instruction[1])};
                    }

                ` ); break ;

                case 'CALL_NC_nn' : code.push( `

                    if (carry === 0) {
                        ${stack(pc)};
                        ${jumpTo(instruction[1])};
                    }

                ` ); break ;

                case 'CALL_Z_nn' : code.push( `

                    if (zero === 1) {
                        ${stack(pc)};
                        ${jumpTo(instruction[1])};
                    }

                ` ); break ;

                case 'CALL_NZ_nn' : code.push( `

                    if ( zero === 0 ) {
                        ${stack(pc)};
                        ${jumpTo(instruction[1])};
                    }

                ` ); break ;

                case 'CALL_nn' : code.push( `

                    ${stack(pc)};
                    ${jumpTo(instruction[1])};

                ` ); break ;

                case 'CCF' : code.push( `

                    bcd   = 0;
                    half  = 0;
                    carry = ~ carry;

                ` ); break ;

                case 'CPL' : code.push( `

                    a = ~ a;

                    bcd  = 1;
                    half = 1;

                ` ); break ;

                case 'CP_n' : code.push( `

                    var cmp = ${sub8(A, instruction[1])};

                    bcd   = 1;
                    zero  = (cmp === 0) | 0;
                    half  = ((cmp & 0x0F) > (a & 0x0F)) | 0;
                    carry = (cmp > a) | 0;

                ` ); break ;

                case 'CP_r' : code.push( `

                    var cmp = ${sub8(A, instruction[1])};

                    bcd   = 1;
                    zero  = (cmp === 0) | 0;
                    half  = ((cmp & 0x0F) > (a & 0x0F)) | 0;
                    carry = (cmp > a) | 0;

                ` ); break ;

                case 'CP_r' : code.push( `

                    var cmp = ${sub8(A, readUint8(instruction[1]))};

                    bcd   = 1;
                    zero  = (cmp === 0) | 0;
                    half  = ((cmp & 0x0F) > (a & 0x0F)) | 0;
                    carry = (cmp > a) | 0;

                ` ); break ;

                case 'DAA' : code.push( `

                    var correction = 0;

                    if (half)
                        correction = correction | 0x06;
                    if (carry)
                        correction = correction | 0x60;

                    if (bcd) {
                        a = ${sub8(A, 'correction')};
                    } else {
                        if ((a & 0x0F) > 0x09)
                            correction |= 0x06;
                        if ((a & 0xF0) > 0x99)
                            correction |= 0x60;
                        a = ${add8(A, 'correction')};
                    }

                    zero  = (a === 0) | 0;
                    half  = 0;
                    carry = ((correction & 0x60) === 0x60) | 0;

                ` ); break ;

                case 'DEC_r' : code.push( `

                    var rBefore = ${instruction[1]};
                    ${instruction[1]} = ${sub8(instruction[1], 1)};
                    var rAfter = ${instruction[1]};

                    bcd  = 1;
                    zero = (rAfter === 0) | 0;
                    half = ((rAfter & 0x0F) === 0x0F) | 0;

                ` ); break ;

                case 'DEC_rr' : code.push( `

                    var tmp = ${sub16(readR16(instruction[1]), 1)}
                    ${writeR16(instruction[1], 'tmp')};

                    bcd  = 1;
                    zero = (rAfter === 0) | 0;
                    half = ((rAfter & 0x0F) === 0x0F) | 0;

                ` ); break ;

            }

        }

    }

};
