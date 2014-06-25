import { EmitterMixin }                     from 'virtjs/mixins/EmitterMixin';
import { mixin }                            from 'virtjs/utils/ObjectUtils';
import { resetFunction, preprocessMethods } from 'virtjs/utils/PreprocessUtils';

import { instructionSets }  from './cpu/instructionSets';
import { opcodeMaps }       from '../tables/opcodeMaps';

export class CPU extends mixin( null, EmitterMixin ) {

    constructor( engine ) {

        this._engine = engine;

        preprocessMethods( this, [
            'step'
        ], this._engine._options );

    }

    setup( ) {

        // Instructions are optimized : instead of using a dictionnary or a switch case to select the right opcode, we use a pointer to function table
        // Each entry in InstructionMap is mapped to a function in InstructionSet, which is binded on the CPU. This way, we do not keep the instructions in the same file than the rest of the CPU. It would be too much code ;)

        this._instructionSets = { };
        this._opcodeMaps = { };

        Object.keys( opcodeMaps ).forEach( namespace => {

            var instructionSet = this._instructionSets[ namespace ] = { };
            var opcodeMap = this._opcodeMaps[ namespace ] = [ ];

            opcodeMaps[ namespace ].forEach( ( prototype, index ) => {

                if ( ! prototype )
                    return ;

                // We obtain the generic name by removing all compile-time arguments

                var generalization = prototype.replace( /:[^_]*/g, '' );
                var definition = instructionSets[ namespace ][ generalization ];

                // We convert the compile-time arguments into an array which will be used by the newly crafted instructions

                var newScope = { engine : this._engine };

                prototype.split( /_/ ).filter( part => {

                    return part.indexOf( ':' ) !== - 1;

                } ).map( part => {

                    return part.split( ':' );

                } ).forEach( ( parameter, index ) => {

                    var key = '$' + ( 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' )[ index ];

                    newScope[ key ] = parameter[ 0 ] === 'n'
                        ? parseInt( parameter[ 1 ] )
                        : this._engine.environment[ parameter[ 1 ] ]
                    ;

                } );

                // We copy each method of the original instruction, recompiling it with the preprocessor then binding it onto the CPU with fastBind

                var instruction = Object.keys( definition ).reduce( ( newDefinition, method ) => {
                    newDefinition[ method ] = resetFunction( definition[ method ], { scope : newScope } );
                    return newDefinition;
                }, { } );

                // We save the new instruction inside the instruction set, and its command into the instruction map

                instructionSet[ prototype ] = instruction;
                opcodeMap[ index ] = instruction.command;

            } );

        } );

    }

    step( ) {

        if ( this._engine.environment.cpuStop ) {

            // In stop mode, the timer & GPU sleep too
            // Since the GPU is sleeping, we need to end the engine step loop manually

            this._engine._continue = false;

        } else if ( this._engine.environment.cpuHalt ) {

            // The halt doesn't execute the instruction, but otherwise it's pretty much the same

            //var time = this._calculateHaltPeriod( );

            var time = 1;
            this._engine.gpu.step( time );
            this._engine.timer.step( time );

        } else {

            var address = this._engine.environment.pc[ 0 ];

            var opcode = this._engine.mmu.readUint8( address );
            var instruction = this._opcodeMaps.unprefixed[ opcode ];

            if ( ( preprocess.events || [ ] ).indexOf( 'instruction' ) !== - 1 ) {

                // This event can be 'cancelled' by calling e.break()

                var breakRequested = false, breakFn = function ( ) { breakRequested = true; };
                this.emit( 'instruction', { address : address, opcode : opcode, instruction : instruction, break : breakFn } );

                if ( breakRequested ) {
                    this._engine.pause( );
                    return ;
                }

            }

            this._engine.environment.pc[ 0 ] += 1;
            var time = instruction.call( this );

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

        /**/ if ( firedInterrupts & 0x01 ) bit = 0;
        else if ( firedInterrupts & 0x02 ) bit = 1;
        else if ( firedInterrupts & 0x04 ) bit = 2;
        else if ( firedInterrupts & 0x08 ) bit = 3;
        else if ( firedInterrupts & 0x10 ) bit = 4;
        else if ( firedInterrupts & 0x20 ) bit = 5;
        else if ( firedInterrupts & 0x40 ) bit = 6;
        else if ( firedInterrupts & 0x80 ) bit = 7;

        this._engine.environment.pendingInterrupts ^= 1 << bit;
        var interruptionTime = this._opcodeMaps.interruptions[ bit ].call( this );

        this._engine.gpu.step( time );
        this._engine.timer.step( time );

    }

    readUint8( ) {

        var value = this._engine.mmu.readUint8( this._engine.environment.pc[ 0 ] );
        this._engine.environment.pc[ 0 ] += 1;

        return value;

    }

    readInt8( ) {

        var value = this._engine.mmu.readInt8( this._engine.environment.pc[ 0 ] );
        this._engine.environment.pc[ 0 ] += 1;

        return value;

    }

    readUint16( ) {

        var value = this._engine.mmu.readUint16( this._engine.environment.pc[ 0 ] );
        this._engine.environment.pc[ 0 ] += 2;

        return value;

    }

    push( value ) {

        this._engine.environment.sp[ 0 ] -= 2;
        this._engine.mmu.writeUint16( this._engine.environment.sp[ 0 ], value );

    }

    pop( ) {

        var value = this._engine.mmu.readUint16( this._engine.environment.sp[ 0 ], value );
        this._engine.environment.sp[ 0 ] += 2;

        return value;

    }

    // This function is a clever trick found in GameBoy-Online and adapted here.
    // Its goal is to detect the number of cycles until the next interruption. This way, we don't have to trigger the elements too much.

    _calculateHaltPeriod( ) {

        return ;

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

};
