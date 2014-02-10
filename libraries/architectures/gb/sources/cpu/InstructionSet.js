define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( cpu ) {

            this._cpu = cpu;

        },

        _rsv : function ( ) {

            this._a = this._cpu._a[ 0 ]; this._b = this._cpu._b[ 0 ];
            this._c = this._cpu._c[ 0 ]; this._d = this._cpu._d[ 0 ];
            this._e = this._cpu._e[ 0 ]; this._f = this._cpu._f[ 0 ];
            this._h = this._cpu._h[ 0 ]; this._l = this._cpu._l[ 0 ];

        },

        _rrs : function ( ) {

            this._cpu._a[ 0 ] = this._a; this._cpu._b[ 0 ] = this._b;
            this._cpu._c[ 0 ] = this._c; this._cpu._d[ 0 ] = this._d;
            this._cpu._e[ 0 ] = this._e; this._cpu._f[ 0 ] = this._f;
            this._cpu._h[ 0 ] = this._h; this._cpu._l[ 0 ] = this._l;

        },

        MAPcb : function ( ) {

            var opcode = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            var command = this._cpu._instructionMap.cb[ opcode ];
            var instruction = command && command.instruction;

            if ( this._cpu._engine._options.debug && this._cpu._engine._options.debug.instructions === 'all' )
                debugger ;

            if ( this._cpu._engine._options.debug && this._cpu._engine._options.debug.instructions === 'invalid' && ! command )
                debugger ;

            if ( this._cpu._engine._options.debug && this._cpu._engine._options.debug.instructionPool )
                this._cpu._engine._options.debug.instructionPool.push( [ address, opcode, instruction ] );

            command( );

        },

        LDrr_bb : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._b[ 0 ];


            this._cpu._m[ 0 ] = 1;

        },

        LDrr_bc : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_bd : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_be : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_bh : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_bl : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ba : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_cb : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_cc : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_cd : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ce : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ch : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_cl : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ca : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_db : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_dc : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_dd : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_de : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_dh : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_dl : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_da : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_eb : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ec : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ed : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ee : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_eh : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_el : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ea : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_hb : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_hc : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_hd : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_he : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_hh : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_hl : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ha : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_lb : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_lc : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ld : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_le : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_lh : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ll : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_la : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ab : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._b[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ac : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._c[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ad : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._d[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ae : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._e[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_ah : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._h[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_al : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrr_aa : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._a[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        LDrHLm_b : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_c : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_d : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_e : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_h : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_l : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrHLm_a : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_b : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._b[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_c : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._c[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_d : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._d[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_e : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._e[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_h : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._h[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_l : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmr_a : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_b : function ( ) {

            this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_c : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_d : function ( ) {

            this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_e : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_h : function ( ) {

            this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_l : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDrn_a : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDHLmn : function ( ) {

            var value = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], value );

            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        LDBCmA : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDDEmA : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ], this._cpu._a[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDmmA : function ( ) {

            this._cpu._engine._mmu.writeUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 4;

        },

        LDABCm : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDADEm : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDAmm : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ) );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 4;

        },

        LDBCnn : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        LDDEnn : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        LDHLnn : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        LDSPnn : function ( ) {

            this._cpu._sp[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        LDHLmm : function ( ) {

            var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 2;
            this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( i );
            this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( i + 1 );

            this._cpu._m[ 0 ] = 5;

        },

        LDmmHL : function ( ) {

            var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 2;
            this._cpu._engine._mmu.writeUint16( i, ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 5;

        },

        LDHLIA : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

            if ( !this._cpu._l[ 0 ] )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDAHLI : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

            if ( !this._cpu._l[ 0 ] )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDHLDA : function ( ) {

            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

            if ( this._cpu._l[ 0 ] === 0xFF )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDAHLD : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

            if ( this._cpu._l[ 0 ] === 0xFF )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

            this._cpu._m[ 0 ] = 2;

        },

        LDAIOn : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ) );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        LDIOnA : function ( ) {

            this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        LDAIOC : function ( ) {

            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._c[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDIOCA : function ( ) {

            this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

            this._cpu._m[ 0 ] = 2;

        },

        LDHLSPn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            i += this._cpu._sp[ 0 ];

            this._cpu._h[ 0 ] = i >> 8;
            this._cpu._l[ 0 ] = i;

            this._cpu._m[ 0 ] = 3;

        },

        SWAPr_b : function ( ) {

            var tr = this._cpu._b[ 0 ];

            this._cpu._b[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_c : function ( ) {

            var tr = this._cpu._c[ 0 ];

            this._cpu._c[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_d : function ( ) {

            var tr = this._cpu._d[ 0 ];

            this._cpu._d[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_e : function ( ) {

            var tr = this._cpu._e[ 0 ];

            this._cpu._e[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_h : function ( ) {

            var tr = this._cpu._h[ 0 ];

            this._cpu._h[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_l : function ( ) {

            var tr = this._cpu._l[ 0 ];

            this._cpu._l[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        SWAPr_a : function ( ) {

            var tr = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_b : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._b[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_c : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._c[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_d : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._d[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_e : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._e[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_h : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._h[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_l : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._l[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDr_a : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] += this._cpu._a[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADDHL : function ( ) {

            var a = this._cpu._a[ 0 ];
            var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._a[ 0 ] += m;
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        ADDn : function ( ) {

            var a = this._cpu._a[ 0 ];
            var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

            this._cpu._a[ 0 ] += m;
            this._cpu._pc[ 0 ] += 1;
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        ADDHLBC : function ( ) {

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

        },

        ADDHLDE : function ( ) {

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

        },

        ADDHLHL : function ( ) {

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

        },

        ADDHLSP : function ( ) {

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

        },

        ADDSPn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._pc[ 0 ] += 1;
            this._cpu._sp[ 0 ] += i;

            this._cpu._m[ 0 ] = 4;

        },

        ADCr_b : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._b[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_c : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._c[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_d : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._d[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_e : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._e[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_h : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._h[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_l : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._l[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCr_a : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] += this._cpu._a[ 0 ] + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        ADCHL : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._a[ 0 ] += m + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        ADCn : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._a[ 0 ] += m + carry;

            var overflow = carry ? this._cpu._a[ 0 ] <= a : this._cpu._a[ 0 ] < a;
            this._cpu._f[ 0 ] = overflow ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SUBr_b : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._b[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_c : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._c[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_d : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._d[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_e : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._e[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_h : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._h[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_l : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._l[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBr_a : function ( ) {

            var a = this._cpu._a[ 0 ];

            this._cpu._a[ 0 ] -= this._cpu._a[ 0 ];
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SUBHL : function ( ) {

            var a = this._cpu._a[ 0 ];
            var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._a[ 0 ] -= m;
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SUBn : function ( ) {

            var a = this._cpu._a[ 0 ];
            var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

            this._cpu._a[ 0 ] -= m;
            this._cpu._pc[ 0 ] += 1;
            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SBCr_b : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._b[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_c : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._c[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_d : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._d[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_e : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._e[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_h : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._h[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_l : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._l[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCr_a : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            this._cpu._a[ 0 ] -= this._cpu._a[ 0 ] + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        SBCHL : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._a[ 0 ] -= m + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SBCn : function ( ) {

            var a = this._cpu._a[ 0 ];
            var carry = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;

            var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._a[ 0 ] -= m + carry;

            var underflow = carry ? this._cpu._a[ 0 ] >= a : this._cpu._a[ 0 ] > a;
            this._cpu._f[ 0 ] = underflow ? 0x50 : 0x40;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        CPr_b : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._b[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_c : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._c[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_d : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._d[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_e : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._e[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_h : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._h[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_l : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._l[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPr_a : function ( ) {

            var i = this._cpu._a[ 0 ];
            i -= this._cpu._a[ 0 ];

            this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
            i &= 0xFF;

            if ( !i )
                this._cpu._f[ 0 ] |= 0x80;

            if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ i ) & 0x10 )
                this._cpu._f[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 1;

        },

        CPHL : function ( ) {

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

        },

        CPn : function ( ) {

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

        },

        DAA : function ( ) {

            var a = this._cpu._a[ 0 ];

            if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( ( this._cpu._a[ 0 ] & 15 ) > 9 ) )
                this._cpu._a[ 0 ] += 6;

            if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( a > 0x99 ) ) {

                this._cpu._a[ 0 ] += 0x60;
                this._cpu._f[ 0 ] |= 0x10;

            }

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_b : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._b[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_c : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._c[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_d : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._d[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_e : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._e[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_h : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._h[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_l : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._l[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDr_a : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._a[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ANDHL : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        ANDn : function ( ) {

            this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        ORr_b : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._b[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_c : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._c[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_d : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._d[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_e : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._e[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_h : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._h[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_l : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._l[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORr_a : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._a[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        ORHL : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        ORn : function ( ) {

            this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        XORr_b : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._b[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_c : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._c[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_d : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._d[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_e : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._e[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_h : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._h[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_l : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._l[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORr_a : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._a[ 0 ];

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        XORHL : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        XORn : function ( ) {

            this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        INCr_b : function ( ) {

            this._cpu._b[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_c : function ( ) {

            this._cpu._c[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_d : function ( ) {

            this._cpu._d[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_e : function ( ) {

            this._cpu._e[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_h : function ( ) {

            this._cpu._h[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_l : function ( ) {

            this._cpu._l[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCr_a : function ( ) {

            this._cpu._a[ 0 ] += 1;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        INCHLm : function ( ) {

            var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) + 1 ) & 0xFF;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._f[ 0 ] = i ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        DECr_b : function ( ) {

            this._cpu._b[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_c : function ( ) {

            this._cpu._c[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_d : function ( ) {

            this._cpu._d[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_e : function ( ) {

            this._cpu._e[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_h : function ( ) {

            this._cpu._h[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_l : function ( ) {

            this._cpu._l[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECr_a : function ( ) {

            this._cpu._a[ 0 ] -= 1;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        DECHLm : function ( ) {

            var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) - 1 ) & 0xFF;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._f[ 0 ] = i ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        INCBC : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._c[ 0 ] + 1;

            if ( !this._cpu._c[ 0 ] )
                this._cpu._b[ 0 ] = this._cpu._b[ 0 ] + 1;

            this._cpu._m[ 0 ] = 1;

        },

        INCDE : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._e[ 0 ] + 1;

            if ( !this._cpu._e[ 0 ] )
                this._cpu._d[ 0 ] = this._cpu._d[ 0 ] + 1;

            this._cpu._m[ 0 ] = 1;

        },

        INCHL : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

            if ( !this._cpu._l[ 0 ] )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

            this._cpu._m[ 0 ] = 1;

        },

        INCSP : function ( ) {

            this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] + 1;

            this._cpu._m[ 0 ] = 1;

        },

        DECBC : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._c[ 0 ] - 1;

            if ( this._cpu._c[ 0 ] === 0xFF )
                this._cpu._b[ 0 ] = this._cpu._b[ 0 ] - 1;

            this._cpu._m[ 0 ] = 1;

        },

        DECDE : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._e[ 0 ] - 1;

            if ( this._cpu._e[ 0 ] === 0xFF )
                this._cpu._d[ 0 ] = this._cpu._d[ 0 ] - 1;

            this._cpu._m[ 0 ] = 1;

        },

        DECHL : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

            if ( this._cpu._l[ 0 ] === 0xFF )
                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

            this._cpu._m[ 0 ] = 1;

        },

        DECSP : function ( ) {

            this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] - 1;

            this._cpu._m[ 0 ] = 1;

        },

        BIT0b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT0m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x01 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES0b : function ( ) {

            this._cpu._b[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0c : function ( ) {

            this._cpu._c[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0d : function ( ) {

            this._cpu._d[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0e : function ( ) {

            this._cpu._e[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0h : function ( ) {

            this._cpu._h[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0l : function ( ) {

            this._cpu._l[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0a : function ( ) {

            this._cpu._a[ 0 ] &= 0xFE;

            this._cpu._m[ 0 ] = 2;

        },

        RES0m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFE;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET0b : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0c : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0d : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0e : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0h : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0l : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0a : function ( ) {

            this._cpu._b[ 0 ] |= 0x01;

            this._cpu._m[ 0 ] = 2;

        },

        SET0m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x01;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT1b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT1m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x02 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES1b : function ( ) {

            this._cpu._b[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1c : function ( ) {

            this._cpu._c[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1d : function ( ) {

            this._cpu._d[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1e : function ( ) {

            this._cpu._e[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1h : function ( ) {

            this._cpu._h[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1l : function ( ) {

            this._cpu._l[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1a : function ( ) {

            this._cpu._a[ 0 ] &= 0xFD;

            this._cpu._m[ 0 ] = 2;

        },

        RES1m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFD;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET1b : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1c : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1d : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1e : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1h : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1l : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1a : function ( ) {

            this._cpu._b[ 0 ] |= 0x02;

            this._cpu._m[ 0 ] = 2;

        },

        SET1m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x02;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT2b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT2m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x04 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES2b : function ( ) {

            this._cpu._b[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2c : function ( ) {

            this._cpu._c[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2d : function ( ) {

            this._cpu._d[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2e : function ( ) {

            this._cpu._e[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2h : function ( ) {

            this._cpu._h[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2l : function ( ) {

            this._cpu._l[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2a : function ( ) {

            this._cpu._a[ 0 ] &= 0xFB;

            this._cpu._m[ 0 ] = 2;

        },

        RES2m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFB;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET2b : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2c : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2d : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2e : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2h : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2l : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2a : function ( ) {

            this._cpu._b[ 0 ] |= 0x04;

            this._cpu._m[ 0 ] = 2;

        },

        SET2m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x04;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT3b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT3m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x08 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES3b : function ( ) {

            this._cpu._b[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3c : function ( ) {

            this._cpu._c[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3d : function ( ) {

            this._cpu._d[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3e : function ( ) {

            this._cpu._e[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3h : function ( ) {

            this._cpu._h[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3l : function ( ) {

            this._cpu._l[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3a : function ( ) {

            this._cpu._a[ 0 ] &= 0xF7;

            this._cpu._m[ 0 ] = 2;

        },

        RES3m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xF7;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET3b : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3c : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3d : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3e : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3h : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3l : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3a : function ( ) {

            this._cpu._b[ 0 ] |= 0x08;

            this._cpu._m[ 0 ] = 2;

        },

        SET3m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x08;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT4b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT4m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x10 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES4b : function ( ) {

            this._cpu._b[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4c : function ( ) {

            this._cpu._c[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4d : function ( ) {

            this._cpu._d[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4e : function ( ) {

            this._cpu._e[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4h : function ( ) {

            this._cpu._h[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4l : function ( ) {

            this._cpu._l[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4a : function ( ) {

            this._cpu._a[ 0 ] &= 0xEF;

            this._cpu._m[ 0 ] = 2;

        },

        RES4m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xEF;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET4b : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4c : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4d : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4e : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4h : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4l : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4a : function ( ) {

            this._cpu._b[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 2;

        },

        SET4m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x10;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT5b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT5m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x20 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES5b : function ( ) {

            this._cpu._b[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5c : function ( ) {

            this._cpu._c[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5d : function ( ) {

            this._cpu._d[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5e : function ( ) {

            this._cpu._e[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5h : function ( ) {

            this._cpu._h[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5l : function ( ) {

            this._cpu._l[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5a : function ( ) {

            this._cpu._a[ 0 ] &= 0xDF;

            this._cpu._m[ 0 ] = 2;

        },

        RES5m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xDF;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET5b : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5c : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5d : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5e : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5h : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5l : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5a : function ( ) {

            this._cpu._b[ 0 ] |= 0x20;

            this._cpu._m[ 0 ] = 2;

        },

        SET5m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x20;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT6b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT6m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x40 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES6b : function ( ) {

            this._cpu._b[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6c : function ( ) {

            this._cpu._c[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6d : function ( ) {

            this._cpu._d[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6e : function ( ) {

            this._cpu._e[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6h : function ( ) {

            this._cpu._h[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6l : function ( ) {

            this._cpu._l[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6a : function ( ) {

            this._cpu._a[ 0 ] &= 0xBF;

            this._cpu._m[ 0 ] = 2;

        },

        RES6m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xBF;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET6b : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6c : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6d : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6e : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6h : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6l : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6a : function ( ) {

            this._cpu._b[ 0 ] |= 0x40;

            this._cpu._m[ 0 ] = 2;

        },

        SET6m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x40;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        BIT7b : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7c : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7d : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7e : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7h : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7l : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7a : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        BIT7m : function ( ) {

            // DUBIOUS
            this._cpu._f[ 0 ] &= 0x1F;
            this._cpu._f[ 0 ] |= 0x20;
            this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x80 ) ? 0 : 0x80;

            this._cpu._m[ 0 ] = 3;

        },

        RES7b : function ( ) {

            this._cpu._b[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7c : function ( ) {

            this._cpu._c[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7d : function ( ) {

            this._cpu._d[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7e : function ( ) {

            this._cpu._e[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7h : function ( ) {

            this._cpu._h[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7l : function ( ) {

            this._cpu._l[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7a : function ( ) {

            this._cpu._a[ 0 ] &= 0x7F;

            this._cpu._m[ 0 ] = 2;

        },

        RES7m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x7F;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        SET7b : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7c : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7d : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7e : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7h : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7l : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7a : function ( ) {

            this._cpu._b[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        SET7m : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x80;
            this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

            this._cpu._m[ 0 ] = 4;

        },

        RLA : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 1;

        },

        RLCA : function ( ) {

            var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 1;

        },

        RRA : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 1;

        },

        RRCA : function ( ) {

            var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 1;

        },

        RLr_b : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_c : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_d : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_e : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_h : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_l : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLr_a : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLHL : function ( ) {

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

        },

        RLCr_b : function ( ) {

            var ci = this._cpu._b[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_c : function ( ) {

            var ci = this._cpu._c[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_d : function ( ) {

            var ci = this._cpu._d[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_e : function ( ) {

            var ci = this._cpu._e[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_h : function ( ) {

            var ci = this._cpu._h[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_l : function ( ) {

            var ci = this._cpu._l[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCr_a : function ( ) {

            var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RLCHL : function ( ) {

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

        },

        RRr_b : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_c : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_d : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_e : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_h : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_l : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRr_a : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRHL : function ( ) {

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

        },

        RRCr_b : function ( ) {

            var ci = this._cpu._b[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_c : function ( ) {

            var ci = this._cpu._c[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_d : function ( ) {

            var ci = this._cpu._d[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_e : function ( ) {

            var ci = this._cpu._e[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_h : function ( ) {

            var ci = this._cpu._h[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_l : function ( ) {

            var ci = this._cpu._l[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCr_a : function ( ) {

            var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

            // DUBIOUS
            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        RRCHL : function ( ) {

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

        },

        SLAr_b : function ( ) {

            var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._b[ 0 ] = this._cpu._b[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_c : function ( ) {

            var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._c[ 0 ] = this._cpu._c[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_d : function ( ) {

            var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._d[ 0 ] = this._cpu._d[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_e : function ( ) {

            var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._e[ 0 ] = this._cpu._e[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_h : function ( ) {

            var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_l : function ( ) {

            var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLAr_a : function ( ) {

            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = this._cpu._a[ 0 ] << 1;

            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_b : function ( ) {

            var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_c : function ( ) {

            var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_d : function ( ) {

            var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_e : function ( ) {

            var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_h : function ( ) {

            var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_l : function ( ) {

            var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SLLr_a : function ( ) {

            var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | 1;

            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_b : function ( ) {

            var ci = this._cpu._b[ 0 ] & 0x80;
            var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_c : function ( ) {

            var ci = this._cpu._c[ 0 ] & 0x80;
            var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_d : function ( ) {

            var ci = this._cpu._d[ 0 ] & 0x80;
            var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_e : function ( ) {

            var ci = this._cpu._e[ 0 ] & 0x80;
            var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_h : function ( ) {

            var ci = this._cpu._h[ 0 ] & 0x80;
            var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_l : function ( ) {

            var ci = this._cpu._l[ 0 ] & 0x80;
            var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRAr_a : function ( ) {

            var ci = this._cpu._a[ 0 ] & 0x80;
            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_b : function ( ) {

            var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._b[ 0 ] = this._cpu._b[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_c : function ( ) {

            var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._c[ 0 ] = this._cpu._c[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_d : function ( ) {

            var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._d[ 0 ] = this._cpu._d[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_e : function ( ) {

            var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._e[ 0 ] = this._cpu._e[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_h : function ( ) {

            var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._h[ 0 ] = this._cpu._h[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_l : function ( ) {

            var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._l[ 0 ] = this._cpu._l[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        SRLr_a : function ( ) {

            var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

            this._cpu._a[ 0 ] = this._cpu._a[ 0 ] >> 1;

            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

            this._cpu._m[ 0 ] = 2;

        },

        CPL : function ( ) {

            this._cpu._a[ 0 ] ^= 0xFF;

            this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

            this._cpu._m[ 0 ] = 1;

        },

        NEG : function ( ) {

            this._cpu._a[ 0 ] = 0 - this._cpu._a[ 0 ];

            this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x10 : 0;

            if ( !this._cpu._a[ 0 ] )
                this._cpu._f[ 0 ] |= 0x80;

            this._cpu._m[ 0 ] = 2;

        },

        CCF : function ( ) {

            var ci = this._cpu._f[ 0 ] & 0x10 ? 0 : 0x10;

            this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | ci;

            this._cpu._m[ 0 ] = 1;

        },

        SCF : function ( ) {

            this._cpu._f[ 0 ] |= 0x10;

            this._cpu._m[ 0 ] = 1;

        },

        PUSHBC : function ( ) {

            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._b[ 0 ] );
            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._c[ 0 ] );

            this._cpu._m[ 0 ] = 3;

        },

        PUSHDE : function ( ) {

            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._d[ 0 ] );
            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._e[ 0 ] );

            this._cpu._m[ 0 ] = 3;

        },

        PUSHHL : function ( ) {

            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._h[ 0 ] );
            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._l[ 0 ] );

            this._cpu._m[ 0 ] = 3;

        },

        PUSHAF : function ( ) {

            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._a[ 0 ] );
            this._cpu._sp[ 0 ] -= 1;
            this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._f[ 0 ] );

            this._cpu._m[ 0 ] = 3;

        },

        POPBC : function ( ) {

            this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;
            this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        POPDE : function ( ) {

            this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;
            this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        POPHL : function ( ) {

            this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;
            this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        POPAF : function ( ) {

            this._cpu._f[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;
            this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 1;

            this._cpu._m[ 0 ] = 3;

        },

        JPnn : function ( ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

            this._cpu._m[ 0 ] = 3;

        },

        JPHL : function ( ) {

            this._cpu._pc[ 0 ] = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];

            this._cpu._m[ 0 ] = 1;

        },

        JPNZnn : function ( ) {

            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._m[ 0 ] += 1;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        JPZnn : function ( ) {

            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._m[ 0 ] += 1;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        JPNCnn : function ( ) {

            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._m[ 0 ] += 1;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        JPCnn : function ( ) {

            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._m[ 0 ] += 1;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        JRn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._m[ 0 ] = 2;
            this._cpu._pc[ 0 ] += i;
            this._cpu._m[ 0 ] += 1;

        },

        JRNZn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._m[ 0 ] = 2;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                this._cpu._pc[ 0 ] += i;
                this._cpu._m[ 0 ] += 1;

            }
        },

        JRZn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._m[ 0 ] = 2;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                this._cpu._pc[ 0 ] += i;
                this._cpu._m[ 0 ] += 1;

            }
        },

        JRNCn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._m[ 0 ] = 2;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                this._cpu._pc[ 0 ] += i;
                this._cpu._m[ 0 ] += 1;

            }
        },

        JRCn : function ( ) {

            var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] += 1;

            if ( i > 127 )
                i = -( ( ~i + 1 ) & 0xFF );

            this._cpu._m[ 0 ] = 2;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                this._cpu._pc[ 0 ] += i;
                this._cpu._m[ 0 ] += 1;

            }
        },

        DJNZn : function ( ) {

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
        },

        CALLnn : function ( ) {

            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

            this._cpu._m[ 0 ] = 5;

        },

        CALLNZnn : function ( ) {


            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                this._cpu._m[ 0 ] += 2;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        CALLZnn : function ( ) {


            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                this._cpu._m[ 0 ] += 2;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        CALLNCnn : function ( ) {


            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                this._cpu._m[ 0 ] += 2;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        CALLCnn : function ( ) {


            this._cpu._m[ 0 ] = 3;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._m[ 0 ] += 2;

            } else {

                this._cpu._pc[ 0 ] += 2;

            }

        },

        RET : function ( ) {

            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        RETI : function ( ) {

            this._cpu._ime = true;
            this._rrs( );
            this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
            this._cpu._sp[ 0 ] += 2;

            this._cpu._m[ 0 ] = 3;

        },

        RETNZ : function ( ) {

            this._cpu._m[ 0 ] = 1;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;

                this._cpu._m[ 0 ] += 2;

            }
        },

        RETZ : function ( ) {

            this._cpu._m[ 0 ] = 1;

            if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;
                this._cpu._m[ 0 ] += 2;

            }
        },

        RETNC : function ( ) {

            this._cpu._m[ 0 ] = 1;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;
                this._cpu._m[ 0 ] += 2;

            }
        },

        RETC : function ( ) {

            this._cpu._m[ 0 ] = 1;

            if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;
                this._cpu._m[ 0 ] += 2;

            }
        },

        RST00 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x00;

            this._cpu._m[ 0 ] = 3;

        },

        RST08 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x08;

            this._cpu._m[ 0 ] = 3;

        },

        RST10 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x10;

            this._cpu._m[ 0 ] = 3;

        },

        RST18 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x18;

            this._cpu._m[ 0 ] = 3;

        },

        RST20 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x20;

            this._cpu._m[ 0 ] = 3;

        },

        RST28 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x28;

            this._cpu._m[ 0 ] = 3;

        },

        RST30 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x30;

            this._cpu._m[ 0 ] = 3;

        },

        RST38 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x38;

            this._cpu._m[ 0 ] = 3;

        },

        RST40 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x40;

            this._cpu._m[ 0 ] = 3;

        },

        RST48 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x48;

            this._cpu._m[ 0 ] = 3;

        },

        RST50 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x50;

            this._cpu._m[ 0 ] = 3;

        },

        RST58 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x58;

            this._cpu._m[ 0 ] = 3;

        },

        RST60 : function ( ) {

            this._rsv( );
            this._cpu._sp[ 0 ] -= 2;
            this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
            this._cpu._pc[ 0 ] = 0x60;

            this._cpu._m[ 0 ] = 3;

        },

        NOP : function ( ) {

            this._cpu._m[ 0 ] = 1;

        },

        HALT : function ( ) {

            this._cpu._halt = true;

            this._cpu._m[ 0 ] = 1;

        },

        DI : function ( ) {

            this._cpu._ime = false;

            this._cpu._m[ 0 ] = 1;

        },

        EI : function ( ) {

            this._cpu._ime = true;

            this._cpu._m[ 0 ] = 1;

        }

    } );

} );
