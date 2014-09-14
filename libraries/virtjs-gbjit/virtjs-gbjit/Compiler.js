import { formatAddress, formatHexadecimal }        from 'virtjs/utils/FormatUtils';
import { hashString, toSigned8 }                   from 'virtjs/tools';

import { templates as assemblyTemplates }          from 'virtjs-gbjit/compiler/templates/assembly';
import { templates as javascriptTemplates }        from 'virtjs-gbjit/compiler/templates/javascript';
import { Helpers }                                 from 'virtjs-gbjit/compiler/Helpers';
import { TestHelpers }                             from 'virtjs-gbjit/compiler/TestHelpers';
import { standard as stdOpcodes, cb as cbOpcodes } from 'virtjs-gbjit/compiler/opcodes';
import { i8_t, u8_t, u16_t }                       from 'virtjs-gbjit/compiler/opcodes';

export class Compiler {

    constructor( { testMode, emitEvents, monoInstructionBlocks } = { } ) {

        this._mmu = null;

        this._extraDebug = false;
        this._debugMode = false;
        this._testMode = testMode;
        this._emitEvents = emitEvents;
        this._monoInstructionBlocks = monoInstructionBlocks;

        this._helpers = this._testMode ?
            new TestHelpers( ) :
            new Helpers( )
        ;

    }

    link( { mmu } ) {

        this._mmu = mmu;

    }

    compileFrom( base, limit ) {

        if ( this._monoInstructionBlocks )
            limit = 1;

        this._helpers.baseAddress = base;

        var instructions = this._getInstructions( base, limit );
        this._compileInstructions( instructions );

        if ( this._debugMode )
            this._compileSourceMaps( instructions );

        var sourceCode = this._linkInstructions( instructions, this._debugMode )
        var jittedFunction = this._evalSourceCode( sourceCode );

        return { fn : jittedFunction, end : 0, overflow : 0,  };

    }

    disassembleAt( address ) {

        var instruction = this._peekInstruction( address );
        var { type, opcode, begin, end, parameters } = instruction;

        instruction.assembly = type === null ?
            `<invalid opcode ${formatHexadecimal(opcode, 8)}>` :
            assemblyTemplates[ type ]( begin, end, parameters );

        return instruction;

    }

    _getInstructions( base, limit ) {

        var instructions = [ ];

        for ( var offset = 0; ! instructions.length || offset < limit; offset += instruction.size ) {

            var instruction = this._peekInstruction( base + offset );
            instructions.push( instruction );

            if ( instruction.flags.final ) {
                break ;
            }

        }

        return instructions;

    }

    _compileInstructions( instructions ) {

        var emitEvents = this._emitEvents;
        var checkInterrupts = true;

        instructions.forEach( instruction => {

            var { opcode, type, begin, end, parameters, flags } = instruction, code = '';

            if ( checkInterrupts ) code += `
                if (env.cpuInterruptFeature && (env.pendingInterrupts & env.enabledInterrupts))
                    return env.triggerInterrupts(${begin});`;

            if ( emitEvents ) { code += `
                if (env.triggerInstructionEvent(${begin}, ${opcode}).breakRequested) {
                    env.exit();
                    return ${begin};
                }
            `; }

            code += javascriptTemplates[ type ]( begin, end, parameters, this._helpers );

            if ( emitEvents ) { code += `
                env.triggerPostInstructionEvent(${begin}, ${opcode});
            `; }

            if ( typeof flags.interrupts !== 'undefined' )
                checkInterrupts = flags.interrupts;

            instruction.javascript = code;

        } );

    }

    _compileSourceMaps( instructions ) {

        var hash = hashString( instructions.map( ( { type, parameters } ) => type + ':' + parameters ).join( '\n' ) );
        var fileName = '@virtjs-gbjit/generated/' + formatAddress( instructions[ 0 ].begin, 16 ) + '-' + hash;

        var sourceMapLineCount = 0;

        instructions.sourceMapFileName = fileName;

        instructions.forEach( instruction => {

            var { type, begin, end, parameters } = instruction;

            var assembly = assemblyTemplates[ type ]( begin, end, parameters );
            var sourceMap = `// ${formatAddress(begin, 16)}: ${assembly}\n`;

            instruction.javascript = new SourceNode( sourceMapLineCount + 1, 0, fileName + '.asm', instruction.javascript );
            instruction.sourceMap = sourceMap;

            sourceMapLineCount += sourceMap.match( /\n/g ).length;

        } );

    }

    _linkInstructions( instructions, withSourceMaps = false ) {

        var sourceCode = instructions.map( ( { javascript } ) => javascript );
        var sourceMaps = instructions.map( ( { sourceMap } ) => sourceMap );

        var nextAddress = instructions[ instructions.length - 1 ].end;

        sourceCode.unshift( '(function(jit,env){while(true){' );
        sourceCode.push( this._helpers.jumpTo( nextAddress ) );
        sourceCode.push( '}})' );

        if ( ! withSourceMaps )
            return sourceCode.join( '\n' );

        var { code : sourceCode, map } = new SourceNode( null, null, null, sourceCode ).toStringWithSourceMap( { file : '?' } );
        map.setSourceContent( instructions.sourceMapFileName + '.asm', sourceMaps.join( '' ) );

        return `${sourceCode}

            //# sourceURL=${instructions.sourceMapFileName}.js
            //# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(map)}
        `;

    }

    _evalSourceCode( sourceCode ) {

        var g = typeof global !== 'undefined' ? global : window;

        return g.eval( sourceCode );

    }

    _peekInstruction( begin ) {

        var size = 0;

        var table = stdOpcodes;
        var opcode = this._mmu.readUint8( begin + size++ );

        if (opcode === 0xCB) {
            table = cbOpcodes;
            opcode = 0xCB00 | this._mmu.readUint8( begin + size++ );
        }

        var [ type, parametersTypes = [ ], flags = { } ] = table[ opcode & 0xFF ];

        var parameters = parametersTypes.map( value => {

            switch ( value ) {

                case i8_t :
                    var value = toSigned8( this._mmu.readUint8( begin + size ) );
                    size += 1;
                return value;

                case u8_t :
                    var value = this._mmu.readUint8( begin + size );
                    size += 1;
                return value;

                case u16_t :
                    var value = this._mmu.readUint16( begin + size );
                    size += 2;
                return value;

                default :
                return value;

            }

        } );

        return {

            opcode : opcode,
            type   : type,

            begin : begin,
            end   : begin + size,
            size  : size,

            parameters : parameters,
            flags      : flags

        };

    }

};
