define( [

    'virt.js/virt/Format'

], function ( Format ) {

    var InstructionSet = function ( cpu ) {

        this._cpu = cpu;

    };

    InstructionSet.prototype._rsv = function ( ) {

        return ; // Not sure ... why do we have to save registers ?

        Z80._rsv.a = Z80._r.a; Z80._rsv.b = Z80._r.b;
        Z80._rsv.c = Z80._r.c; Z80._rsv.d = Z80._r.d;
        Z80._rsv.e = Z80._r.e; Z80._rsv.f = Z80._r.f;
        Z80._rsv.h = Z80._r.h; Z80._rsv.l = Z80._r.l;

    };

    InstructionSet.prototype._rrs = function ( ) {

        return ; // Not sure ... why do we have to restore registers ?

        Z80._r.a = Z80._rsv.a; Z80._r.b = Z80._rsv.b;
        Z80._r.c = Z80._rsv.c; Z80._r.d = Z80._rsv.d;
        Z80._r.e = Z80._rsv.e; Z80._r.f = Z80._rsv.f;
        Z80._r.h = Z80._rsv.h; Z80._r.l = Z80._rsv.l;

    };

    InstructionSet.prototype.MAPcb = function ( ) {

        var opcode = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        var command = this._cpu._instructionMap.cb[ opcode ];
        var instruction = command && command.instruction;

        command( );

    },

    InstructionSet.prototype.LDrr_bb = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._b[ 0 ];


        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_bc = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_bd = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_be = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_bh = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_bl = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ba = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_cb = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_cc = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_cd = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ce = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ch = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_cl = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ca = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_db = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_dc = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_dd = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_de = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_dh = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_dl = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_da = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_eb = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ec = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ed = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ee = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_eh = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_el = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ea = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_hb = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_hc = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_hd = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_he = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_hh = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_hl = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ha = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_lb = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_lc = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ld = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_le = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_lh = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ll = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_la = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ab = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._b[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ac = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._c[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ad = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._d[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ae = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._e[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_ah = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._h[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_al = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrr_aa = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._a[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.LDrHLm_b = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_c = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_d = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_e = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_h = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_l = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrHLm_a = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_b = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._b[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_c = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._c[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_d = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._d[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_e = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._e[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_h = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._h[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_l = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmr_a = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_b = function ( ) {

        this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_c = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_d = function ( ) {

        this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_e = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_h = function ( ) {

        this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_l = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDrn_a = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLmn = function ( ) {

        var value = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], value );

        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDBCmA = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDDEmA = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ], this._cpu._a[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDmmA = function ( ) {

        this._cpu._engine._mmu.writeUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.LDABCm = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDADEm = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDAmm = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ) );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.LDBCnn = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDDEnn = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDHLnn = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDSPnn = function ( ) {

        this._cpu._sp[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDHLmm = function ( ) {

        var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 2;
        this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( i );
        this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( i + 1 );

        this._cpu._m[ 0 ] = 5;

    };

    InstructionSet.prototype.LDmmHL = function ( ) {

        var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 2;
        this._cpu._engine._mmu.writeUint16( i, ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 5;

    };

    InstructionSet.prototype.LDHLIA = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

        if ( !this._cpu._l[ 0 ] )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDAHLI = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

        if ( !this._cpu._l[ 0 ] )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLDA = function ( ) {

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

        if ( this._cpu._l[ 0 ] === 0xFF )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDAHLD = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

        if ( this._cpu._l[ 0 ] === 0xFF )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDAIOn = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ) );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDIOnA = function ( ) {

        this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.LDAIOC = function ( ) {

        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._c[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDIOCA = function ( ) {

        this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.LDHLSPn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        i += this._cpu._sp[ 0 ];

        this._cpu._h[ 0 ] = i >> 8;
        this._cpu._l[ 0 ] = i;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.SWAPr_b = function ( ) {

        var tr = this._cpu._b[ 0 ];

        this._cpu._b[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_c = function ( ) {

        var tr = this._cpu._c[ 0 ];

        this._cpu._c[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_d = function ( ) {

        var tr = this._cpu._d[ 0 ];

        this._cpu._d[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_e = function ( ) {

        var tr = this._cpu._e[ 0 ];

        this._cpu._e[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_h = function ( ) {

        var tr = this._cpu._h[ 0 ];

        this._cpu._h[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_l = function ( ) {

        var tr = this._cpu._l[ 0 ];

        this._cpu._l[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SWAPr_a = function ( ) {

        var tr = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_b = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._b[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_c = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._c[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_d = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._d[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_e = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._e[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_h = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._h[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_l = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._l[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDr_a = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._a[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADDHL = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._a[ 0 ] += m;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ADDn = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

        this._cpu._a[ 0 ] += m;
        this._cpu._pc[ 0 ] += 1;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ADDHLBC = function ( ) {

        var hl = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];
        hl += ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ];

        if ( hl > 0xFFFF ) {
            this._cpu._f[ 0 ] |= 0x10;
        } else {
            this._cpu._f[ 0 ] &= 0xEF;
        }

        this._cpu._h[ 0 ] = hl >> 8;
        this._cpu._l[ 0 ] = hl;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.ADDHLDE = function ( ) {

        var hl = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];
        hl += ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ];

        if ( hl > 0xFFFF ) {
            this._cpu._f[ 0 ] |= 0x10;
        } else {
            this._cpu._f[ 0 ] &= 0xEF;
        }

        this._cpu._h[ 0 ] = hl >> 8;
        this._cpu._l[ 0 ] = hl;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.ADDHLHL = function ( ) {

        var hl = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];
        hl += ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];

        if ( hl > 0xFFFF ) {
            this._cpu._f[ 0 ] |= 0x10;
        } else {
            this._cpu._f[ 0 ] &= 0xEF;
        }

        this._cpu._h[ 0 ] = hl >> 8;
        this._cpu._l[ 0 ] = hl;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.ADDHLSP = function ( ) {

        var hl = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];
        hl += this._cpu._sp[ 0 ];

        if ( hl > 0xFFFF ) {
            this._cpu._f[ 0 ] |= 0x10;
        } else {
            this._cpu._f[ 0 ] &= 0xEF;
        }

        this._cpu._h[ 0 ] = hl >> 8;
        this._cpu._l[ 0 ] = hl;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.ADDSPn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._pc[ 0 ] += 1;
        this._cpu._sp[ 0 ] += i;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.ADCr_b = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._b[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_c = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._c[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_d = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._d[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_e = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._e[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_h = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._h[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_l = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._l[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCr_a = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] += this._cpu._a[ 0 ];
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ADCHL = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._a[ 0 ] += m;
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ADCn = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

        this._cpu._a[ 0 ] += m;
        this._cpu._pc[ 0 ] += 1;
        this._cpu._a[ 0 ] += ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] > 0xFF ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SUBr_b = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._b[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_c = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._c[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_d = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._d[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_e = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._e[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_h = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._h[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_l = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._l[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBr_a = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._a[ 0 ];
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SUBHL = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._a[ 0 ] -= m;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SUBn = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

        this._cpu._a[ 0 ] -= m;
        this._cpu._pc[ 0 ] += 1;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SBCr_b = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._b[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_c = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._c[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_d = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._d[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_e = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._e[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_h = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._h[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_l = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._l[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCr_a = function ( ) {

        var a = this._cpu._a[ 0 ];

        this._cpu._a[ 0 ] -= this._cpu._a[ 0 ];
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SBCHL = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._a[ 0 ] -= m;
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SBCn = function ( ) {

        var a = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

        this._cpu._a[ 0 ] -= m;
        this._cpu._pc[ 0 ] += 1;
        this._cpu._a[ 0 ] -= ( this._cpu._f[ 0 ] & 0x10 ) ? 1 : 0;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x50 : 0x40;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.CPr_b = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._b[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_c = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._c[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_d = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._d[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_e = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._e[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_h = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._h[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_l = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._l[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPr_a = function ( ) {

        var i = this._cpu._a[ 0 ];
        i -= this._cpu._a[ 0 ];

        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ i ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.CPHL = function ( ) {

        var i = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        i -= m;
        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ i ^ m ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.CPn = function ( ) {

        var i = this._cpu._a[ 0 ];
        var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        i -= m;
        this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
        i &= 0xFF;

        if ( !i )
            this._cpu._f[ 0 ] |= 0x80;

        if ( ( this._cpu._a[ 0 ] ^ i ^ m ) & 0x10 )
            this._cpu._f[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.DAA = function ( ) {

        var a = this._cpu._a[ 0 ];

        if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( ( this._cpu._a[ 0 ] & 15 ) > 9 ) )
            this._cpu._a[ 0 ] += 6;

        if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( a > 0x99 ) ) {

            this._cpu._a[ 0 ] += 0x60;
            this._cpu._f[ 0 ] |= 0x10;

        }

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_b = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._b[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_c = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._c[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_d = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._d[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_e = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._e[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_h = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._h[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_l = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._l[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDr_a = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._a[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ANDHL = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ANDn = function ( ) {

        this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ORr_b = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._b[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_c = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._c[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_d = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._d[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_e = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._e[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_h = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._h[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_l = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._l[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORr_a = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._a[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.ORHL = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.ORn = function ( ) {

        this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.XORr_b = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._b[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_c = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._c[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_d = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._d[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_e = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._e[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_h = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._h[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_l = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._l[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORr_a = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._a[ 0 ];

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.XORHL = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.XORn = function ( ) {

        this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.INCr_b = function ( ) {

        this._cpu._b[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_c = function ( ) {

        this._cpu._c[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_d = function ( ) {

        this._cpu._d[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_e = function ( ) {

        this._cpu._e[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_h = function ( ) {

        this._cpu._h[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_l = function ( ) {

        this._cpu._l[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCr_a = function ( ) {

        this._cpu._a[ 0 ] += 1;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCHLm = function ( ) {

        var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) + 1 ) & 0xFF;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._f[ 0 ] = i ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.DECr_b = function ( ) {

        this._cpu._b[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_c = function ( ) {

        this._cpu._c[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_d = function ( ) {

        this._cpu._d[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_e = function ( ) {

        this._cpu._e[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_h = function ( ) {

        this._cpu._h[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_l = function ( ) {

        this._cpu._l[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECr_a = function ( ) {

        this._cpu._a[ 0 ] -= 1;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECHLm = function ( ) {

        var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) - 1 ) & 0xFF;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._f[ 0 ] = i ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.INCBC = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._c[ 0 ] + 1;

        if ( !this._cpu._c[ 0 ] )
            this._cpu._b[ 0 ] = this._cpu._b[ 0 ] + 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCDE = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._e[ 0 ] + 1;

        if ( !this._cpu._e[ 0 ] )
            this._cpu._d[ 0 ] = this._cpu._d[ 0 ] + 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCHL = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

        if ( !this._cpu._l[ 0 ] )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.INCSP = function ( ) {

        this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] + 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECBC = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._c[ 0 ] - 1;

        if ( this._cpu._c[ 0 ] === 0xFF )
            this._cpu._b[ 0 ] = this._cpu._b[ 0 ] - 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECDE = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._e[ 0 ] - 1;

        if ( this._cpu._e[ 0 ] === 0xFF )
            this._cpu._d[ 0 ] = this._cpu._d[ 0 ] - 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECHL = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

        if ( this._cpu._l[ 0 ] === 0xFF )
            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DECSP = function ( ) {

        this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] - 1;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.BIT0b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT0m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x01 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES0b = function ( ) {

        this._cpu._b[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0c = function ( ) {

        this._cpu._c[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0d = function ( ) {

        this._cpu._d[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0e = function ( ) {

        this._cpu._e[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0h = function ( ) {

        this._cpu._h[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0l = function ( ) {

        this._cpu._l[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0a = function ( ) {

        this._cpu._a[ 0 ] &= 0xFE;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES0m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFE;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET0b = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0c = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0d = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0e = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0h = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0l = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0a = function ( ) {

        this._cpu._b[ 0 ] |= 0x01;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET0m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x01;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT1b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT1m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x02 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES1b = function ( ) {

        this._cpu._b[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1c = function ( ) {

        this._cpu._c[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1d = function ( ) {

        this._cpu._d[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1e = function ( ) {

        this._cpu._e[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1h = function ( ) {

        this._cpu._h[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1l = function ( ) {

        this._cpu._l[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1a = function ( ) {

        this._cpu._a[ 0 ] &= 0xFD;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES1m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFD;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET1b = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1c = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1d = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1e = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1h = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1l = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1a = function ( ) {

        this._cpu._b[ 0 ] |= 0x02;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET1m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x02;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT2b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT2m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x04 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES2b = function ( ) {

        this._cpu._b[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2c = function ( ) {

        this._cpu._c[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2d = function ( ) {

        this._cpu._d[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2e = function ( ) {

        this._cpu._e[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2h = function ( ) {

        this._cpu._h[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2l = function ( ) {

        this._cpu._l[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2a = function ( ) {

        this._cpu._a[ 0 ] &= 0xFB;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES2m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFB;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET2b = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2c = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2d = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2e = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2h = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2l = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2a = function ( ) {

        this._cpu._b[ 0 ] |= 0x04;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET2m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x04;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT3b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT3m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x08 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES3b = function ( ) {

        this._cpu._b[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3c = function ( ) {

        this._cpu._c[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3d = function ( ) {

        this._cpu._d[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3e = function ( ) {

        this._cpu._e[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3h = function ( ) {

        this._cpu._h[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3l = function ( ) {

        this._cpu._l[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3a = function ( ) {

        this._cpu._a[ 0 ] &= 0xF7;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES3m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xF7;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET3b = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3c = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3d = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3e = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3h = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3l = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3a = function ( ) {

        this._cpu._b[ 0 ] |= 0x08;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET3m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x08;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT4b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT4m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x10 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES4b = function ( ) {

        this._cpu._b[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4c = function ( ) {

        this._cpu._c[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4d = function ( ) {

        this._cpu._d[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4e = function ( ) {

        this._cpu._e[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4h = function ( ) {

        this._cpu._h[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4l = function ( ) {

        this._cpu._l[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4a = function ( ) {

        this._cpu._a[ 0 ] &= 0xEF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES4m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xEF;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET4b = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4c = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4d = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4e = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4h = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4l = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4a = function ( ) {

        this._cpu._b[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET4m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x10;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT5b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT5m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x20 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES5b = function ( ) {

        this._cpu._b[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5c = function ( ) {

        this._cpu._c[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5d = function ( ) {

        this._cpu._d[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5e = function ( ) {

        this._cpu._e[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5h = function ( ) {

        this._cpu._h[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5l = function ( ) {

        this._cpu._l[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5a = function ( ) {

        this._cpu._a[ 0 ] &= 0xDF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES5m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xDF;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET5b = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5c = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5d = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5e = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5h = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5l = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5a = function ( ) {

        this._cpu._b[ 0 ] |= 0x20;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET5m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x20;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT6b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT6m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x40 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES6b = function ( ) {

        this._cpu._b[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6c = function ( ) {

        this._cpu._c[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6d = function ( ) {

        this._cpu._d[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6e = function ( ) {

        this._cpu._e[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6h = function ( ) {

        this._cpu._h[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6l = function ( ) {

        this._cpu._l[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6a = function ( ) {

        this._cpu._a[ 0 ] &= 0xBF;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES6m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xBF;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET6b = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6c = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6d = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6e = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6h = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6l = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6a = function ( ) {

        this._cpu._b[ 0 ] |= 0x40;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET6m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x40;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.BIT7b = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7c = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7d = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7e = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7h = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7l = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7a = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.BIT7m = function ( ) {

        // DUBIOUS
        this._cpu._f[ 0 ] &= 0x1F;
        this._cpu._f[ 0 ] |= 0x20;
        this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x80 ) ? 0 : 0x80;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RES7b = function ( ) {

        this._cpu._b[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7c = function ( ) {

        this._cpu._c[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7d = function ( ) {

        this._cpu._d[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7e = function ( ) {

        this._cpu._e[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7h = function ( ) {

        this._cpu._h[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7l = function ( ) {

        this._cpu._l[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7a = function ( ) {

        this._cpu._a[ 0 ] &= 0x7F;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RES7m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x7F;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SET7b = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7c = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7d = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7e = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7h = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7l = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7a = function ( ) {

        this._cpu._b[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SET7m = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x80;
        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.RLA = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.RLCA = function ( ) {

        var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.RRA = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.RRCA = function ( ) {

        var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.RLr_b = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_c = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_d = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_e = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_h = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_l = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLr_a = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLHL = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
        var co = i & 0x80 ? 0x10 : 0;

        i = ( i << 1 ) + ci;
        i &= 0xFF;

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        // DUBIOUS
        this._cpu._f[ 0 ] = ( i ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.RLCr_b = function ( ) {

        var ci = this._cpu._b[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_c = function ( ) {

        var ci = this._cpu._c[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_d = function ( ) {

        var ci = this._cpu._d[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_e = function ( ) {

        var ci = this._cpu._e[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_h = function ( ) {

        var ci = this._cpu._h[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_l = function ( ) {

        var ci = this._cpu._l[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCr_a = function ( ) {

        var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RLCHL = function ( ) {

        var ci = i & 0x80 ? 1 : 0;
        var co = i & 0x80 ? 0x10 : 0;

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        i = ( i << 1 ) + ci;
        i &= 0xFF;

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        // DUBIOUS
        this._cpu._f[ 0 ] = ( i ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.RRr_b = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_c = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_d = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_e = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_h = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_l = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRr_a = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRHL = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
        var co = i & 1 ? 0x10 : 0;

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        i = ( i >> 1 ) + ci;
        i &= 0xFF;

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        // DUBIOUS
        this._cpu._f[ 0 ] = ( i ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.RRCr_b = function ( ) {

        var ci = this._cpu._b[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_c = function ( ) {

        var ci = this._cpu._c[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_d = function ( ) {

        var ci = this._cpu._d[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_e = function ( ) {

        var ci = this._cpu._e[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_h = function ( ) {

        var ci = this._cpu._h[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_l = function ( ) {

        var ci = this._cpu._l[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCr_a = function ( ) {

        var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

        // DUBIOUS
        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.RRCHL = function ( ) {

        var ci = i & 1 ? 0x80 : 0;
        var co = i & 1 ? 0x10 : 0;

        var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
        i = ( i >> 1 ) + ci;
        i &= 0xFF;

        this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

        // DUBIOUS
        this._cpu._f[ 0 ] = ( i ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 4;

    };

    InstructionSet.prototype.SLAr_b = function ( ) {

        var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._b[ 0 ] = this._cpu._b[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_c = function ( ) {

        var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._c[ 0 ] = this._cpu._c[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_d = function ( ) {

        var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._d[ 0 ] = this._cpu._d[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_e = function ( ) {

        var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._e[ 0 ] = this._cpu._e[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_h = function ( ) {

        var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._h[ 0 ] = this._cpu._h[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_l = function ( ) {

        var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLAr_a = function ( ) {

        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = this._cpu._a[ 0 ] << 1;

        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_b = function ( ) {

        var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_c = function ( ) {

        var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_d = function ( ) {

        var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_e = function ( ) {

        var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_h = function ( ) {

        var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_l = function ( ) {

        var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SLLr_a = function ( ) {

        var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | 1;

        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_b = function ( ) {

        var ci = this._cpu._b[ 0 ] & 0x80;
        var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_c = function ( ) {

        var ci = this._cpu._c[ 0 ] & 0x80;
        var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_d = function ( ) {

        var ci = this._cpu._d[ 0 ] & 0x80;
        var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_e = function ( ) {

        var ci = this._cpu._e[ 0 ] & 0x80;
        var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_h = function ( ) {

        var ci = this._cpu._h[ 0 ] & 0x80;
        var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_l = function ( ) {

        var ci = this._cpu._l[ 0 ] & 0x80;
        var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRAr_a = function ( ) {

        var ci = this._cpu._a[ 0 ] & 0x80;
        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_b = function ( ) {

        var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._b[ 0 ] = this._cpu._b[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_c = function ( ) {

        var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._c[ 0 ] = this._cpu._c[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_d = function ( ) {

        var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._d[ 0 ] = this._cpu._d[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_e = function ( ) {

        var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._e[ 0 ] = this._cpu._e[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_h = function ( ) {

        var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._h[ 0 ] = this._cpu._h[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_l = function ( ) {

        var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._l[ 0 ] = this._cpu._l[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.SRLr_a = function ( ) {

        var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

        this._cpu._a[ 0 ] = this._cpu._a[ 0 ] >> 1;

        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.CPL = function ( ) {

        this._cpu._a[ 0 ] ^= 0xFF;

        this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.NEG = function ( ) {

        this._cpu._a[ 0 ] = 0 - this._cpu._a[ 0 ];

        this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x10 : 0;

        if ( !this._cpu._a[ 0 ] )
            this._cpu._f[ 0 ] |= 0x80;

        this._cpu._m[ 0 ] = 2;

    };

    InstructionSet.prototype.CCF = function ( ) {

        var ci = this._cpu._f[ 0 ] & 0x10 ? 0 : 0x10;

        this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | ci;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.SCF = function ( ) {

        this._cpu._f[ 0 ] |= 0x10;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.PUSHBC = function ( ) {

        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._b[ 0 ] );
        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._c[ 0 ] );

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.PUSHDE = function ( ) {

        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._d[ 0 ] );
        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._e[ 0 ] );

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.PUSHHL = function ( ) {

        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._h[ 0 ] );
        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._l[ 0 ] );

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.PUSHAF = function ( ) {

        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._a[ 0 ] );
        this._cpu._sp[ 0 ] -= 1;
        this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._f[ 0 ] );

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.POPBC = function ( ) {

        this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;
        this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.POPDE = function ( ) {

        this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;
        this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.POPHL = function ( ) {

        this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;
        this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.POPAF = function ( ) {

        this._cpu._f[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;
        this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 1;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.JPnn = function ( ) {

        this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.JPHL = function ( ) {

        this._cpu._pc[ 0 ] = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.JPNZnn = function ( ) {

        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._m[ 0 ] += 1;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.JPZnn = function ( ) {

        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._m[ 0 ] += 1;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.JPNCnn = function ( ) {

        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._m[ 0 ] += 1;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.JPCnn = function ( ) {

        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._m[ 0 ] += 1;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.JRn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;
        this._cpu._pc[ 0 ] += i;
        this._cpu._m[ 0 ] += 1;

    };

    InstructionSet.prototype.JRNZn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

            this._cpu._pc[ 0 ] += i;
            this._cpu._m[ 0 ] += 1;

        }
    };

    InstructionSet.prototype.JRZn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

            this._cpu._pc[ 0 ] += i;
            this._cpu._m[ 0 ] += 1;

        }
    };

    InstructionSet.prototype.JRNCn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

            this._cpu._pc[ 0 ] += i;
            this._cpu._m[ 0 ] += 1;

        }
    };

    InstructionSet.prototype.JRCn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

            this._cpu._pc[ 0 ] += i;
            this._cpu._m[ 0 ] += 1;

        }
    };

    InstructionSet.prototype.DJNZn = function ( ) {

        var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] += 1;

        if ( i > 127 )
            i = -( ( ~i + 1 ) & 0xFF );

        this._cpu._m[ 0 ] = 2;

        this._cpu._b[ 0 ] -= 1;
        if ( this._cpu._b[ 0 ] ) {

            this._cpu._pc[ 0 ] += i;

            this._cpu._m[ 0 ] += 1;

        }
    };

    InstructionSet.prototype.CALLnn = function ( ) {

        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
        this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

        this._cpu._m[ 0 ] = 5;

    };

    InstructionSet.prototype.CALLNZnn = function ( ) {


        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

            this._cpu._m[ 0 ] += 2;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.CALLZnn = function ( ) {


        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

            this._cpu._m[ 0 ] += 2;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.CALLNCnn = function ( ) {


        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

            this._cpu._m[ 0 ] += 2;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.CALLCnn = function ( ) {


        this._cpu._m[ 0 ] = 3;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._m[ 0 ] += 2;

        } else {

            this._cpu._pc[ 0 ] += 2;

        }

    };

    InstructionSet.prototype.RET = function ( ) {

        this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RETI = function ( ) {

        this._cpu._engine._ime[ 0 ] = 1;
        this._rrs( );
        this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
        this._cpu._sp[ 0 ] += 2;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RETNZ = function ( ) {

        this._cpu._m[ 0 ] = 1;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;

            this._cpu._m[ 0 ] += 2;

        }
    };

    InstructionSet.prototype.RETZ = function ( ) {

        this._cpu._m[ 0 ] = 1;

        if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;
            this._cpu._m[ 0 ] += 2;

        }
    };

    InstructionSet.prototype.RETNC = function ( ) {

        this._cpu._m[ 0 ] = 1;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;
            this._cpu._m[ 0 ] += 2;

        }
    };

    InstructionSet.prototype.RETC = function ( ) {

        this._cpu._m[ 0 ] = 1;

        if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;
            this._cpu._m[ 0 ] += 2;

        }
    };

    InstructionSet.prototype.RST00 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x00;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST08 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x08;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST10 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x10;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST18 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x18;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST20 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x20;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST28 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x28;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST30 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x30;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST38 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x38;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST40 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x40;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST48 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x48;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST50 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x50;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST58 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x58;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.RST60 = function ( ) {

        this._rsv( );
        this._cpu._sp[ 0 ] -= 2;
        this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
        this._cpu._pc[ 0 ] = 0x60;

        this._cpu._m[ 0 ] = 3;

    };

    InstructionSet.prototype.NOP = function ( ) {

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.HALT = function ( ) {

        this._cpu._halt = true;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.DI = function ( ) {

        this._cpu._engine._ime[ 0 ] = 0;

        this._cpu._m[ 0 ] = 1;

    };

    InstructionSet.prototype.EI = function ( ) {

        this._cpu._engine._ime[ 0 ] = 1;

        this._cpu._m[ 0 ] = 1;

    };

    return InstructionSet;
} );
