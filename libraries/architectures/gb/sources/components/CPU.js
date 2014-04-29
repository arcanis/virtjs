/*global define, preprocess*/

define( [

    'virtjs',

    './cpu/instructionSets',
    '../tables/opcodeMaps'

], function ( Virtjs, instructionSets, opcodeMaps ) {

    return Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( engine ) {

            this._engine = engine;

            // These functions will be reinstrumented /and will lose their scopes/

            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._engine._options );

        },

        setup : function ( ) {

            // Instructions are optimized : instead of using a dictionnary or a switch case to select the right opcode, we use a pointer to function table
            // Each entry in InstructionMap is mapped to a function in InstructionSet, which is binded on the CPU. This way, we do not keep the instructions in the same file than the rest of the CPU. It would be too much code ;)

            this._instructionSets = { };
            this._opcodeMaps = { };

            Object.keys( opcodeMaps ).forEach( function ( namespace ) {

                var instructionSet = this._instructionSets[ namespace ] = { };
                var opcodeMap = this._opcodeMaps[ namespace ] = [ ];

                opcodeMaps[ namespace ].forEach( function ( prototype, index ) {

                    if ( ! prototype )
                        return ;

                    // We obtain the generic name by removing all compile-time arguments

                    var generalization = prototype.replace( /:[^_]*/g, '' );
                    var definition = instructionSets[ namespace ][ generalization ];

                    // We convert the compile-time arguments into an array which will be used by the newly crafted instructions

                    var resolvedArguments = { Virtjs : Virtjs, engine : this._engine, parameters : prototype.split( /_/ ).filter( function ( part ) {
                        return part.indexOf( ':' ) !== - 1;
                    } ).map( function ( part ) {
                        return part.split( ':' );
                    } ).map( function ( specialization ) {
                        if ( specialization[ 0 ] === 'n' )
                            return parseInt( specialization[ 1 ] );
                        return this._engine.environment[ specialization[ 1 ] ];
                    }.bind( this ) ) };

                    // We copy each method of the original instruction, recompiling it with the preprocessor then binding it onto the CPU with fastBind

                    var instruction = Object.keys( definition ).reduce( function ( newDefinition, method ) {
                        Virtjs.ReflectionUtil.resetScope( newDefinition, method, definition[ method ], resolvedArguments );
                        newDefinition[ method ] = Virtjs.FunctionUtil.fastBind( newDefinition[ method ], this );
                        return newDefinition;
                    }.bind( this ), { } );

                    // We save the new instruction inside the instruction set, and its command into the instruction map

                    instructionSet[ prototype ] = instruction;
                    opcodeMap[ index ] = instruction.command;

                    // And finally, we plug a custom function member to be able to fetch the new definition from the command

                    instruction.command.xDefinition = instruction;

                }.bind( this ) );

            }.bind( this ) );

        },

        step : function step( ) {

            if ( this._engine.environment.cpuStop ) {

                // In stop mode, the timer & GPU sleep too
                // Since the GPU is sleeping, we need to end the engine step loop manually

                this._engine._continue = false;

            } else if ( this._engine.environment.cpuHalt ) {

                // The halt doesn't execute the instruction, but otherwise it's pretty much the same

                var time = this._calculateHaltPeriod( );

                var time = 1;
                this._engine.gpu.step( time );
                this._engine.timer.step( time );

            } else {

                var address = this._engine.environment.pc[ 0 ];

                var opcode = this._engine.mmu.readUint8( address );
                var instruction = this._opcodeMaps.unprefixed[ opcode ];

                if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'instruction' ) !== - 1 ) {

                    // This event can be 'cancelled' by calling e.break()

                    var breakRequested = false, breakFn = function ( ) { breakRequested = true; };
                    this.emit( 'instruction', { address : address, opcode : opcode, instruction : instruction, break : breakFn } );

                    if ( breakRequested ) {
                        this._engine.pause( );
                        return ;
                    }

                }

                this._engine.environment.pc[ 0 ] += 1;
                var time = instruction( );

                this._engine.gpu.step( time );
                this._engine.timer.step( time );

            }

            // Interrupt handling time ! We have to check for both enabled & pending interrupts

            var enabledInterrupts = this._engine.environment.enabledInterrupts;
            var pendingInterrupts = this._engine.environment.pendingInterrupts;
            var firedInterrupts = pendingInterrupts & enabledInterrupts;

            if ( ! firedInterrupts )
                return ;

            // An enabled interrupt will always wake up the engine

            this._engine.environment.cpuStop = false;
            this._engine.environment.cpuHalt = false;

            // However, an interrupt will not always be triggered (the IME flag may be false)

            if ( ! this._engine.environment.cpuInterruptFeature )
                return ;

            // Triggering an interrupt silences the IME flag

            this._engine.environment.cpuInterruptFeature = false;

            // If multiple interrupts should trigger at the same time (multiple bits set), only the first one is executed

            for ( var bit = 0; bit < 5; ++ bit ) {

                var mask = 1 << bit;

                if ( firedInterrupts & mask ) {
                    break ;
                }

            }

            this._engine.environment.pendingInterrupts -= mask;
            var interruptionTime = this._opcodeMaps.interruptions[ bit ].call( this );

            this._engine.gpu.step( time );
            this._engine.timer.step( time );

        },

        readUint8 : function ( ) {

            var value = this._engine.mmu.readUint8( this._engine.environment.pc[ 0 ] );
            this._engine.environment.pc[ 0 ] += 1;

            return value;

        },

        readInt8 : function ( ) {

            var value = this._engine.mmu.readInt8( this._engine.environment.pc[ 0 ] );
            this._engine.environment.pc[ 0 ] += 1;

            return value;

        },

        readUint16 : function ( ) {

            var value = this._engine.mmu.readUint16( this._engine.environment.pc[ 0 ] );
            this._engine.environment.pc[ 0 ] += 2;

            return value;

        },

        push : function ( value ) {

            this._engine.environment.sp[ 0 ] -= 2;
            this._engine.mmu.writeUint16( this._engine.environment.sp[ 0 ], value );

        },

        pop : function ( ) {

            var value = this._engine.mmu.readUint16( this._engine.environment.sp[ 0 ], value );
            this._engine.environment.sp[ 0 ] += 2;

            return value;

        },

        // This function is a clever trick found in GameBoy-Online and adapted here.
        // Its goal is to detect the number of cycles until the next interruption. This way, we don't have to trigger the elements too much.

        _calculateHaltPeriod : function ( ) {

            if ( this._engine.environment.gpuLCDFeature ) {

                // VRAM interruption

                if ( this._engine.environment.enabledInterrupts & 0x01 ) {

                    var interrupt01Period = this._engine.environment.gpuMode !== 0x01
                        ? 144 * 114 - this._engine.environment.gpuFrameClock
                        : 298 * 114 - this._engine.environment.gpuFrameClock;

                    return interrupt01Period;

                }

            }

            throw new Error( );

        }

    } );

} );
