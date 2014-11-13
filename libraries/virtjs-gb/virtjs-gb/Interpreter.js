import { EmitterMixin }                     from 'virtjs/mixins/EmitterMixin';
import { formatHexadecimal }                from 'virtjs/utils/FormatUtils';
import { mixin }                            from 'virtjs/utils/ObjectUtils';

import { templates as assemblyTemplates }   from './compilation/templates/assembly';
import { templates as javascriptTemplates } from './compilation/templates/javascript';
import { InterpreterHelpers }               from './compilation/InterpreterHelpers';
import { instructions, cbInstructions }     from './compilation/instructions';
import { x8_t, i8_t, u8_t, u16_t }          from './compilation/instructions';

var interruptLocations = new Uint16Array( 256 );

interruptLocations[ 1 << 0 ] = 0x0040;
interruptLocations[ 1 << 1 ] = 0x0048;
interruptLocations[ 1 << 2 ] = 0x0050;
interruptLocations[ 1 << 3 ] = 0x0060;

function getInstructionSize( parameters ) {

    return parameters.reduce( ( sum, parameter ) => { switch ( parameter ) {
        case x8_t  : return sum + 1;
        case i8_t  : return sum + 1;
        case u8_t  : return sum + 1;
        case u16_t : return sum + 2;
        default    : return sum;
    } }, 0 );

}

function getInstructionStaticArguments( parameters, address, mmu ) {

    var parameterOffset = 0;

    var getParameterOffset = size => {
        var offset = parameterOffset;
        parameterOffset += 1;
        return offset;
    };

    return parameters.map( parameter => { switch ( parameter ) {
        case x8_t  : return null;
        case i8_t  : return mmu.readInt8( address + getParameterOffset( 1 ) );
        case u8_t  : return mmu.readUint8( address + getParameterOffset( 1 ) );
        case u16_t : return mmu.readUint16( address + getParameterOffset( 2 ) );
        default    : return parameter;
    } } ).filter( value => value !== null );

}

function getInstructionDynamicArguments( parameters, address ) {

    var parameterOffset = 0;

    var getParameterOffset = size => {
        var offset = parameterOffset;
        parameterOffset += 1;
        return offset;
    };

    return parameters.map( parameter => { switch ( parameter ) {
        case i8_t  : return `interpreter._mmu.readInt8(address + ${getParameterOffset(1)})`;
        case u8_t  : return `interpreter._mmu.readUint8(address + ${getParameterOffset(1)})`;
        case u16_t : return `interpreter._mmu.readUint16(address + ${getParameterOffset(2)})`;
        default    : return  parameter;
    } } );

}

export class Interpreter extends mixin( null, EmitterMixin ) {

    constructor( { engine, events = [ ] } ) {

        super( );

        this._engine = engine;

        this._helpers = new InterpreterHelpers( );

        this._instructions = this._importInstructions( instructions );

        this._instructionEvent = !!~events.indexOf( 'instruction' ) ? { } : null;
        this._postInstructionEvent = !!~events.indexOf( 'instruction' ) ? { } : null;

        this._mmu = null;
        this._gpu = null;

        this._environment = null;

    }

    link( { mmu, gpu } ) {

        this._mmu = mmu;
        this._gpu = gpu;

    }

    setup( environment ) {

        this._environment = environment;

    }

    disassembleAt( address ) {

        var address = address;
        var opcode = this._mmu.readUint8( address );

        if ( opcode === 0xCB )
            opcode = 0xCB00 | this._mmu.readUint8( address + 1 );

        var [ type, parameters, flags ] = instructions[ opcode ];

        var size = getInstructionSize( parameters );
        var args = getInstructionStaticArguments( parameters, address + 1, this._mmu );

        var assembly = type !== null ?
            assemblyTemplates[ type ]( address, address + size, args ) :
            `<invalid opcode ${formatHexadecimal(opcode, 8)}>`;

        return {

            type       : type,
            opcode     : opcode,
            flags      : flags,

            begin      : address,
            end        : address + size + 1,
            size       : size + 1,

            parameters : args,
            assembly   : assembly

        };

    }

    runFrame( ) {

        var environment = this._environment;

        for ( this._running = true; this._running; ) {

            if ( environment.cpuHalt ) {

                this._applyClockCycles( 1 );

                this._triggerInterrupts( );

            } else {

                var address = environment.pc;
                var opcode = this._mmu.readUint8( address );

                if ( opcode === 0xCB )
                    opcode = 0xCB00 | this._mmu.readUint8( address + 1 );

                if ( this._instructionEvent ) {

                    this._triggerInstructionEvent( address, opcode );

                    if ( this._instructionEvent.breakRequested ) {
                        this._engine.stop( );
                        continue ;
                    }

                }

                var functor = this._instructions[ opcode ];
                environment.pc = functor( this, environment, address );

                this._triggerInterrupts( );

                if ( this._postInstructionEvent ) {
                    this._triggerPostInstructionEvent( address, opcode );
                }

            }

        }

    }

    endFrame( ) {

        this._running = false;

    }

