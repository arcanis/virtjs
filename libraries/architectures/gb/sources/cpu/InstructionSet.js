define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( cpu ) {

            this._cpu = cpu;

            this.makeInstruction( 'LDrr_ab', { from : 'a', to : 'b' } );
            this.makeInstruction( 'LDrr_ac', { from : 'a', to : 'c' } );
            this.makeInstruction( 'LDrr_ad', { from : 'a', to : 'd' } );
            this.makeInstruction( 'LDrr_ae', { from : 'a', to : 'e' } );
            this.makeInstruction( 'LDrr_ah', { from : 'a', to : 'h' } );
            this.makeInstruction( 'LDrr_al', { from : 'a', to : 'l' } );

            this.makeInstruction( 'LDrr_ba', { from : 'b', to : 'a' } );
            this.makeInstruction( 'LDrr_bc', { from : 'b', to : 'c' } );
            this.makeInstruction( 'LDrr_bd', { from : 'b', to : 'd' } );
            this.makeInstruction( 'LDrr_be', { from : 'b', to : 'e' } );
            this.makeInstruction( 'LDrr_bh', { from : 'b', to : 'h' } );
            this.makeInstruction( 'LDrr_bl', { from : 'b', to : 'l' } );

            this.makeInstruction( 'LDrr_ca', { from : 'c', to : 'a' } );
            this.makeInstruction( 'LDrr_cb', { from : 'c', to : 'b' } );
            this.makeInstruction( 'LDrr_cd', { from : 'c', to : 'd' } );
            this.makeInstruction( 'LDrr_ce', { from : 'c', to : 'e' } );
            this.makeInstruction( 'LDrr_ch', { from : 'c', to : 'h' } );
            this.makeInstruction( 'LDrr_cl', { from : 'c', to : 'l' } );

            this.makeInstruction( 'LDrr_da', { from : 'd', to : 'a' } );
            this.makeInstruction( 'LDrr_db', { from : 'd', to : 'b' } );
            this.makeInstruction( 'LDrr_dc', { from : 'd', to : 'c' } );
            this.makeInstruction( 'LDrr_de', { from : 'd', to : 'e' } );
            this.makeInstruction( 'LDrr_dh', { from : 'd', to : 'h' } );
            this.makeInstruction( 'LDrr_dl', { from : 'd', to : 'l' } );

            this.makeInstruction( 'LDrr_ea', { from : 'e', to : 'a' } );
            this.makeInstruction( 'LDrr_eb', { from : 'e', to : 'b' } );
            this.makeInstruction( 'LDrr_ec', { from : 'e', to : 'c' } );
            this.makeInstruction( 'LDrr_ed', { from : 'e', to : 'd' } );
            this.makeInstruction( 'LDrr_eh', { from : 'e', to : 'h' } );
            this.makeInstruction( 'LDrr_el', { from : 'e', to : 'l' } );

            this.makeInstruction( 'LDrr_ha', { from : 'h', to : 'a' } );
            this.makeInstruction( 'LDrr_hb', { from : 'h', to : 'b' } );
            this.makeInstruction( 'LDrr_hc', { from : 'h', to : 'c' } );
            this.makeInstruction( 'LDrr_hd', { from : 'h', to : 'd' } );
            this.makeInstruction( 'LDrr_he', { from : 'h', to : 'e' } );
            this.makeInstruction( 'LDrr_hl', { from : 'h', to : 'l' } );

            this.makeInstruction( 'LDrr_la', { from : 'l', to : 'a' } );
            this.makeInstruction( 'LDrr_lb', { from : 'l', to : 'b' } );
            this.makeInstruction( 'LDrr_lc', { from : 'l', to : 'c' } );
            this.makeInstruction( 'LDrr_ld', { from : 'l', to : 'd' } );
            this.makeInstruction( 'LDrr_le', { from : 'l', to : 'e' } );
            this.makeInstruction( 'LDrr_lh', { from : 'l', to : 'h' } );

            this.makeInstruction( 'LDrHLm_a', { to : 'a' } );
            this.makeInstruction( 'LDrHLm_b', { to : 'b' } );
            this.makeInstruction( 'LDrHLm_c', { to : 'c' } );
            this.makeInstruction( 'LDrHLm_d', { to : 'd' } );
            this.makeInstruction( 'LDrHLm_e', { to : 'e' } );
            this.makeInstruction( 'LDrHLm_h', { to : 'h' } );
            this.makeInstruction( 'LDrHLm_l', { to : 'h' } );

            Object.keys( this.instructions ).forEach( function ( name ) {

                var definition = this.instructions[ name ];

                this[ name ] = definition[ 0 ].bind( this );
                this[ name ].instructionName = name;
                this[ name ].instructionSize = definition[ 1 ];

            }.bind( this ) );

        },

        instructionsBis : {

            _LDr8r8 : function ( ) {

                var to = this._cpu[ '_' + preprocess.to ];
                var from = this._cpu[ '_' + preprocess.from ];

                to[ 0 ] = from[ 0 ];

                this._cpu._m[ 0 ] = 1;

            },

            _LDr8m8 : function ( ) {

                var to = this._cpu[ '_' + preprocess.to ];
                var address = this[ '_' + preprocess.from ]( );

                to[ 0 ] = this._cpu._engine.readUint8( address );

                this._cpu._m[ 0 ] = 1;

            },

            _LDm8r8 : function ( ) {

                var from = this._cpu[ '_' + preprocess.from ];
                var address = this[ '_' + preprocess.to ]( );

                this._cpu._engine.writeUint8( address, from[ 0 ] );

                this._cpu._m[ 0 ] = 1;

            },

            _LDr8n8 : function ( ) {

                var to = this._cpu[ '_' + preprocess.to ];

                to[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );

                this._cpu._pc[ 0 ] += 1;
                this._cpu._m[ 0 ] = 1;

            }

        },

        instructions : {

            MAPcb : [ function ( ) {

                var opcode = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                var instruction = this._cpu._instructionMap.cb[ opcode ];

                // Useful when debugging ('local variables' panel)
                var name = instruction && instruction.instructionName;

                instruction( );

            }, 2 ],

            LDrr_bb : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_bc : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_bd : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_be : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_bh : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_bl : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ba : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_cb : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_cc : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_cd : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ce : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ch : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_cl : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ca : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_db : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_dc : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_dd : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_de : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_dh : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_dl : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_da : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_eb : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ec : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ed : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ee : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_eh : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_el : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ea : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_hb : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_hc : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_hd : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_he : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_hh : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_hl : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ha : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_lb : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_lc : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ld : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_le : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_lh : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ll : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_la : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ab : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._b[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ac : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._c[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ad : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._d[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ae : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._e[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_ah : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._h[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_al : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrr_aa : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._a[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            LDrHLm_b : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_c : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_d : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_e : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_h : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_l : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrHLm_a : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_b : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._b[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_c : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._c[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_d : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._d[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_e : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._e[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_h : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._h[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_l : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLmr_a : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDrn_b : [ function ( ) {

                this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_c : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_d : [ function ( ) {

                this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_e : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_h : [ function ( ) {

                this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_l : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDrn_a : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            LDHLmn : [ function ( ) {

                var value = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], value );

                this._cpu._m[ 0 ] = 3;

            }, 2 ],

            LDBCmA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDDEmA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ], this._cpu._a[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDmmA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 4;

            }, 3 ],

            LDABCm : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._b[ 0 ] << 8 ) + this._cpu._c[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDADEm : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._d[ 0 ] << 8 ) + this._cpu._e[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDAmm : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] ) );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 4;

            }, 3 ],

            LDBCnn : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 3 ],

            LDDEnn : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 3 ],

            LDHLnn : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] + 1 );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 3 ],

            LDSPnn : [ function ( ) {

                this._cpu._sp[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 3 ],

            LDHLmm : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( i );
                this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( i + 1 );

                this._cpu._m[ 0 ] = 5;

            }, 3 ],

            LDmmHL : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 2;

                this._cpu._engine._mmu.writeUint16( i, ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 5;

            }, 3 ],

            LDHLIA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

                if ( !this._cpu._l[ 0 ] )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDAHLI : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

                if ( !this._cpu._l[ 0 ] )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLDA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], this._cpu._a[ 0 ] );
                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

                if ( this._cpu._l[ 0 ] === 0xFF )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDAHLD : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );
                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

                if ( this._cpu._l[ 0 ] === 0xFF )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDAIOn : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ) );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 2 ],

            LDIOnA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] ), this._cpu._a[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 2 ],

            LDAIOC : [ function ( ) {

                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( 0xFF00 + this._cpu._c[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDIOCA : [ function ( ) {

                this._cpu._engine._mmu.writeUint8( 0xFF00 + this._cpu._c[ 0 ], this._cpu._a[ 0 ] );

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            LDHLSPn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                i += this._cpu._sp[ 0 ];

                this._cpu._h[ 0 ] = i >> 8;
                this._cpu._l[ 0 ] = i;

                this._cpu._m[ 0 ] = 3;

            }, 2 ],

            SWAPr_b : [ function ( ) {

                var tr = this._cpu._b[ 0 ];

                this._cpu._b[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_c : [ function ( ) {

                var tr = this._cpu._c[ 0 ];

                this._cpu._c[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_d : [ function ( ) {

                var tr = this._cpu._d[ 0 ];

                this._cpu._d[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_e : [ function ( ) {

                var tr = this._cpu._e[ 0 ];

                this._cpu._e[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_h : [ function ( ) {

                var tr = this._cpu._h[ 0 ];

                this._cpu._h[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_l : [ function ( ) {

                var tr = this._cpu._l[ 0 ];

                this._cpu._l[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SWAPr_a : [ function ( ) {

                var tr = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] = ( ( tr & 0xF ) << 4 ) | ( ( tr & 0xF0 ) >> 4 );
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_b : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._b[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_c : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._c[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_d : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._d[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_e : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._e[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_h : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._h[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_l : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._l[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDr_a : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] += this._cpu._a[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ADDHL : [ function ( ) {

                var a = this._cpu._a[ 0 ];
                var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._a[ 0 ] += m;
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            ADDn : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._a[ 0 ] += m;
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] < a ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ a ^ m ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            ADDHLBC : [ function ( ) {

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

            }, 1 ],

            ADDHLDE : [ function ( ) {

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

            }, 1 ],

            ADDHLHL : [ function ( ) {

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

            }, 1 ],

            ADDHLSP : [ function ( ) {

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

            }, 1 ],

            ADDSPn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._sp[ 0 ] += i;

                this._cpu._m[ 0 ] = 4;

            }, 2 ],

            ADCr_b : [ function ( ) {

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

            }, 1 ],

            ADCr_c : [ function ( ) {

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

            }, 1 ],

            ADCr_d : [ function ( ) {

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

            }, 1 ],

            ADCr_e : [ function ( ) {

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

            }, 1 ],

            ADCr_h : [ function ( ) {

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

            }, 1 ],

            ADCr_l : [ function ( ) {

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

            }, 1 ],

            ADCr_a : [ function ( ) {

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

            }, 1 ],

            ADCHL : [ function ( ) {

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

            }, 1 ],

            ADCn : [ function ( ) {

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

            }, 2 ],

            SUBr_b : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._b[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_c : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._c[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_d : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._d[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_e : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._e[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_h : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._h[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_l : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._l[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBr_a : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                this._cpu._a[ 0 ] -= this._cpu._a[ 0 ];
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SUBHL : [ function ( ) {

                var a = this._cpu._a[ 0 ];
                var m = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._a[ 0 ] -= m;
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SUBn : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                var m = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._a[ 0 ] -= m;
                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] > a ? 0x50 : 0x40;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ m ^ a ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            SBCr_b : [ function ( ) {

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

            }, 1 ],

            SBCr_c : [ function ( ) {

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

            }, 1 ],

            SBCr_d : [ function ( ) {

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

            }, 1 ],

            SBCr_e : [ function ( ) {

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

            }, 1 ],

            SBCr_h : [ function ( ) {

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

            }, 1 ],

            SBCr_l : [ function ( ) {

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

            }, 1 ],

            SBCr_a : [ function ( ) {

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

            }, 1 ],

            SBCHL : [ function ( ) {

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

            }, 1 ],

            SBCn : [ function ( ) {

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

            }, 2 ],

            CPr_b : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._b[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._b[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_c : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._c[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._c[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_d : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._d[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._d[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_e : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._e[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._e[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_h : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._h[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._h[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_l : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._l[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._l[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPr_a : [ function ( ) {

                var i = this._cpu._a[ 0 ];
                i -= this._cpu._a[ 0 ];

                this._cpu._f[ 0 ] = ( i < 0 ) ? 0x50 : 0x40;
                i &= 0xFF;

                if ( !i )
                    this._cpu._f[ 0 ] |= 0x80;

                if ( ( this._cpu._a[ 0 ] ^ this._cpu._a[ 0 ] ^ i ) & 0x10 )
                    this._cpu._f[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            CPHL : [ function ( ) {

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

            }, 1 ],

            CPn : [ function ( ) {

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

            }, 2 ],

            DAA : [ function ( ) {

                var a = this._cpu._a[ 0 ];

                if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( ( this._cpu._a[ 0 ] & 15 ) > 9 ) )
                    this._cpu._a[ 0 ] += 6;

                if ( ( this._cpu._f[ 0 ] & 0x20 ) || ( a > 0x99 ) ) {

                    this._cpu._a[ 0 ] += 0x60;
                    this._cpu._f[ 0 ] |= 0x10;

                }

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_b : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._b[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_c : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._c[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_d : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._d[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_e : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._e[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_h : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._h[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_l : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._l[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDr_a : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._a[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ANDHL : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            ANDn : [ function ( ) {

                this._cpu._a[ 0 ] &= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            ORr_b : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._b[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_c : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._c[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_d : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._d[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_e : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._e[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_h : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._h[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_l : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._l[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORr_a : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._a[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            ORHL : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            ORn : [ function ( ) {

                this._cpu._a[ 0 ] |= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            XORr_b : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._b[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_c : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._c[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_d : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._d[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_e : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._e[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_h : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._h[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_l : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._l[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORr_a : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._a[ 0 ];

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            XORHL : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] );

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            XORn : [ function ( ) {

                this._cpu._a[ 0 ] ^= this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 2 ],

            INCr_b : [ function ( ) {

                this._cpu._b[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_c : [ function ( ) {

                this._cpu._c[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_d : [ function ( ) {

                this._cpu._d[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_e : [ function ( ) {

                this._cpu._e[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_h : [ function ( ) {

                this._cpu._h[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_l : [ function ( ) {

                this._cpu._l[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCr_a : [ function ( ) {

                this._cpu._a[ 0 ] += 1;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCHLm : [ function ( ) {

                var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) + 1 ) & 0xFF;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._f[ 0 ] = i ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            DECr_b : [ function ( ) {

                this._cpu._b[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._b[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_c : [ function ( ) {

                this._cpu._c[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._c[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_d : [ function ( ) {

                this._cpu._d[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._d[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_e : [ function ( ) {

                this._cpu._e[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._e[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_h : [ function ( ) {

                this._cpu._h[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._h[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_l : [ function ( ) {

                this._cpu._l[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._l[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECr_a : [ function ( ) {

                this._cpu._a[ 0 ] -= 1;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECHLm : [ function ( ) {

                var i = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) - 1 ) & 0xFF;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._f[ 0 ] = i ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            INCBC : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._c[ 0 ] + 1;

                if ( !this._cpu._c[ 0 ] )
                    this._cpu._b[ 0 ] = this._cpu._b[ 0 ] + 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCDE : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._e[ 0 ] + 1;

                if ( !this._cpu._e[ 0 ] )
                    this._cpu._d[ 0 ] = this._cpu._d[ 0 ] + 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCHL : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] + 1;

                if ( !this._cpu._l[ 0 ] )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] + 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            INCSP : [ function ( ) {

                this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] + 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECBC : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._c[ 0 ] - 1;

                if ( this._cpu._c[ 0 ] === 0xFF )
                    this._cpu._b[ 0 ] = this._cpu._b[ 0 ] - 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECDE : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._e[ 0 ] - 1;

                if ( this._cpu._e[ 0 ] === 0xFF )
                    this._cpu._d[ 0 ] = this._cpu._d[ 0 ] - 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECHL : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] - 1;

                if ( this._cpu._l[ 0 ] === 0xFF )
                    this._cpu._h[ 0 ] = this._cpu._h[ 0 ] - 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DECSP : [ function ( ) {

                this._cpu._sp[ 0 ] = this._cpu._sp[ 0 ] - 1;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            BIT0b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT0m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x01 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES0b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xFE;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES0m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFE;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET0b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x01;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET0m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x01;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT1b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT1m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x02 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES1b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xFD;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES1m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFD;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET1b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x02;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET1m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x02;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT2b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT2m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x04 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES2b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xFB;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES2m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xFB;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET2b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x04;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET2m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x04;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT3b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT3m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x08 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES3b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xF7;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES3m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xF7;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET3b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x08;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET3m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x08;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT4b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT4m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x10 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES4b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xEF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES4m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xEF;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET4b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET4m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x10;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT5b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT5m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x20 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES5b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xDF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES5m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xDF;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET5b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x20;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET5m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x20;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT6b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT6m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x40 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES6b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0xBF;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES6m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0xBF;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET6b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x40;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET6m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x40;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            BIT7b : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7c : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7d : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7e : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7h : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7l : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7a : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            BIT7m : [ function ( ) {

                // DUBIOUS
                this._cpu._f[ 0 ] &= 0x1F;
                this._cpu._f[ 0 ] |= 0x20;
                this._cpu._f[ 0 ] = ( this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x80 ) ? 0 : 0x80;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RES7b : [ function ( ) {

                this._cpu._b[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7c : [ function ( ) {

                this._cpu._c[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7d : [ function ( ) {

                this._cpu._d[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7e : [ function ( ) {

                this._cpu._e[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7h : [ function ( ) {

                this._cpu._h[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7l : [ function ( ) {

                this._cpu._l[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7a : [ function ( ) {

                this._cpu._a[ 0 ] &= 0x7F;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RES7m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) & 0x7F;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            SET7b : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7c : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7d : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7e : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7h : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7l : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7a : [ function ( ) {

                this._cpu._b[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SET7m : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ] ) | 0x80;
                this._cpu._engine._mmu.writeUint8( ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ], i );

                this._cpu._m[ 0 ] = 4;

            }, 1 ],

            RLA : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            RLCA : [ function ( ) {

                var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            RRA : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            RRCA : [ function ( ) {

                var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            RLr_b : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_c : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_d : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_e : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_h : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_l : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLr_a : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 1 : 0;
                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLHL : [ function ( ) {

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

            }, 1 ],

            RLCr_b : [ function ( ) {

                var ci = this._cpu._b[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_c : [ function ( ) {

                var ci = this._cpu._c[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_d : [ function ( ) {

                var ci = this._cpu._d[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_e : [ function ( ) {

                var ci = this._cpu._e[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_h : [ function ( ) {

                var ci = this._cpu._h[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_l : [ function ( ) {

                var ci = this._cpu._l[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCr_a : [ function ( ) {

                var ci = this._cpu._a[ 0 ] & 0x80 ? 1 : 0;
                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RLCHL : [ function ( ) {

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

            }, 1 ],

            RRr_b : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_c : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_d : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_e : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_h : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_l : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRr_a : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0x80 : 0;
                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRHL : [ function ( ) {

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

            }, 1 ],

            RRCr_b : [ function ( ) {

                var ci = this._cpu._b[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_c : [ function ( ) {

                var ci = this._cpu._c[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_d : [ function ( ) {

                var ci = this._cpu._d[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_e : [ function ( ) {

                var ci = this._cpu._e[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_h : [ function ( ) {

                var ci = this._cpu._h[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_l : [ function ( ) {

                var ci = this._cpu._l[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCr_a : [ function ( ) {

                var ci = this._cpu._a[ 0 ] & 1 ? 0x80 : 0;
                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) + ci;

                // DUBIOUS
                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            RRCHL : [ function ( ) {

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

            }, 1 ],

            SLAr_b : [ function ( ) {

                var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._b[ 0 ] = this._cpu._b[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_c : [ function ( ) {

                var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._c[ 0 ] = this._cpu._c[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_d : [ function ( ) {

                var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._d[ 0 ] = this._cpu._d[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_e : [ function ( ) {

                var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._e[ 0 ] = this._cpu._e[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_h : [ function ( ) {

                var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_l : [ function ( ) {

                var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLAr_a : [ function ( ) {

                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = this._cpu._a[ 0 ] << 1;

                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_b : [ function ( ) {

                var co = this._cpu._b[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_c : [ function ( ) {

                var co = this._cpu._c[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_d : [ function ( ) {

                var co = this._cpu._d[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_e : [ function ( ) {

                var co = this._cpu._e[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_h : [ function ( ) {

                var co = this._cpu._h[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_l : [ function ( ) {

                var co = this._cpu._l[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SLLr_a : [ function ( ) {

                var co = this._cpu._a[ 0 ] & 0x80 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] << 1 ) | 1;

                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_b : [ function ( ) {

                var ci = this._cpu._b[ 0 ] & 0x80;
                var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._b[ 0 ] = ( this._cpu._b[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_c : [ function ( ) {

                var ci = this._cpu._c[ 0 ] & 0x80;
                var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._c[ 0 ] = ( this._cpu._c[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_d : [ function ( ) {

                var ci = this._cpu._d[ 0 ] & 0x80;
                var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._d[ 0 ] = ( this._cpu._d[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_e : [ function ( ) {

                var ci = this._cpu._e[ 0 ] & 0x80;
                var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._e[ 0 ] = ( this._cpu._e[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_h : [ function ( ) {

                var ci = this._cpu._h[ 0 ] & 0x80;
                var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._h[ 0 ] = ( this._cpu._h[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_l : [ function ( ) {

                var ci = this._cpu._l[ 0 ] & 0x80;
                var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._l[ 0 ] = ( this._cpu._l[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRAr_a : [ function ( ) {

                var ci = this._cpu._a[ 0 ] & 0x80;
                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = ( this._cpu._a[ 0 ] >> 1 ) | ci;

                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_b : [ function ( ) {

                var co = this._cpu._b[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._b[ 0 ] = this._cpu._b[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._b[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_c : [ function ( ) {

                var co = this._cpu._c[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._c[ 0 ] = this._cpu._c[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._c[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_d : [ function ( ) {

                var co = this._cpu._d[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._d[ 0 ] = this._cpu._d[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._d[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_e : [ function ( ) {

                var co = this._cpu._e[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._e[ 0 ] = this._cpu._e[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._e[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_h : [ function ( ) {

                var co = this._cpu._h[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._h[ 0 ] = this._cpu._h[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._h[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_l : [ function ( ) {

                var co = this._cpu._l[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._l[ 0 ] = this._cpu._l[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._l[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            SRLr_a : [ function ( ) {

                var co = this._cpu._a[ 0 ] & 1 ? 0x10 : 0;

                this._cpu._a[ 0 ] = this._cpu._a[ 0 ] >> 1;

                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] ) ? 0 : 0x80;
                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | co;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            CPL : [ function ( ) {

                this._cpu._a[ 0 ] ^= 0xFF;

                this._cpu._f[ 0 ] = this._cpu._a[ 0 ] ? 0 : 0x80;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            NEG : [ function ( ) {

                this._cpu._a[ 0 ] = 0 - this._cpu._a[ 0 ];

                this._cpu._f[ 0 ] = ( this._cpu._a[ 0 ] < 0 ) ? 0x10 : 0;

                if ( !this._cpu._a[ 0 ] )
                    this._cpu._f[ 0 ] |= 0x80;

                this._cpu._m[ 0 ] = 2;

            }, 1 ],

            CCF : [ function ( ) {

                var ci = this._cpu._f[ 0 ] & 0x10 ? 0 : 0x10;

                this._cpu._f[ 0 ] = ( this._cpu._f[ 0 ] & 0xEF ) | ci;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            SCF : [ function ( ) {

                this._cpu._f[ 0 ] |= 0x10;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            PUSHBC : [ function ( ) {

                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._b[ 0 ] );
                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._c[ 0 ] );

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            PUSHDE : [ function ( ) {

                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._d[ 0 ] );
                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._e[ 0 ] );

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            PUSHHL : [ function ( ) {

                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._h[ 0 ] );
                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._l[ 0 ] );

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            PUSHAF : [ function ( ) {

                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._a[ 0 ] );
                this._cpu._sp[ 0 ] -= 1;
                this._cpu._engine._mmu.writeUint8( this._cpu._sp[ 0 ], this._cpu._f[ 0 ] );

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            POPBC : [ function ( ) {

                this._cpu._c[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;
                this._cpu._b[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            POPDE : [ function ( ) {

                this._cpu._e[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;
                this._cpu._d[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            POPHL : [ function ( ) {

                this._cpu._l[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;
                this._cpu._h[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            POPAF : [ function ( ) {

                this._cpu._f[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;
                this._cpu._a[ 0 ] = this._cpu._engine._mmu.readUint8( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 1;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            JPnn : [ function ( ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                this._cpu._m[ 0 ] = 3;

            }, 3 ],

            JPHL : [ function ( ) {

                this._cpu._pc[ 0 ] = ( this._cpu._h[ 0 ] << 8 ) + this._cpu._l[ 0 ];

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            JPNZnn : [ function ( ) {

                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                    this._cpu._m[ 0 ] += 1;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            JPZnn : [ function ( ) {

                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                    this._cpu._m[ 0 ] += 1;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            JPNCnn : [ function ( ) {

                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                    this._cpu._m[ 0 ] += 1;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            JPCnn : [ function ( ) {

                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                    this._cpu._m[ 0 ] += 1;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            JRn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._pc[ 0 ] += i;
                this._cpu._m[ 0 ] = 3;

            }, 2 ],

            JRNZn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._m[ 0 ] = 2;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] += i;
                    this._cpu._m[ 0 ] += 1;

                }

            }, 2 ],

            JRZn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._m[ 0 ] = 2;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                    this._cpu._pc[ 0 ] += i;
                    this._cpu._m[ 0 ] += 1;

                }

            }, 2 ],

            JRNCn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._m[ 0 ] = 2;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] += i;
                    this._cpu._m[ 0 ] += 1;

                }

            }, 2 ],

            JRCn : [ function ( ) {

                var i = this._cpu._engine._mmu.readUint8( this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] += 1;

                if ( i > 127 )
                    i = -( ( ~i + 1 ) & 0xFF );

                this._cpu._m[ 0 ] = 2;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                    this._cpu._pc[ 0 ] += i;
                    this._cpu._m[ 0 ] += 1;

                }

            }, 2 ],

            DJNZn : [ function ( ) {

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

            }, 2 ],

            CALLnn : [ function ( ) {

                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                this._cpu._m[ 0 ] = 5;

            }, 3 ],

            CALLNZnn : [ function ( ) {


                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                    this._cpu._sp[ 0 ] -= 2;
                    this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                    this._cpu._m[ 0 ] += 2;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            CALLZnn : [ function ( ) {


                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                    this._cpu._sp[ 0 ] -= 2;
                    this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                    this._cpu._m[ 0 ] += 2;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            CALLNCnn : [ function ( ) {


                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                    this._cpu._sp[ 0 ] -= 2;
                    this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );

                    this._cpu._m[ 0 ] += 2;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            CALLCnn : [ function ( ) {


                this._cpu._m[ 0 ] = 3;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                    this._cpu._sp[ 0 ] -= 2;
                    this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] + 2 );
                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._pc[ 0 ] );
                    this._cpu._m[ 0 ] += 2;

                } else {

                    this._cpu._pc[ 0 ] += 2;

                }

            }, 3 ],

            RET : [ function ( ) {

                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RETI : [ function ( ) {

                this._cpu._ime = true;
                this._rrs( );
                this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                this._cpu._sp[ 0 ] += 2;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RETNZ : [ function ( ) {

                this._cpu._m[ 0 ] = 1;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                    this._cpu._sp[ 0 ] += 2;

                    this._cpu._m[ 0 ] += 2;

                }
            }, 1 ],

            RETZ : [ function ( ) {

                this._cpu._m[ 0 ] = 1;

                if ( ( this._cpu._f[ 0 ] & 0x80 ) == 0x80 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                    this._cpu._sp[ 0 ] += 2;
                    this._cpu._m[ 0 ] += 2;

                }
            }, 1 ],

            RETNC : [ function ( ) {

                this._cpu._m[ 0 ] = 1;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x00 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                    this._cpu._sp[ 0 ] += 2;
                    this._cpu._m[ 0 ] += 2;

                }
            }, 1 ],

            RETC : [ function ( ) {

                this._cpu._m[ 0 ] = 1;

                if ( ( this._cpu._f[ 0 ] & 0x10 ) == 0x10 ) {

                    this._cpu._pc[ 0 ] = this._cpu._engine._mmu.readUint16( this._cpu._sp[ 0 ] );
                    this._cpu._sp[ 0 ] += 2;
                    this._cpu._m[ 0 ] += 2;

                }
            }, 1 ],

            RST00 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x00;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST08 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x08;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST10 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x10;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST18 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x18;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST20 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x20;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST28 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x28;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST30 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x30;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST38 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x38;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST40 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x40;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST48 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x48;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST50 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x50;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST58 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x58;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            RST60 : [ function ( ) {

                this._rsv( );
                this._cpu._sp[ 0 ] -= 2;
                this._cpu._engine._mmu.writeUint16( this._cpu._sp[ 0 ], this._cpu._pc[ 0 ] );
                this._cpu._pc[ 0 ] = 0x60;

                this._cpu._m[ 0 ] = 3;

            }, 1 ],

            NOP : [ function ( ) {

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            HALT : [ function ( ) {

                this._cpu._halt = true;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            DI : [ function ( ) {

                this._cpu._ime = false;

                this._cpu._m[ 0 ] = 1;

            }, 1 ],

            EI : [ function ( ) {

                this._cpu._ime = true;

                this._cpu._m[ 0 ] = 1;

            }, 1 ]

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

        }

    } );

} );
