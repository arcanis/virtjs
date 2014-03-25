/*global define, preprocess*/

define( [

    'virtjs',

    './cpu/InstructionMap2',
    './cpu/InstructionSet2'

], function ( Virtjs, InstructionMaps, InstructionSets ) {

    return Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( engine ) {

            this._engine = engine;

            // Interruptions (0: enabled, 1: requested)
            this._interruptions = new Uint8Array( 2 );

            // Standard Registers
            this._af = new Uint16Array( 1 );                   this._af.xRegister = 'af';
            this._a = new Uint8Array( this._af.buffer, 1, 1 ); this._a.xRegister = 'a';
            this._f = new Uint8Array( this._af.buffer, 0, 1 ); this._f.xRegister = 'f';

            this._bc = new Uint16Array( 1 );                   this._bc.xRegister = 'bc';
            this._b = new Uint8Array( this._bc.buffer, 1, 1 ); this._b.xRegister = 'b';
            this._c = new Uint8Array( this._bc.buffer, 0, 1 ); this._c.xRegister = 'c';

            this._de = new Uint16Array( 1 );                   this._de.xRegister = 'de';
            this._d = new Uint8Array( this._de.buffer, 1, 1 ); this._d.xRegister = 'd';
            this._e = new Uint8Array( this._de.buffer, 0, 1 ); this._e.xRegister = 'e';

            this._hl = new Uint16Array( 1 );                   this._hl.xRegister = 'hl';
            this._h = new Uint8Array( this._hl.buffer, 1, 1 ); this._h.xRegister = 'h';
            this._l = new Uint8Array( this._hl.buffer, 0, 1 ); this._l.xRegister = 'l';

            // Stack Pointer
            this._sp = new Uint16Array( 1 );
            this._sp.xRegister = 'sp';

            // Program Count
            this._pc = new Uint16Array( 1 );

            // Cycle Register
            this._m = new Uint8Array( 1 );

            // Instructions are optimized : instead of using a dictionnary or a switch case to select the right opcode, we use a pointer to function table
            // Each entry in InstructionMap is mapped to a function in InstructionSet, which is binded on the CPU. This way, we do not keep the instructions in the same file than the rest of the CPU. It would be too much code ;)

            this._instructionSets = { };
            this._instructionMaps = { };

            Object.keys( InstructionMaps ).forEach( function ( namespace ) {

                var instructionSet = this._instructionSets[ namespace ] = { };
                var instructionMap = this._instructionMaps[ namespace ] = [ ];

                InstructionMaps[ namespace ].forEach( function ( prototype, index ) {

                    if ( ! prototype ) return ;

                    // We obtain the generic name by removing all compile-time arguments
                    var generalization = prototype.replace( /:[^_]*/g, '' );
                    var definition = InstructionSets[ namespace ][ generalization ];

                    // We convert the compile-time arguments into an array which will be used by the newly crafted instructions
                    var resolvedArguments = { parameters : prototype.split( /_/ ).filter( function ( part ) {
                        return part.indexOf( ':' ) !== - 1;
                    } ).map( function ( part ) {
                        return part.split( ':' );
                    } ).map( function ( specialization ) {
                        if ( specialization[ 0 ] === 'n' )
                            return parseInt( specialization[ 1 ] );
                        return this[ '_' + specialization[ 1 ] ];
                    }.bind( this ) ) };

                    // We copy each method of the original instruction, recompiling it with the preprocessor then binding it onto the CPU
                    var instruction = Object.keys( definition ).reduce( function ( newDefinition, method ) {
                        newDefinition[ method ] = Virtjs.DebugUtil.preprocessFunction( definition[ method ], resolvedArguments ).bind( this );
                        return newDefinition;
                    }.bind( this ), { } );

                    // We save the new instruction inside the instruction set, and its command into the instruction map
                    instructionSet[ prototype ] = instruction;
                    instructionMap[ index ] = instruction.command;

                    // And finally, we plug a custom function member to be able to fetch the new definition from the command
                    instruction.command.xDefinition = instruction;

                }.bind( this ) );

            }.bind( this ) );

            // This line will setup the right branches when used by the build tool
            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._engine._options );

        },

        setup : function ( ) {

            // Halt Inner Register
            this._halt = false;

            // Interruptions Enable Flag
            this._ime = true;

            // Instruction count
            this._count = 0;

        },

        step : function ( ) {

            if ( this._halt ) {

                this._m[ 0 ] = 1;

            } else {

                var address = this._pc[ 0 ];

                var opcode = this._engine._mmu.readUint8( address );
                var instruction = this._instructionMaps.unprefixed[ opcode ];

                if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'instruction' ) !== - 1 ) {

                    var breakRequested = false, breakFn = function ( ) { breakRequested = true; };
                    this.emit( 'instruction', { count : this._count, address : address, opcode : opcode, instruction : instruction, break : breakFn } );

                    if ( breakRequested ) {
                        this._engine.pause( );
                        return ;
                    }

                }

                this._pc[ 0 ] += 1;
                instruction( );
                this._count += 1;

            }

            this._engine._gpu.step( );
            this._engine._timer.step( );
            this._m[ 0 ] = 0;

            if ( this._ime && this._interruptions[ 0 ] && this._interruptions[ 1 ] ) {

                var firedInterruptions = this._interruptions[ 0 ] & this._interruptions[ 1 ];

                if ( firedInterruptions & 0x01 ) {
                    this._interruptions[ 1 ] &= 0x01 ^ 0xFF;
                    this._instructionSets.unprefixed['RST_n:0x40'].command.call( this );
                } else if ( firedInterruptions & 0x04 ) {
                    this._interruptions[ 1 ] &= 0x04 ^ 0xFF;
                    this._instructionSets.unprefixed['RST_n:0x50'].command.call( this );
                } else if ( firedInterruptions & 0x10 ) {
                    this._interruptions[ 1 ] &= 0x10 ^ 0xFF;
                    this._instructionSets.unprefixed['RST_n:0x60'].command.call( this );
                }

                if ( ! this._ime ) {

                    this._engine._gpu.step( );
                    this._engine._timer.step( );

                    this._m[ 0 ] = 0;

                }

            }

        }

    } );

} );
