var opcodes = [
	           /*   x0   */  /*   x1   */  /*   x2   */  /*   x3   */  /*   x4   */  /*   x5   */  /*   x6   */  /*   x7   */  /*   x8   */          /*   x9   */  /*   xA   */  /*   xB   */  /*   xC   */  /*   xD   */  /*   xE   */  /*   xF   */
	/* 0x */  'NOP',        'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 0x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 1x */  'STOP n',     'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 1x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 2x */  'JR NZ n',    'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 2x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 3x */  'JR NC n',    'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 3x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 4x */  'LD r:b r:b', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 4x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 5x */  'LD r:d r:b', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 5x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 6x */  'LD r:h r:b', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 6x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 7x */  'LDHL r:b',   'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 7x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 8x */  'ADD r:a r:b', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 8x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* 9x */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* 9x */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Ax */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Ax */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Bx */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Bx */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Cx */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Cx */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Dx */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Dx */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Ex */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Ex */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
	/* Fx */  'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', /* Fx */ 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn', 'CALL_NC_nn',
];

export class Disassembler {

	disassembleAt( address ) {



	}

}