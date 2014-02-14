/*global Virtjs, define, preprocess*/

define( [

    './cpu/InstructionMap',
    './cpu/InstructionSet'

], function ( InstructionMap, InstructionSet ) {

    return Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( engine ) {

            this._engine = engine;

            this._instructionSet = new InstructionSet( this );
            this._instructionMap = Object.keys( InstructionMap ).reduce( function ( remap, key ) {

                remap[ key ] = InstructionMap[ key ].map( function ( name ) {
                    return name ? this._instructionSet[ name ] : undefined;
                }.bind( this ) );

                return remap;

            }.bind( this ), { } );

            // This line will setup the right branches when used by the build tool
            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._engine._options );

        },

        setup : function ( ) {

            // Halt Inner Register
            this._halt = false;

            // Interruptions Enable Flag
            this._ime = true;

            // Interruptions (0: enabled, 1: requested)
            this._interruptions = new Uint8Array( 2 );

            // Standard Registers
            this._a = new Uint8Array( 1 );
            this._b = new Uint8Array( 1 );
            this._c = new Uint8Array( 1 );
            this._d = new Uint8Array( 1 );
            this._e = new Uint8Array( 1 );
            this._h = new Uint8Array( 1 );
            this._l = new Uint8Array( 1 );

            // Flags Register
            this._f = new Uint8Array( 1 );

            // Stack Pointer
            this._sp = new Uint16Array( 1 );

            // Program Count
            this._pc = new Uint16Array( 1 );

            // Cycle Register
            this._m = new Uint8Array( 1 );

            // Instruction count
            this._count = 0;

        },

        step : function ( ) {

            if ( this._halt ) {

                this._m[ 0 ] = 1;

            } else {

                var address = this._pc[ 0 ];
                this._pc[ 0 ] += 1;

                var opcode = this._engine._mmu.readUint8( address );
                var instruction = this._instructionMap.standard[ opcode ];

                if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'instruction' ) !== - 1 )
                    this.emit( 'instruction', { count : this._count, address : address, opcode : opcode, instruction : instruction } );

                instruction( );
                this._count += 1;

            }

            this._engine._gpu.step( );
            this._engine._timer.step( );
            this._m[ 0 ] = 0;

            if ( this._ime && this._interruptions[ 0 ] && this._interruptions[ 1 ] ) {

                var firedInterruptions = this._interruptions[ 0 ] & this._interruptions[ 1 ];

                this._ime = false;

                if ( firedInterruptions & 0x01 ) {
                    this._interruptions[ 1 ] &= 0x01 ^ 0xFF;
                    this._instructionSet.RST40( );
                } else if ( firedInterruptions & 0x04 ) {
                    this._interruptions[ 1 ] &= 0x04 ^ 0xFF;
                    this._instructionSet.RST50( );
                } else if ( firedInterruptions & 0x10 ) {
                    this._interruptions[ 1 ] &= 0x10 ^ 0xFF;
                    this._instructionSet.RST60( );
                } else {
                    // Instantly restore the master interruption flag
                    this._ime = true;
                }

                if ( this._ime ) {
                    // An interruption occured
                    this._engine._gpu.step( );
                    this._engine._timer.step( );
                    this._m[ 0 ] = 0;
                }

            }

        }

    } );

} );
