/*global Virtjs*/

( function ( ) {

    Virtjs.debug.Tracer = Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            this._tbody = this._options.element || document.createElement( 'tbody' );
            this._comment = document.createComment( 'Processing instructions ...' );
            this._rows = { };

            this._enabled = true;
            this._skipBreakpoint = false;
            this._breakDelay = 0;

            this._bufferedInstruction = null;
            this._currentRow = null;

            this._breakpoints = { };

            this._engine.on( 'load', this._onLoad.bind( this ) );
            this._engine._cpu.on( 'instruction', this._onInstruction.bind( this ) );

            // We will need to keep a context on this function to bind it latter
            this._onToggleBreakPoint_ = this._onToggleBreakpoint.bind( this );

        },

        open : function ( element ) {

            element.appendChild( element );

        },

        disable : function ( ) {

            if ( ! this._enabled )
                return ;

            this._enabled = false;

        },

        enable : function ( ) {

            if ( this.enabled )
                return ;

            this._enabled = true;
            this._skipBreakpoint = false;
            this._breakDelay = 0;

            if ( this._bufferedInstruction ) {
                this._onInstruction( this._bufferedInstruction );
                this._bufferedInstruction = null;
            }

        },

        one : function ( ) {

            this._skipBreakpoint = true;
            this._breakDelay = 2;

            this._engine.resume( );

        },

        continue : function ( ) {

            this._skipBreakpoint = true;

            this._engine.resume( );

        },

        pause : function ( ) {

            this._breakDelay = 1;

        },

        _onToggleBreakpoint : function ( e ) {

            var address = e.currentTarget.value;
            this._breakpoints[ address ] ^= ! this._breakpoints[ address ];

        },

        _onLoad : function ( e ) {

            this._tbody.parentNode.replaceChild( this._comment, this._tbody );

            var instructions = this._engine.disassemble( );

            Object.keys( this._rows ).forEach( function ( key ) {
                this._tbody.removeChild( this._rows[ key ] );
            }.bind( this ) );

            instructions.forEach( function ( infos ) {

                var row = this._rows[ infos.address ] = document.createElement( 'tr' );
                this._tbody.appendChild( row );
                row.className = 'tracer-row';

                var breakpointBox = document.createElement( 'input' );
                breakpointBox.addEventListener( 'change', this._onToggleBreakPoint_ );
                breakpointBox.type = 'checkbox';
                breakpointBox.value = infos.address;
                var breakPoint = document.createElement( 'td' );
                breakPoint.className = 'tracer-breakpoint';
                breakPoint.appendChild( breakpointBox );
                row.appendChild( breakPoint );

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

            this._comment.parentNode.replaceChild( this._tbody, this._comment );

        },

        _onInstruction : function ( e ) {

            if ( ! this._enabled ) {
                this._bufferedInstruction = e;
                return ;
            }

            if ( this._currentRow ) {

                var previousRow = this._currentRow;
                previousRow.className = previousRow.className.replace( /\btracer-current\b/g, '' );

            }

            if ( this._rows[ e.address ] ) {

                var currentRow = this._currentRow = this._rows[ e.address ];
                currentRow.className += ' tracer-current ';

                var scrollableParent = this._currentRow;
                for ( ; scrollableParent && scrollableParent.clientHeight >= scrollableParent.scrollHeight; scrollableParent = scrollableParent.parentNode ) ;
                scrollableParent = scrollableParent || document.documentElement;

                if ( scrollableParent.scrollTop > currentRow.offsetTop ) {
                    currentRow.scrollIntoView( true );
                } else if ( scrollableParent.scrollTop + scrollableParent.offsetHeight < currentRow.offsetTop + currentRow.offsetHeight ) {
                    currentRow.scrollIntoView( false );
                }

                if ( this._breakpoints[ e.address ] && ! this._skipBreakpoint ) {
                    e.break( );
                }

                if ( this._breakDelay !== 0 && -- this._breakDelay === 0 ) {
                    e.break( );
                }

            } else {

                console.warn( 'Jumping to ' + Virtjs.FormatUtil.address( e.address, 16 ) + ', which has not been disassembled' );

            }

            this._skipBreakpoint = false;

        }

    } );

} )( );
