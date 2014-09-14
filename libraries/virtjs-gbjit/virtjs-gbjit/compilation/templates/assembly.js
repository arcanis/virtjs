import { formatAddress, formatHexadecimal, formatRelativeAddress } from 'virtjs/utils/FormatUtils';

var label = address => { switch ( address ) {
    case 0xFF40 : return ' ; lcd control';
    case 0xFF41 : return ' ; lcd stat';
    case 0xFF42 : return ' ; scroll y';
    case 0xFF43 : return ' ; scroll x';
    case 0xFF45 : return ' ; lyc';
    case 0xFF47 : return ' ; background palette';
    case 0xFF48 : return ' ; obj palette 0';
    case 0xFF49 : return ' ; obj palette 1';
    case 0xFF41 : return ' ; window y'
    case 0xFFFF : return ' ; interrupt enable';
    default     : return '';
} };

export var templates = {

    'NOP'          : ( address, nextAddress, parameters ) => `nop`,

    'STOP_u8'      : ( address, nextAddress, parameters ) => `stop`,
    'HALT'         : ( address, nextAddress, parameters ) => `halt`,

    'DI'           : ( address, nextAddress, parameters ) => `di`,
    'EI'           : ( address, nextAddress, parameters ) => `ei`,

    'PUSH_r16'     : ( address, nextAddress, parameters ) => `push ${parameters[0]}`,
    'POP_r16'      : ( address, nextAddress, parameters ) => `pop ${parameters[0]}`,
    'POP_AF'       : ( address, nextAddress, parameters ) => `pop af`,

    'CCF'          : ( address, nextAddress, parameters ) => `ccf`,
    'SCF'          : ( address, nextAddress, parameters ) => `scf`,

    'DAA'          : ( address, nextAddress, parameters ) => `daa`,

    'INC_r8'       : ( address, nextAddress, parameters ) => `inc ${parameters[0]}`,
    'INC_r16'      : ( address, nextAddress, parameters ) => `inc ${parameters[0]}`,
    'INC_(r16)'    : ( address, nextAddress, parameters ) => `inc [${parameters[0]}]`,

    'DEC_r8'       : ( address, nextAddress, parameters ) => `dec ${parameters[0]}`,
    'DEC_r16'      : ( address, nextAddress, parameters ) => `dec ${parameters[0]}`,
    'DEC_(r16)'    : ( address, nextAddress, parameters ) => `dec [${parameters[0]}]`,

    'JR_NZ_i8'     : ( address, nextAddress, parameters ) => `jr nz ${formatAddress(nextAddress + parameters[0], 16)}`,
    'JR_Z_i8'      : ( address, nextAddress, parameters ) => `jr z ${formatAddress(nextAddress + parameters[0], 16)}`,
    'JR_NC_i8'     : ( address, nextAddress, parameters ) => `jr nc ${formatAddress(nextAddress + parameters[0], 16)}`,
    'JR_C_i8'      : ( address, nextAddress, parameters ) => `jr c ${formatAddress(nextAddress + parameters[0], 16)}`,
    'JR_i8'        : ( address, nextAddress, parameters ) => `jr ${formatAddress(nextAddress + parameters[0], 16)}`,

    'JP_NZ_u16'    : ( address, nextAddress, parameters ) => `jp nz ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'JP_Z_u16'     : ( address, nextAddress, parameters ) => `jp z ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'JP_NC_u16'    : ( address, nextAddress, parameters ) => `jp nc ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'JP_C_u16'     : ( address, nextAddress, parameters ) => `jp c ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'JP_u16'       : ( address, nextAddress, parameters ) => `jp ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'JP_r16'       : ( address, nextAddress, parameters ) => `jp ${parameters[0]}`,

    'CALL_NZ_u16'  : ( address, nextAddress, parameters ) => `call nz ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'CALL_Z_u16'   : ( address, nextAddress, parameters ) => `call z ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'CALL_NC_u16'  : ( address, nextAddress, parameters ) => `call nc ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'CALL_C_u16'   : ( address, nextAddress, parameters ) => `call c ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,
    'CALL_u16'     : ( address, nextAddress, parameters ) => `call ${formatAddress(parameters[0], 16)}${label(parameters[0])}`,

    'RET_NZ'       : ( address, nextAddress, parameters ) => `ret nz`,
    'RET_Z'        : ( address, nextAddress, parameters ) => `ret z`,
    'RET_NC'       : ( address, nextAddress, parameters ) => `ret nc`,
    'RET_C'        : ( address, nextAddress, parameters ) => `ret c`,
    'RET'          : ( address, nextAddress, parameters ) => `ret`,
    'RETI'         : ( address, nextAddress, parameters ) => `reti`,

    'RST_u8'       : ( address, nextAddress, parameters ) => `rst ${formatAddress(parameters[0], 16)}`,

    'ADC_r8_r8'    : ( address, nextAddress, parameters ) => `adc ${parameters[0]}, ${parameters[1]}`,
    'ADC_r8_u8'    : ( address, nextAddress, parameters ) => `adc ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'ADC_r8_(r16)' : ( address, nextAddress, parameters ) => `adc ${parameters[0]}, [${parameters[1]}]`,

    'ADD_r8_r8'    : ( address, nextAddress, parameters ) => `add ${parameters[0]}, ${parameters[1]}`,
    'ADD_r8_u8'    : ( address, nextAddress, parameters ) => `add ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'ADD_r8_(r16)' : ( address, nextAddress, parameters ) => `add ${parameters[0]}, [${parameters[1]}]`,
    'ADD_r16_i8'   : ( address, nextAddress, parameters ) => `add ${parameters[0]}, ${parameters[1]}`,
    'ADD_r16_r16'  : ( address, nextAddress, parameters ) => `add ${parameters[0]}, ${parameters[1]}`,

    'SBC_r8_r8'    : ( address, nextAddress, parameters ) => `sbc ${parameters[0]}, ${parameters[1]}`,
    'SBC_r8_u8'    : ( address, nextAddress, parameters ) => `sbc ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'SBC_r8_(r16)' : ( address, nextAddress, parameters ) => `sbc ${parameters[0]}, [${parameters[1]}]`,

    'SUB_r8_r8'    : ( address, nextAddress, parameters ) => `sub ${parameters[0]}, ${parameters[1]}`,
    'SUB_r8_u8'    : ( address, nextAddress, parameters ) => `sub ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'SUB_r8_(r16)' : ( address, nextAddress, parameters ) => `sub ${parameters[0]}, [${parameters[1]}]`,

    'CP_r8_r8'     : ( address, nextAddress, parameters ) => `cp ${parameters[0]}, ${parameters[1]}`,
    'CP_r8_u8'     : ( address, nextAddress, parameters ) => `cp ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'CP_r8_(r16)'  : ( address, nextAddress, parameters ) => `cp ${parameters[0]}, [${parameters[1]}]`,

    'AND_r8_r8'    : ( address, nextAddress, parameters ) => `and ${parameters[0]}, ${parameters[1]}`,
    'AND_r8_u8'    : ( address, nextAddress, parameters ) => `and ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'AND_r8_(r16)' : ( address, nextAddress, parameters ) => `and ${parameters[0]}, [${parameters[1]}]`,

    'OR_r8_r8'     : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, ${parameters[1]}`,
    'OR_r8_u8'     : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'OR_r8_(r16)'  : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, [${parameters[1]}]`,

    'XOR_r8_r8'    : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, ${parameters[1]}`,
    'XOR_r8_u8'    : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'XOR_r8_(r16)' : ( address, nextAddress, parameters ) => `xor ${parameters[0]}, [${parameters[1]}]`,

    'CPL_r8'       : ( address, nextAddress, parameters ) => `cpl ${parameters[0]}`,

    'RR_r8'        : ( address, nextAddress, parameters ) => `rr ${parameters[0]}`,
    'RR_(r16)'     : ( address, nextAddress, parameters ) => `rr [${parameters[0]}]`,

    'RRC_r8'       : ( address, nextAddress, parameters ) => `rrc ${parameters[0]}`,
    'RRC_(r16)'    : ( address, nextAddress, parameters ) => `rrc [${parameters[0]}]`,

    'RRA'          : ( address, nextAddress, parameters ) => `rra`,
    'RRCA'         : ( address, nextAddress, parameters ) => `rrca`,

    'RL_r8'        : ( address, nextAddress, parameters ) => `rl ${parameters[0]}`,
    'RL_(r16)'     : ( address, nextAddress, parameters ) => `rl [${parameters[0]}]`,

    'RLC_r8'       : ( address, nextAddress, parameters ) => `rlc ${parameters[0]}`,
    'RLC_(r16)'    : ( address, nextAddress, parameters ) => `rlc [${parameters[0]}]`,

    'RLA'          : ( address, nextAddress, parameters ) => `rla`,
    'RLCA'         : ( address, nextAddress, parameters ) => `rlca`,

    'SLA_r8'       : ( address, nextAddress, parameters ) => `sla ${parameters[0]}`,
    'SLA_(r16)'    : ( address, nextAddress, parameters ) => `sla [${parameters[0]}]`,

    'SRA_r8'       : ( address, nextAddress, parameters ) => `sra ${parameters[0]}`,
    'SRA_(r16)'    : ( address, nextAddress, parameters ) => `sra [${parameters[0]}]`,

    'SRL_r8'       : ( address, nextAddress, parameters ) => `srl ${parameters[0]}`,
    'SRL_(r16)'    : ( address, nextAddress, parameters ) => `srl [${parameters[0]}]`,

    'BIT_u8_r8'    : ( address, nextAddress, parameters ) => `bit ${parameters[0]} ${parameters[1]}`,
    'BIT_u8_(r16)' : ( address, nextAddress, parameters ) => `bit ${parameters[0]} [${parameters[1]}]`,

    'RES_u8_r8'    : ( address, nextAddress, parameters ) => `res ${parameters[0]} ${parameters[1]}`,
    'RES_u8_(r16)' : ( address, nextAddress, parameters ) => `res ${parameters[0]} [${parameters[1]}]`,

    'SET_u8_r8'    : ( address, nextAddress, parameters ) => `set ${parameters[0]} ${parameters[1]}`,
    'SET_u8_(r16)' : ( address, nextAddress, parameters ) => `set ${parameters[0]} [${parameters[1]}]`,

    'SWAP_r8'      : ( address, nextAddress, parameters ) => `swap ${parameters[0]}`,
    'SWAP_(r16)'   : ( address, nextAddress, parameters ) => `swap [${parameters[0]}]`,

    'LD_r16_r16'   : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, ${parameters[1]}`,
    'LD_r16_u16'   : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, ${formatHexadecimal(parameters[1], 16)}`,
    'LD_r8_r8'     : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, ${parameters[1]}`,
    'LD_r8_u8'     : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, ${formatHexadecimal(parameters[1], 8)}`,
    'LD_(u16)_r8'  : ( address, nextAddress, parameters ) => `ld [${formatAddress(parameters[0], 16)}], ${parameters[1]}${label(parameters[0])}`,
    'LD_(u16)_r16' : ( address, nextAddress, parameters ) => `ld [${formatAddress(parameters[0], 16)}], ${parameters[1]}${label(parameters[0])}`,
    'LD_(r16)_u8'  : ( address, nextAddress, parameters ) => `ld [${parameters[0]}], ${formatHexadecimal(parameters[1], 8)}`,
    'LD_(r16)_r8'  : ( address, nextAddress, parameters ) => `ld [${parameters[0]}], ${parameters[1]}`,
    'LD_r8_(u16)'  : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${formatAddress(parameters[1], 16)}]${label(parameters[1])}`,
    'LD_r8_(r16)'  : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${parameters[1]}]`,
    'LD_r8_(r8)'   : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${parameters[1]}]`,
    'LD_(r8)_r8'   : ( address, nextAddress, parameters ) => `ld [${parameters[0]}], ${parameters[1]}`,

    'LDH_r8_(u8)'  : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${formatRelativeAddress(0xFF00, parameters[1], 16, 8)}]${label(0xFF00 + parameters[1])}`,
    'LDH_(u8)_r8'  : ( address, nextAddress, parameters ) => `ld [${formatRelativeAddress(0xFF00, parameters[0], 16, 8)}], ${parameters[1]}${label(0xFF00 + parameters[0])}`,

    'LDHL_r16_i8'  : ( address, nextAddress, parameters ) => `ld hl, [${formatAddress(parameters[0], parameters[1], null, 8)}]`,

    'LDI_(r16)_r8' : ( address, nextAddress, parameters ) => `ld [${parameters[0]}+], ${parameters[1]}`,
    'LDI_r8_(r16)' : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${parameters[1]}+]`,

    'LDD_(r16)_r8' : ( address, nextAddress, parameters ) => `ld [${parameters[0]}-], ${parameters[1]}`,
    'LDD_r8_(r16)' : ( address, nextAddress, parameters ) => `ld ${parameters[0]}, [${parameters[1]}-]`,

};
