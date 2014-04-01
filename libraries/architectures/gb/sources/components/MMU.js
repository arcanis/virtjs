/*global preprocess, define*/

define( [

    'virtjs',

    '../bios'

], function ( Virtjs, bios ) {

    return Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( engine ) {

            this._engine = engine;

            // These functions will be reinstrumented /and will lose their scopes/

            Virtjs.DebugUtil.preprocessFunction( this, 'readUint8', this._engine._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'writeUint8', this._engine._options );

            // Creates all the mappers now, avoiding garbage collection

            this._biosLockMapper               = [ this._biosLockAccess, null ];
            this._biosMapper                   = [ this._biosAccess,     null ];

        },

        setup : function ( ) {

            // Creates all the mappers now, avoiding garbage collection

            this._hramMapper = [ this._engine.environment.hram, null ];
            this._wramMapper = [ this._engine.environment.wram, null ];

        },

        readInt8 : function ( address ) {

            var n = this.readUint8( address );

            if ( n > 0x7f )
                n -= 0x100;

            return n;

        },

        readUint8 : function ( address ) {

            var value;
            var mapping = this.mapAddress( address );

            if ( typeof mapping[ 0 ] === 'function' ) {
                value = mapping[ 0 ].call( null, mapping[ 1 ], undefined, address );
            } else {
                value = mapping[ 0 ][ mapping[ 1 ] ];
            }

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'read' ) !== - 1 ) {

                // This event can override the return value by calling e.override(<newValue>).

                var overrideFn = function ( newValue ) { value = newValue; };
                this.emit( 'read', { address : address, value : value, override : overrideFn } );

            }

            return value;

        },

        writeUint8 : function ( address, value ) {

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'write' ) !== - 1 ) {

                // This event can override the new value by calling e.override(<newValue>)

                var overrideFn = function ( newValue ) { value = newValue; };
                this.emit( 'write', { address : address, value : value, override : overrideFn } );

                if ( typeof value === 'undefined' ) {

                    // If the new value should be 'undefined', then we just ignore the write

                    return ;

                }

            }

            var mapping = this.mapAddress( address );

            if ( typeof mapping[ 0 ] === 'function' ) {
                 mapping[ 0 ].call( null, mapping[ 1 ], value, address );
            } else {
                mapping[ 0 ][ mapping[ 1 ] ] = value;
            }

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'post-write' ) !== - 1 ) {
                this.emit( 'post-write', { address : address, value : value } );
            }

        },

        readUint16 : function ( address ) {

            var a = this.readUint8( address + 0 );
            var b = this.readUint8( address + 1 );

            return ( b << 8 ) | ( a << 0 );

        },

        writeUint16 : function ( address, value ) {

            this.writeUint8( address + 0, ( value & 0x00FF ) >> 0 );
            this.writeUint8( address + 1, ( value & 0xFF00 ) >> 8 );

        },

        mapAddress : function ( current ) {

            // [CPU] Enabled interrupts [0xFFFF;0xFFFF]

            if ( current === 0xFFFF )
                return this._engine.cpu._enabledInterruptsMapper;

            //       High RAM [0xFF80;0xFFFF[

            if ( current >= 0xFF80 && current < 0xFFFF ) {
                this._hramMapper[ 1 ] = current - 0xFF80;
                return this._hramMapper;
            }

            // [MMU] BIOS flag [0xFF50]

            if ( ! this._engine.environment.mmuBiosLocked && current === 0xFF50 )
                return this._biosLockMapper;

            // [GPU] GPU binding [0xFF40;0xFF80[

            if ( current >= 0xFF40 && current < 0xFF80 )
                return this._engine.gpu.settingsMapping( current - 0xFF40 );

            // [SND] Sound binding [0xFF10;0xFF30[

            if ( current >= 0xFF10 && current < 0xFF40 )
                return [ [ 0 ], 0 ];

            // [CPU] Requested interruptions [0xFF0F]

            if ( current === 0xFF0F )
                return this._engine.cpu._pendingInterruptsMapper;

            // [TIM] Timer binding [0xFF04;0xFF08[

            if ( current >= 0xFF04 && current < 0xFF08 )
                return this._engine.timer.timerMapping( current - 0xFF04 );

            // [IO]  Serial transfer [0xFF01;0xFF02]

            if ( current >= 0xFF01 && current <= 0xFF02 )
                return [ [ 0 ], 0 ];

            // [IO]  Input binding [0xFF00]

            if ( current === 0xFF00 )
                return this._engine.io.keyMapping( current - 0xFF00 );

            //       Empty area

            if ( current >= 0xFEA0 && current < 0xFF00 )
                return [ [ 0 ], 0 ];

            // [GPU] Object attributes memory [0xFE00;0xFF00[

            if ( current >= 0xFE00 && current < 0xFEA0 )
                return this._engine.gpu.oamMapping( current - 0xFE00 );

            //       Working RAM shadow [0xE000;0xFE00[

            if ( current >= 0xE000 && current < 0xFE00 ) {
                this._wramMapper[ 1 ] = current & 0x1FFF;
                return this._wramMapper;
            }

            //       Working RAM [0xC000;0xE000[

            if ( current >= 0xC000 && current < 0xE000 ) {
                this._wramMapper[ 1 ] = current & 0x1FFF;
                return this._wramMapper;
            }

            //       External RAM [0xA000;0xC000[

            if ( current >= 0xA000 && current < 0xC000 )
                return this._engine.cartridge.ramMapping( current - 0xA000 );

            // [GPU] Graphics VRAM [0x8000;0xA000[

            if ( current >= 0x8000 && current < 0xA000 )
                return this._engine.gpu.vramMapping( current & 0x1FFF );

            //       BIOS [0x0000;0x0100[

            if ( ! this._engine.environment.mmuBiosLocked && current < 0x0100 ) {
                this._biosMapper[ 1 ] = current;
                return this._biosMapper;
            }

            //       ROM [0x0000;0x8000[

            if ( current < 0x8000 )
                return this._engine.cartridge.romMapping( current );

            return [ Virtjs.MemoryUtil.unaddressable( 16 ), current ];

        },

        _biosLockAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return 0;

            this._engine.environment.mmuBiosLocked = value !== 0;

        },

        _biosAccess : function ( address, value ) {

            if ( typeof value === 'undefined' )
                return bios[ address ];

            return ;

        }

    } );

} );
