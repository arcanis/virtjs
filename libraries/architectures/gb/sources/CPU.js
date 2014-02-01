define( [

    'base',

    './cpu/InstructionMap',
    './cpu/InstructionSet'

], function ( Virtjs, InstructionMap, InstructionSet ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            this._halt = false;

            // Standard registers
            this._a = new Uint8Array( 1 );
            this._b = new Uint8Array( 1 );
            this._c = new Uint8Array( 1 );
            this._d = new Uint8Array( 1 );
            this._e = new Uint8Array( 1 );
            this._h = new Uint8Array( 1 );
            this._l = new Uint8Array( 1 );

            // Flags register
            this._f = new Uint8Array( 1 );

            // Stack pointer
            this._sp = new Uint16Array( 1 );

            // Program count; index
            this._pc = new Uint16Array( 1 );

            // Instruction timer
            this._m = new Uint8Array( 1 );

            var instructions = new InstructionSet( this );
            this._instructionMap = Object.keys( InstructionMap ).reduce( function ( remap, key ) {

                remap[ key ] = InstructionMap[ key ].map( function ( instruction ) {

                    if ( instruction === null || ! instructions[ instruction ] )
                        return undefined;

                    var bind = instructions[ instruction ].bind( instructions );
                    bind.instruction = instruction;

                    return bind;

                } );

                return remap;

            }, { } );

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

                if ( this._engine._options.debug && this._engine._options.debug.instructions === 'all' )
                    debugger ;

                if ( this._engine._options.debug && this._engine._options.debug.instructions === 'invalid' && ! command )
                    debugger ;

                if ( this._engine._options.debug && this._engine._options.debug.instructionPool )
                    this._engine._options.debug.instructionPool.push( [ address, opcode, instruction ] );

                command( );

            }

        }

    } );

} );
