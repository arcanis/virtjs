define( [

], function ( ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // Bind mappers in order to keep the context when passing them around
            this._biosMapper_ = this._biosMapper.bind( this );

        },

        setup : function ( ) {

            // BIOS flag
            this._inBios = true;

        },

        readUint8 : function ( address ) {

            var mapping = this.mapAddress( address );

            if ( typeof mapping[ 0 ] === 'function' )
                return mapping[ 0 ].call( null, mapping[ 1 ], undefined, address );

            return mapping[ 0 ][ mapping[ 1 ] ];

        },

        writeUint8 : function ( address, value ) {

            var mapping = this.mapAddress( address );

            if ( typeof mapping[ 0 ] === 'function' )
                return mapping[ 0 ].call( null, mapping[ 1 ], value, address );

            if ( mapping[ 0 ] === this._engine._bios )
                return undefined;
            if ( mapping[ 0 ] === this._engine._rom )
                return undefined;

            mapping[ 0 ][ mapping[ 1 ] ] = value;

            return undefined;

        },

        readUint16 : function ( address ) {

            var a = this.readUint8( address + 0 ) << 0;
            var b = this.readUint8( address + 1 ) << 8;

            return a | b;

        },

        writeUint16 : function ( address, value ) {

            this.writeUint8( address + 0, ( value & 0x00FF ) >> 0 );
            this.writeUint8( address + 1, ( value & 0xFF00 ) >> 8 );

        },

        mapAddress : function ( current ) {

            // [CPU] Enabled interruptions [0xFFFF;0xFFFF]
            if ( current === 0xFFFF )
                return [ this._engine._cpu._interruptions, 0 ];

            //       Zero-page [0xFF80;0xFFFF[
            if ( current >= 0xFF80 && current < 0xFFFF )
                return [ this._engine._zram, current & 0x007F ];

            // [MMU] BIOS flag [0xFF50]
            if ( this._inBios && current === 0xFF50 )
                return [ this._biosMapper_, 0 ];

            // [GPU] GPU binding [0xFF40;0xFF80[
            if ( current >= 0xFF40 && current < 0xFF80 )
                return this._engine._gpu.settingsMapping( current - 0xFF40 );

            // [CPU] Requested interruptions [0xFF0F]
            if ( current === 0xFF0F )
                return [ this._engine._cpu._interruptions, 1 ];

            // [IO]  Input binding [0xFF00]
            if ( current === 0xFF00 )
                return this._engine._io.keyMapping( current - 0xFF00 );

            if ( [ 0xFF01, 0xFF02 ].indexOf( current ) !== - 1 )
                return [ [ 0 ], 0 ];

            // [SND] Sound binding [0xFF10;0xFF30[
            if ( current >= 0xFF10 && current < 0xFF40 )
                return [ [ 0 ], 0 ];

            // [TIM] Timer binding [0xFF04;0xFF08[
            if ( current >= 0xFF04 && current < 0xFF08 )
                return this._engine._timer.timerMapping( current - 0xFF04 );

            //       Empty area
            if ( current >= 0xFEA0 && current < 0xFF00 )
                return [ [ 0 ], 0 ];

            // [GPU] Object attributes memory [0xFE00;0xFF00[
            if ( current >= 0xFE00 && current < 0xFEA0 )
                return this._engine._gpu.oamMapping( current - 0xFE00 );

            //       Working RAM shadow [0xE000;0xFE00[
            if ( current >= 0xF000 && current < 0xFE00 )
                return [ this._engine._wram, current & 0x1FFF ];
            if ( current >= 0xE000 && current < 0xF000 )
                return [ this._engine._wram, current & 0x1FFF ];

            //       Working RAM [0xC000;0xE000[
            if ( current >= 0xC000 && current < 0xE000 )
                return [ this._engine._wram, current & 0x1FFF ];

            //       External RAM [0xA000;0xC000[
            if ( current >= 0xA000 && current < 0xC000 )
                return [ this._engine._eram, current & 0x1FFF ];

            // [GPU] Graphics VRAM [0x8000;0xA000[
            if ( current >= 0x8000 && current < 0xA000 )
                return this._engine._gpu.vramMapping( current & 0x1FFF );

            //       BIOS [0x0000;0x0100[
            if ( current < 0x0100 && this._inBios === true )
                return [ this._engine._bios, current & 0x1FFF ];

            //       ROM [0x0000;0x8000[
            if ( current < 0x8000 )
                return [ this._engine._rom, current ];

            return [ Virtjs.MemoryUtil.unaddressable( 16 ), 0 ];

        },

        _biosMapper : function ( value ) {

            if ( typeof value === 'undefined' )
                return 0;

            this._inBios = value === 0;

            this._engine._gpu._resetVram( );

            return undefined;

        }

    } );

} );
