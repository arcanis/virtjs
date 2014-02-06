define( [

    'base',

    './cpu/InstructionMap',
    './cpu/InstructionSet'

], function ( Virtjs, InstructionMap, InstructionSet ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            this._instructions = new InstructionSet( this );
            this._instructionMap = Object.keys( InstructionMap ).reduce( function ( remap, key ) {

                remap[ key ] = InstructionMap[ key ].map( function ( instruction ) {

                    if ( instruction === null || ! this._instructions[ instruction ] )
                        return undefined;

                    var bind = this._instructions[ instruction ].bind( this._instructions );
                    bind.instruction = instruction;

                    return bind;

                }.bind( this ) );

                return remap;

            }.bind( this ), { } );

        },

        setup : function ( ) {

            // Halt Inner Register
            this._halt = false;

            // Interruptions Enable Flag
            this._ime = false;

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

        },

        step : function ( ) {

            if ( this._halt ) {

                this._m[ 0 ] = 1;

            } else {

                var address = this._pc[ 0 ];
                this._pc[ 0 ] += 1;

                var opcode = this._engine._mmu.readUint8( address );
                var command = this._instructionMap.standard[ opcode ];
                var instruction = command && command.instruction;

                command( );

                if ( this._ime && this._interruptions[ 0 ] && this._interruptions[ 1 ] ) {

                    var firedInterruptions = this._interruptions[ 0 ] & this._interruptions[ 1 ];

                    if ( firedInterruptions & 0x01 ) {
                        this._interruptions[ 1 ] &= 0x01 ^ 0xFF;
                        this._instructions.RST40( );
                    }

                }

            }

        }

    } );

} );
