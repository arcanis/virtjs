/*global Virtjs*/

( function ( ) {

    Virtjs.debug.Tracer = Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            this._tbody = this._options.element || document.createElement( 'tbody' );
            this._rows = { };

            this._current = null;
            this._count = 0;

            this._engine.on( 'load', this._onLoad.bind( this ) );
            this._engine._cpu.on( 'instruction', this._onInstruction.bind( this ) );

        },

        open : function ( element ) {

            element.appendChild( element );

        },

        _onLoad : function ( e ) {

            var instructions = this._engine.disassemble( );

            Object.keys( this._rows ).forEach( function ( key ) {
                this._tbody.removeChild( this._rows[ key ] );
            }.bind( this ) );

            instructions.forEach( function ( infos ) {

                var row = this._rows[ infos.address ] = document.createElement( 'tr' );
                this._tbody.appendChild( row );
                row.className = 'tracer-row';

                var addressText = Virtjs.FormatUtil.address( infos.address, instructions.addressSize );
                var address = document.createElement( 'td' );
                address.className = 'tracer-address';
                address.appendChild( document.createTextNode( addressText ) );
                row.appendChild( address );

                var opcodeText = Virtjs.FormatUtil.hexadecimal( infos.opcode, instructions.opcodeSize );
                var opcode = document.createElement( 'td' );
                opcode.className = 'tracer-opcode';
                opcode.appendChild( document.createTextNode( opcodeText ) );
                row.appendChild( opcode );

                var instruction = document.createElement( 'td' );
                instruction.className = 'tracer-instruction';
                instruction.appendChild( document.createTextNode( infos.instruction ) );
                row.appendChild( instruction );

            }.bind( this ) );

        },

        _onInstruction : function ( e ) {

            if ( this._current ) {
                var previous = this._current;
                previous.className = previous.className.replace( /\btracer-current\b/g, '' );
            }

            var current = this._current = this._rows[ e.address ];
            current.className += ' tracer-current ';

            this._count += 1;

        }

    } );

} )( );