    _importInstructions( instructions ) {

        var script = '/* Will contain the code required to fill the instruction array */';

        var opcodes = Object.keys( instructions );
        var functors = new Array( opcodes.length );

        for ( var opcode of opcodes ) {

            var code = this._craftInstructionFunctor( instructions[ opcode ] );
            script += `functors[${opcode}] = ${code};`;

        }

        var generator = this._compileFunction( 'functors', script );
        return generator( functors ), functors;

    }

    _craftInstructionFunctor( [ type, parameters, flags ] ) {

        if ( ! type || type === 'PREFIX_CB' )
            return null;

        var argumentOffset = 1;

        var offset = increment => {
            var currentOffset = argumentOffset;
            argumentOffset += increment;
            return currentOffset;
        };

        var size = parameters.reduce( ( sum, parameter ) => { switch ( parameter ) {
            case x8_t  : return sum + 1;
            case i8_t  : return sum + 1;
            case u8_t  : return sum + 1;
            case u16_t : return sum + 2;
            default    : return sum;
        } }, 1 );

        var args = parameters.map( parameter => { switch ( parameter ) {
            case x8_t  : return null;
            case i8_t  : return `interpreter._mmu.readInt8(address + ${offset(1)})`;
            case u8_t  : return `interpreter._mmu.readUint8(address + ${offset(1)})`;
            case u16_t : return `interpreter._mmu.readUint16(address + ${offset(2)})`;
            default    : return  parameter;
        } } ).filter( value => value !== null );

        var address = 'address';
        var nextAddress = this._helpers.add16( 'address', size );

        var body = javascriptTemplates[ type ]( address, nextAddress, args, this._helpers );
        var epilogue = this._helpers.jumpTo( nextAddress );

        return `(function (interpreter, environment, address) { ${body + epilogue} })`;

    }

    _compileFunction( parameters, body ) {

        var g = typeof global !== 'undefined' ? global : window;

        return g.eval( `(function (${parameters}) { ${body} })` );

    }

    _triggerInstructionEvent( address, opcode ) {

        this._instructionEvent.address = address;
        this._instructionEvent.opcode = opcode;
        this._instructionEvent.breakRequested = false;
        this.emit( 'instruction', this._instructionEvent );

        return this._instructionEvent;

    }

    _triggerPostInstructionEvent( address, opcode ) {

        this._postInstructionEvent.address = address;
        this._postInstructionEvent.opcode = opcode;
        this.emit( 'post-instruction', this._postInstructionEvent );

        return this._postInstructionEvent;

    }

    _triggerInterrupts( ) {

        var environment = this._environment;

        // Check which are the interrupts that should be triggered

        var enabledInterrupts = environment.enabledInterrupts;
        var pendingInterrupts = environment.pendingInterrupts;
        var firedInterrupts = pendingInterrupts & enabledInterrupts;

        // Avoid unecessary checks later

        if ( ! firedInterrupts )
            return ;

        // An enabled interrupt will wake the main loop

        environment.cpuStop = environment.cpuHalt = false;

        // However, if the master interrupt flag is off, the interrupt won't be consumed

        if ( ! environment.cpuInterruptFeature )
            return ;

        // Triggering an interrupt silences the IME flag

        environment.cpuInterruptFeature = false;

        // If multiple interrupts should trigger at the same time (multiple bits set), only the first one is executed

        var interrupt = firedInterrupts & ( ~firedInterrupts + 1 ); // reset everything but the lowest significant bit

        // We reset the interrupt flag so it won't be called again (until the next triggering)

        environment.pendingInterrupts ^= interrupt;

        // Then we execute the RST instruction (cf RST_u8 in compiler/javascript.js)

        environment.sp = ( environment.sp - 2 ) & 0xFFFF;

        this._mmu.writeUint8( environment.sp + 0, ( environment.pc & 0x00FF ) >>> 0 );
        this._mmu.writeUint8( environment.sp + 1, ( environment.pc & 0xFF00 ) >>> 8 );

        environment.pc = interruptLocations[ interrupt ];

        // And finally, we increase the clocks

        this._applyClockCycles( 4 );

    }

    _applyClockCycles( count ) {

        var environment = this._environment;

        if ( environment.cgbUnlocked && environment.cgbCurrentSpeed )
            count /= 2; // Double-speed mode

        // GPU

        if ( environment.gpuLcdFeature ) {

            environment.gpuClock -= count;

            if ( environment.gpuClock <= 0 ) {
                if ( this._gpu.nextMode( ) ) {
                    this._running = false;
                }
            }

        }

        // Timer Divider

        if ( /* the timer divider always run */ true ) {

            environment.timerDividerBuffer += count;

            while ( environment.timerDividerBuffer >= 256 ) {

                environment.timerDividerBuffer -= 256;
                environment.timerDivider = ( ( environment.timerDivider + 1 ) & 0xFF ) >>> 0;

            }

        }

        // Timer counter

        if ( environment.timerCounterFeature ) {

            environment.timerCounterBuffer += count;

            while ( environment.timerCounterBuffer >= environment.timerCounterFrequency ) {

                environment.timerCounterBuffer -= environment.timerCounterFrequency;
                environment.timerCounter = ( ( environment.timerCounter + 1 ) & 0xFF ) >>> 0;

                if ( environment.timerCounter === 0 ) {

                    environment.timerCounter = environment.timerCounterModulo;
                    environment.pendingInterrupts |= 0x04;

                }

            }

        }

    }

}
