/*global define, preprocess*/

define( [

    'virtjs'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( ) {

        },

        unprefixed : {

            // ex: ADC b, 0x12
            ADC_r_n : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;

                    if      ( ( rAfter & 0xF ) < ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) < ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter < rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry < rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'adc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADC b, b
            ADC_r_r : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += preprocess.parameters[ 1 ][ 0 ];
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;

                    if      ( ( rAfter & 0xF ) < ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) < ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter < rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry < rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'adc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADC b, (de)
            ADC_r_rrm : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += this._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;


                    if      ( ( rAfter & 0xF ) < ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) < ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter < rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry < rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'adc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, 0x12
            ADD_r_n : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( rBefore & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( rBefore > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'add ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, b
            ADD_r_r : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += preprocess.parameters[ 1 ][ 0 ];
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( rBefore & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( rBefore > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, (de)
            ADD_r_rrm : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += this._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( rBefore & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( rBefore > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD de, de
            ADD_rr_rr : {

                command : function ( ) {

                    var rrBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += preprocess.parameters[ 1 ][ 0 ];
                    var rrAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( ( rrBefore & 0xFFF ) > ( rrAfter & 0xFFF ) ) this._f[ 0 ] |=   0x20;
                    else                                              this._f[ 0 ] &= ~ 0x20;

                    if ( rrBefore > rrAfter )                         this._f[ 0 ] |=   0x10;
                    else                                              this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD sp, +10
            ADD_rr_sn : {

                command : function ( ) {

                    var sn = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    var rrBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += sn;
                    var rrAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 4;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( ( rrBefore & 0xF ) > ( rrAfter & 0xF ) )   this._f[ 0 ] |=   0x20;
                    else                                            this._f[ 0 ] &= ~ 0x20;

                    if ( ( rrBefore & 0xFF ) > ( rrAfter & 0xFF ) ) this._f[ 0 ] |=   0x10;
                    else                                            this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'add ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND 0x12
            AND_n : {

                command : function ( ) {

                    this._a[ 0 ] &= this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._f[ 0 ]  = this._a[ 0 ] ? 0 : 0x80;
                    this._f[ 0 ] |= 0x20;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'and ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND b
            AND_r : {

                command : function ( ) {

                    this._a[ 0 ] &= preprocess.parameters[ 0 ][ 0 ];

                    this._f[ 0 ]  = this._a[ 0 ] ? 0 : 0x80;
                    this._f[ 0 ] |= 0x20;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'and ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND (de)
            AND_rrm : {

                command : function ( ) {

                    this._a[ 0 ] &= this._engine._mmu.readUint16( preprocess.parameters[ 0 ][ 0 ] );

                    this._f[ 0 ]  = this._a[ 0 ] ? 0 : 0x80;
                    this._f[ 0 ] |= 0x20;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'and ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL C, 0x1234
            CALL_C_nn : {

                command : function ( ) {

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x10 ) {

                        this._sp[ 0 ] -= 2;

                        this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] + 2 );
                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                        this._m[ 0 ] += 3;

                    } else {

                        this._pc[ 0 ] += 2;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call c ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL NC, 0x1234
            CALL_NC_nn : {

                command : function ( ) {

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x00 ) {

                        this._sp[ 0 ] -= 2;

                        this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] + 2 );
                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                        this._m[ 0 ] += 3;

                    } else {

                        this._pc[ 0 ] += 2;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call nc ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL NZ, 0x1234
            CALL_NZ_nn : {

                command : function ( ) {

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x00 ) {

                        this._sp[ 0 ] -= 2;

                        this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] + 2 );
                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                        this._m[ 0 ] += 3;

                    } else {

                        this._pc[ 0 ] += 2;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call nz ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL Z, 0x1234
            CALL_Z_nn : {

                command : function ( ) {

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x10 ) {

                        this._sp[ 0 ] -= 2;

                        this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] + 2 );
                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                        this._m[ 0 ] += 3;

                    } else {

                        this._pc[ 0 ] += 2;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call z ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL 0x1234
            CALL_nn : {

                command : function ( ) {

                    this._sp[ 0 ] -= 2;

                    this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] + 2 );
                    this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                    this._m[ 0 ] = 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CCF
            CCF : {

                command : function ( ) {

                    this._f[ 0 ] ^=   0x10;
                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ccf'
                    };

                }

            },

            // ex: CPL
            CPL : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (CPL)' );

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cpl'
                    };

                }

            },

            // ex: CP 0x12
            CP_n : {

                command : function ( ) {

                    var a = this._a[ 0 ];
                    var n = this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    var cmp = ( a - n ) & 0xFF;

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] = 0x40;

                    if ( cmp === 0 )                   this._f[ 0 ] |=   0x80;
                    else                               this._f[ 0 ] &= ~ 0x80;

                    if ( ( cmp & 0xF ) > ( a & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                               this._f[ 0 ] &= ~ 0x20;

                    if ( cmp > a )                     this._f[ 0 ] |=   0x10;
                    else                               this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'cp ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CP b
            CP_r : {

                command : function ( ) {

                    var a = this._a[ 0 ];
                    var r = preprocess.parameters[ 0 ];

                    var cmp = ( a - r ) & 0xFF;

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] = 0x40;

                    if ( cmp === 0 )                   this._f[ 0 ] |=   0x80;
                    else                               this._f[ 0 ] &= ~ 0x80;

                    if ( ( cmp & 0xF ) > ( a & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                               this._f[ 0 ] &= ~ 0x20;

                    if ( cmp > a )                     this._f[ 0 ] |=   0x10;
                    else                               this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cp ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: CP (de)
            CP_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (CP_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cp ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: DAA
            DAA : {

                command : function ( ) {

                    var aBefore = this._a[ 0 ];

                    var correction = 0;

                    if ( aBefore > 0x99 || ( this._f[ 0 ] & 0x10 ) === 0x10 ) {
                        correction |= 0x60;
                        this._f[ 0 ] |= 0x10;
                    } else {
                        this._f[ 0 ] &= ~ 0x10;
                    }

                    if ( ( aBefore & 0x0F ) > 0x09 || ( this._f[ 0 ] & 0x20 ) === 0x20 )
                        correction |= 0x06;

                    if ( ( this._f[ 0 ] & 0x40 ) === 0x00 ) {
                        this._a[ 0 ] += correction;
                    } else {
                        this._a[ 0 ] -= correction;
                    }

                    var aAfter = this._a[ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    if ( aAfter === 0 )                this._f[ 0 ] |=   0x80;
                    else                               this._f[ 0 ] &= ~ 0x80;

                    if ( ( aBefore ^ aAfter ) & 0x10 ) this._f[ 0 ] |=   0x20;
                    else                               this._f[ 0 ] &= ~ 0x20;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'daa'
                    };

                }

            },

            // ex: DEC b
            DEC_r : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( rAfter === 0 )             this._f[ 0 ] |=   0x80;
                    else                            this._f[ 0 ] &= ~ 0x80;

                    if ( ( rAfter & 0xF ) === 0xF ) this._f[ 0 ] |=   0x20;
                    else                            this._f[ 0 ] &= ~ 0x20;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: DEC de
            DEC_rr : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] -= 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: DEC (de)
            DEC_rrm : {

                command : function ( ) {

                    var rrmBefore = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );
                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], rrmBefore - 1 );
                    var rrmAfter = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );

                    this._m[ 0 ] = 3;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( rrmAfter === 0 )             this._f[ 0 ] |=   0x80;
                    else                              this._f[ 0 ] &= ~ 0x80;

                    if ( ( rrmAfter & 0xF ) === 0xF ) this._f[ 0 ] |=   0x20;
                    else                              this._f[ 0 ] &= ~ 0x20;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: DI
            DI : {

                command : function ( ) {

                    this._ime = false;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'di'
                    };

                }

            },

            // ex: EI
            EI : {

                command : function ( ) {

                    this._ime = true;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ei'
                    };

                }

            },

            // ex: HALT
            HALT : {

                command : function ( ) {

                    this._halt = true;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'halt'
                    };

                }

            },

            // ex: INC b
            INC_r : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] += 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfter === 0 )             this._f[ 0 ] |=   0x80;
                    else                            this._f[ 0 ] &= ~ 0x80;

                    if ( ( rAfter & 0xF ) === 0x0 ) this._f[ 0 ] |=   0x20;
                    else                            this._f[ 0 ] &= ~ 0x20;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: INC de
            INC_rr : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] += 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: INC (de)
            INC_rrm : {

                command : function ( ) {

                    var rrmBefore = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );
                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], rrmBefore + 1 );
                    var rrmAfter = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );

                    this._m[ 0 ] = 3;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;

                    if ( rrmAfter === 0 )             this._f[ 0 ] |=   0x80;
                    else                              this._f[ 0 ] &= ~ 0x80;

                    if ( ( rrmAfter & 0xF ) === 0x0 ) this._f[ 0 ] |=   0x20;
                    else                              this._f[ 0 ] &= ~ 0x20;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP C, 0x1234
            JP_C_nn : {

                command : function ( ) {

                    var address = this._engine._mmu.readUint16( this._pc[ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x10 ) {

                        this._pc[ 0 ] = address;

                        this._m[ 0 ] += 1;

                    }


                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp c ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP NC, 0x1234
            JP_NC_nn : {

                command : function ( ) {

                    var address = this._engine._mmu.readUint16( this._pc[ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x00 ) {

                        this._pc[ 0 ] = address;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp nc ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP NZ, 0x1234
            JP_NZ_nn : {

                command : function ( ) {

                    var address = this._engine._mmu.readUint16( this._pc[ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x00 ) {

                        this._pc[ 0 ] = address;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp nz ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP Z, 0x1234
            JP_Z_nn : {

                command : function ( ) {

                    var address = this._engine._mmu.readUint16( this._pc[ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x80 ) {

                        this._pc[ 0 ] = address;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp z ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP 0x1234
            JP_nn : {

                command : function ( ) {

                    this._pc[ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP de
            JP_rr : {

                command : function ( ) {

                    this._pc[ 0 ] = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'jp ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR b, +10
            JR_C_sn : {

                command : function ( ) {

                    var relativeOffset = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x10 ) {

                        this._pc[ 0 ] += relativeOffset;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr c ' + [
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR NC, +10
            JR_NC_sn : {

                command : function ( ) {

                    var relativeOffset = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x00 ) {

                        this._pc[ 0 ] += relativeOffset;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr nc ' + [
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR NZ, +10
            JR_NZ_sn : {

                command : function ( ) {

                    var relativeOffset = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x00 ) {

                        this._pc[ 0 ] += relativeOffset;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr nz ' + [
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR Z, +10
            JR_Z_sn : {

                command : function ( ) {

                    var relativeOffset = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x80 ) {

                        this._pc[ 0 ] += relativeOffset;

                        this._m[ 0 ] += 1;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr z ' + [
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR +10
            JR_sn : {

                command : function ( ) {

                    var relativeOffset = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._pc[ 0 ] += relativeOffset;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr ' + [
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDD b, (de)
            LDD_r_rrm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._cpu._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );

                    preprocess.parameters[ 1 ][ 0 ] -= 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldd ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDD (de), b
            LDD_rrm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], preprocess.parameters[ 1 ][ 0 ] );

                    preprocess.parameters[ 0 ][ 0 ] -= 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldd ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')',
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDHL de, +10
            LDHL_rr_sn : {

                command : function ( ) {

                    var sn = this._engine._mmu.readInt8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._hl[ 0 ] = preprocess.parameters[ 0 ][ 0 ];

                    var hlBefore = this._hl[ 0 ];
                    this._hl[ 0 ] += sn;
                    var hlAfter = this._hl[ 0 ];

                    this._m[ 0 ] = 3;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( ( hlBefore & 0xF ) > ( hlAfter & 0xF ) )   this._f[ 0 ] |=   0x20;
                    else                                            this._f[ 0 ] &= ~ 0x20;

                    if ( ( hlBefore & 0xFF ) > ( hlAfter & 0xFF ) ) this._f[ 0 ] |=   0x10;
                    else                                            this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldhl ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.decimal( this._engine._mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDH (0x10), b
            LDH_nm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( 0xFF00 + this._engine._mmu.readUint8( this._pc[ 0 ] ), preprocess.parameters[ 0 ][ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldh ' + [
                            '(' + Virtjs.FormatUtil.address( 0xFF00, 16 ) + '+' + Virtjs.FormatUtil.address( this._engine._mmu.readInt8( address ), 8 ) + ')',
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDH b, (0x10)
            LDH_r_nm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( 0xFF00 + this._engine._mmu.readUint8( this._pc[ 0 ] ) );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldh ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + Virtjs.FormatUtil.address( 0xFF00, 16 ) + '+' + Virtjs.FormatUtil.address( this._engine._mmu.readInt8( address ), 8 ) + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDI b, (de)
            LDI_r_rrm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );

                    preprocess.parameters[ 1 ][ 0 ] += 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldi ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDI (de), b
            LDI_rrm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], preprocess.parameters[ 1 ][ 0 ] );

                    preprocess.parameters[ 0 ][ 0 ] += 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldi ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')',
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (0xFF10), b
            LD_nnm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( this._engine._mmu.readUint16( this._pc[ 0 ] ), preprocess.parameters[ 0 ][ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 ),
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (0xFF10), de
            LD_nnm_rr : {

                command : function ( ) {

                    this._engine._mmu.writeUint16( this._engine._mmu.readUint16( this._pc[ 0 ] ), preprocess.parameters[ 0 ][ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 5;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 ),
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, 0x12
            LD_r_n : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (0xFF10)
            LD_r_nnm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( this._engine._mmu.readUint16( this._pc[ 0 ] ) );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.address( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, b
            LD_r_r : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = preprocess.parameters[ 1 ][ 0 ];

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (b)
            LD_r_rm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( 0xFF00 + preprocess.parameters[ 1 ][ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + Virtjs.FormatUtil.address( 0xFF00, 16 ) + '+' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (de)
            LD_r_rrm : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (b), b
            LD_rm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( 0xFF00 + preprocess.parameters[ 0 ][ 0 ], preprocess.parameters[ 1 ][ 0 ] );

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            '(' + Virtjs.FormatUtil.address( 0xFF00, 16 ) + '+' + preprocess.parameters[ 0 ].xRegister + ')',
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD de, 0x1234
            LD_rr_nn : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint16( this._pc[ 0 ] );
                    this._pc[ 0 ] += 2;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD de, de
            LD_rr_rr : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = preprocess.parameters[ 1 ][ 0 ];

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (de), 0x12
            LD_rrm_n : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], this._engine._mmu.readUint8( this._pc[ 0 ] ) );
                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ld ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')',
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (de), b
            LD_rrm_r : {

                command : function ( ) {

                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], preprocess.parameters[ 1 ][ 0 ] );

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')',
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: NOP
            NOP : {

                command : function ( ) {

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'nop'
                    };

                }

            },

            // ex: OR 0x12
            OR_n : {

                command : function ( ) {

                    this._a[ 0 ] |= this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'or ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: OR b
            OR_r : {

                command : function ( ) {


                    this._a[ 0 ] |= preprocess.parameters[ 0 ][ 0 ];

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'or ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: OR (de)
            OR_rrm : {

                command : function ( ) {

                    this._a[ 0 ] |= this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'or ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: POP de
            POP_rr : {

                command : function ( ) {

                    preprocess.parameters[ 0 ][ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ], preprocess.parameters[ 0 ][ 0 ] );
                    this._sp[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'pop ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: PREFIX CB
            PREFIX_CB : {

                command : function ( ) {

                    var opcode = this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    var instruction = this._instructionMap.cbprefixed[ opcode ];
                    instruction( );

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'prefix cb'
                    };

                }

            },

            // ex: PUSH de
            PUSH_rr : {

                command : function ( ) {

                    this._sp[ 0 ] -= 2;
                    this._engine._mmu.writeUint16( this._sp[ 0 ], preprocess.parameters[ 0 ][ 0 ] );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'push ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RET
            RET : {

                command : function ( ) {

                    this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                    this._sp[ 0 ] += 2;

                    this._m[ 0 ] = 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret'
                    };

                }

            },

            // ex: RETI
            RETI : {

                command : function ( ) {

                    this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                    this._sp[ 0 ] += 2;

                    this._ime = true;

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'reti'
                    };

                }

            },

            // ex: RET NC
            RET_NC : {

                command : function ( ) {

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x00 ) {

                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                        this._sp[ 0 ] += 2;

                        this._m[ 0 ] += 3;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret nc'
                    };

                }

            },

            // ex: RET NZ
            RET_NZ : {

                command : function ( ) {

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x00 ) {

                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                        this._sp[ 0 ] += 2;

                        this._m[ 0 ] += 3;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret nz'
                    };

                }

            },

            // ex: RET Z
            RET_Z : {

                command : function ( ) {

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x80 ) === 0x80 ) {

                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                        this._sp[ 0 ] += 2;

                        this._m[ 0 ] += 3;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret z'
                    };

                }

            },

            // ex: RET b
            RET_C : {

                command : function ( ) {

                    this._m[ 0 ] = 2;

                    if ( ( this._f[ 0 ] & 0x10 ) === 0x10 ) {

                        this._pc[ 0 ] = this._engine._mmu.readUint16( this._sp[ 0 ] );
                        this._sp[ 0 ] += 2;

                        this._m[ 0 ] += 3;

                    }

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret c'
                    };

                }

            },

            // ex: RLA
            RLA : {

                command : function ( ) {

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] <<= 1;

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( aBefore & 0x80 ) this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rla'
                    };

                }

            },

            // ex: RLCA
            RLCA : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] <<= 1;
                    this._a[ 0 ] += carryIn;

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( aBefore & 0x80 ) this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rlca'
                    };

                }

            },

            // ex: RRA
            RRA : {

                command : function ( ) {

                    var carry = this._f[ 0 ] & 0x10 ? 1 : 0;

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] >>= 1;
                    this._a[ 0 ] |= carry << 7;

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( aBefore & 0x01 ) this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rra'
                    };

                }

            },

            // ex: RRCA
            RRCA : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x40 ) ? 1 : 0;

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] >>= 1;
                    this._a[ 0 ] += carryIn;

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x80;

                    if ( aBefore & 0x01 ) this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rrca'
                    };

                }

            },

            // ex: RST 00H
            RST_00H : {

                command : function ( ) {

                    this._sp[ 0 ] -= 2;
                    this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] );

                    this._pc[ 0 ] = 0x00;

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 00h'
                    };

                }

            },

            // ex: RST 08H
            RST_08H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_08H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 08h'
                    };

                }

            },

            // ex: RST 10H
            RST_10H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_10H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 10h'
                    };

                }

            },

            // ex: RST 18H
            RST_18H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_18H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 18h'
                    };

                }

            },

            // ex: RST 20H
            RST_20H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_20H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 20h'
                    };

                }

            },

            // ex: RST 28H
            RST_28H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_28H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 28h'
                    };

                }

            },

            // ex: RST 30H
            RST_30H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_30H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 30h'
                    };

                }

            },

            // ex: RST 38H
            RST_38H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_38H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 38h'
                    };

                }

            },

            // ex: RST 40H
            RST_40H : {

                command : function ( ) {

                    this._ime = false;

                    this._sp[ 0 ] -= 2;
                    this._engine._mmu.writeUint16( this._sp[ 0 ], this._pc[ 0 ] );

                    this._pc[ 0 ] = 0x40;

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 40h'
                    };

                }

            },

            // ex: RST 48H
            RST_48H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_48H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 48h'
                    };

                }

            },

            // ex: RST 50H
            RST_50H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_50H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 50h'
                    };

                }

            },

            // ex: RST 58H
            RST_58H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_58H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 58h'
                    };

                }

            },

            // ex: RST 60H
            RST_60H : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RST_60H)' );

                    this._m[ 0 ] = 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst 60h'
                    };

                }

            },

            // ex: SBC b, 0x12
            SBC_r_n : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;

                    if      ( ( rAfter & 0xF ) > ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter > rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sbc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: SBC b, b
            SBC_r_r : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= preprocess.parameters[ 1 ][ 0 ];
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;

                    if      ( ( rAfter & 0xF ) > ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter > rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sbc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            preprocess.parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SBC b, (de)
            SBC_r_rrm : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= this._engine._mmu.readUint8( preprocess.parameters[ 1 ][ 0 ] );
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( rAfterCarry === 0 )                             this._f[ 0 ] |=   0x80;
                    else                                                 this._f[ 0 ] &= ~ 0x80;


                    if      ( ( rAfter & 0xF ) > ( rBefore & 0xF ) )     this._f[ 0 ] |=   0x20;
                    else if ( ( rAfterCarry & 0xF ) > ( rAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                                 this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter > rBefore )                              this._f[ 0 ] |=   0x10;
                    else if ( rAfterCarry > rAfter )                     this._f[ 0 ] |=   0x10;
                    else                                                 this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sbc ' + [
                            preprocess.parameters[ 0 ].xRegister,
                            '(' + preprocess.parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SCF
            SCF : {

                command : function ( ) {

                    this._f[ 0 ] |=   0x10;
                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'scf'
                    };

                }

            },

            // ex: STOP 0
            STOP_0 : {

                command : function ( ) {

                    console.warn( 'Warning : STOP_0 is a stub' );

                    this._pc[ 0 ] += 1;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'stop 0'
                    };

                }

            },

            // ex: SUB 0x12
            SUB_n : {

                command : function ( ) {

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] -= this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;
                    var aAfter = this._a[ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( aAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( aAfter & 0xF ) > ( aBefore & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( aAfter > aBefore )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sub ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: SUB b
            SUB_r : {

                command : function ( ) {

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] -= preprocess.parameters[ 0 ][ 0 ];
                    var aAfter = this._a[ 0 ];

                    this._m[ 0 ] = 1;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( aAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( aAfter & 0xF ) > ( aBefore & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( aAfter > aBefore )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sub ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SUB (de)
            SUB_rrm : {

                command : function ( ) {

                    var aBefore = this._a[ 0 ];
                    this._a[ 0 ] -= this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );
                    var aAfter = this._a[ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] |= 0x40;

                    if ( aAfter === 0 )                         this._f[ 0 ] |=   0x80;
                    else                                        this._f[ 0 ] &= ~ 0x80;

                    if ( ( aBefore & 0xF ) < ( aAfter & 0xF ) ) this._f[ 0 ] |=   0x20;
                    else                                        this._f[ 0 ] &= ~ 0x20;

                    if ( aBefore < aAfter )                     this._f[ 0 ] |=   0x10;
                    else                                        this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sub ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR 0x12
            XOR_n : {

                command : function ( ) {

                    this._a[ 0 ] ^= this._engine._mmu.readUint8( this._pc[ 0 ] );
                    this._pc[ 0 ] += 1;

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'xor ' + [
                            Virtjs.FormatUtil.hexadecimal( this._engine._mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR b
            XOR_r : {

                command : function ( ) {

                    this._a[ 0 ] ^= preprocess.parameters[ 0 ][ 0 ];

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'xor ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR (de)
            XOR_rrm : {

                command : function ( ) {

                    this._a[ 0 ] ^= this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );

                    this._f[ 0 ] = this._a[ 0 ] ? 0 : 0x80;

                    this._m[ 0 ] = 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'xor ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            }

        },

        cbprefixed : {

            // ex: BIT 0, b
            BIT_0_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_0_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 0 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 0, (de)
            BIT_0_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_0_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 0 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 1, b
            BIT_1_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_1_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 1 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 1, (de)
            BIT_1_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_1_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 1 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 2, b
            BIT_2_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_2_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 2 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 2, (de)
            BIT_2_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_2_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 2 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 3, b
            BIT_3_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_3_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 3 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 3, (de)
            BIT_3_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_3_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 3 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 4, b
            BIT_4_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_4_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 4 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 4, (de)
            BIT_4_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_4_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 4 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 5, b
            BIT_5_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_5_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 5 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 5, (de)
            BIT_5_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_5_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 5 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 6, b
            BIT_6_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_6_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 6 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 6, (de)
            BIT_6_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_6_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 6 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 7, b
            BIT_7_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_7_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 7 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 7, (de)
            BIT_7_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (BIT_7_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit 7 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 0, b
            RES_0_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_0_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 0 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 0, (de)
            RES_0_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_0_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 0 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 1, b
            RES_1_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_1_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 1 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 1, (de)
            RES_1_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_1_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 1 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 2, b
            RES_2_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_2_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 2 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 2, (de)
            RES_2_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_2_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 2 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 3, b
            RES_3_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_3_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 3 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 3, (de)
            RES_3_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_3_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 3 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 4, b
            RES_4_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_4_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 4 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 4, (de)
            RES_4_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_4_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 4 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 5, b
            RES_5_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_5_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 5 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 5, (de)
            RES_5_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_5_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 5 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 6, b
            RES_6_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_6_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 6 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 6, (de)
            RES_6_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_6_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 6 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 7, b
            RES_7_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_7_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 7 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 7, (de)
            RES_7_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RES_7_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res 7 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RLC b
            RLC_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RLC_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rlc ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RLC (de)
            RLC_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RLC_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rlc ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RL b
            RL_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RL_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rl ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RL (de)
            RL_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RL_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rl ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RRC b
            RRC_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RRC_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rrc ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RRC (de)
            RRC_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RRC_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rrc ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RR b
            RR_r : {

                command : function ( ) {

                    var carryIn = ( this._f[ 0 ] & 0x10 ) ? 1 : 0;

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] >>= 1;
                    preprocess.parameters[ 0 ][ 0 ] |= carryIn << 7;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter === 0 )   this._f[ 0 ] |=   0x80;
                    else                  this._f[ 0 ] &= ~ 0x80;

                    if ( rBefore & 0x01 ) this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rr ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RR (de)
            RR_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (RR_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rr ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 0, b
            SET_0_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_0_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 0 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 0, (de)
            SET_0_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_0_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 0 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 1, b
            SET_1_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_1_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 1 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 1, (de)
            SET_1_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_1_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 1 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 2, b
            SET_2_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_2_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 2 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 2, (de)
            SET_2_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_2_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 2 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 3, b
            SET_3_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_3_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 3 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 3, (de)
            SET_3_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_3_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 3 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 4, b
            SET_4_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_4_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 4 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 4, (de)
            SET_4_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_4_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 4 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 5, b
            SET_5_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_5_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 5 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 5, (de)
            SET_5_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_5_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 5 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 6, b
            SET_6_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_6_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 6 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 6, (de)
            SET_6_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_6_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 6 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 7, b
            SET_7_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_7_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 7 ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 7, (de)
            SET_7_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SET_7_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set 7 ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SLA b
            SLA_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SLA_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sla ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SLA (de)
            SLA_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SLA_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sla ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRA b
            SRA_r : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SRA_r)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sra ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRA (de)
            SRA_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SRA_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sra ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRL b
            SRL_r : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ][ 0 ];
                    preprocess.parameters[ 0 ][ 0 ] >>= 1;
                    var rAfter = preprocess.parameters[ 0 ][ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x20;

                    if ( rAfter === 0 ) this._f[ 0 ] |=   0x80;
                    else                this._f[ 0 ] &= ~ 0x80;

                    if ( rBefore & 1 )  this._f[ 0 ] |=   0x10;
                    else                this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'srl ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRL (de)
            SRL_rrm : {

                command : function ( ) {

                    var rrmBefore = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );
                    this._engine._mmu.writeUint8( preprocess.parameters[ 0 ][ 0 ], rrmBefore >> 1 );
                    var rrmAfter = this._engine._mmu.readUint8( preprocess.parameters[ 0 ][ 0 ] );

                    this._m[ 0 ] = 4;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x40;
                    this._f[ 0 ] &= ~ 0x20;

                    if ( rrmAfter === 0 ) this._f[ 0 ] |=   0x80;
                    else                  this._f[ 0 ] &= ~ 0x80;

                    if ( rrmBefore & 1 )  this._f[ 0 ] |=   0x10;
                    else                  this._f[ 0 ] &= ~ 0x10;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'srl ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SWAP b
            SWAP_r : {

                command : function ( ) {

                    var rBefore = preprocess.parameters[ 0 ];
                    preprocess.parameters[ 0 ] = ( rBefore << 4 ) | ( rBefore >> 4 );
                    var rAfter = preprocess.parameters[ 0 ];

                    this._m[ 0 ] = 2;

                    // Set flags

                    this._f[ 0 ] &= ~ 0x10;
                    this._f[ 0 ] &= ~ 0x20;
                    this._f[ 0 ] &= ~ 0x40;

                    if ( rAfter === 0 ) this._f[ 0 ] |=   0x80;
                    else                this._f[ 0 ] &= ~ 0x80;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'swap ' + [
                            preprocess.parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SWAP (de)
            SWAP_rrm : {

                command : function ( ) {

                    throw new Error( 'Unimplemented (SWAP_rrm)' );

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'swap ' + [
                            '(' + preprocess.parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            }

        }

    } );

} );
