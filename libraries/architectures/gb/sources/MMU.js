define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( {

        initialize : function ( engine ) {

            this._engine = engine;

            // BIOS flag
            this._inBios = true;

        },

        readUint8 : function ( address ) {

            var mapping = this.mapAddress( address, address );

            if ( typeof mapping === 'function' )
                return mapping( );

            return mapping[ 0 ][ mapping[ 1 ] ];

        },

        writeUint8 : function ( address, value ) {

            var mapping = this.mapAddress( address, address );

            if ( typeof mapping === 'function' )
                return mapping( value );

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

        mapAddress : function ( user, current ) {

            // Immediate Enable Flag [0xFFFF;0xFFFF]
            if ( current === 0xFFFF )
                return [ this._engine._ime, 0 ];

            // Zero-page [0xFF80;0xFFFF[
            if ( current >= 0xFF80 )
                return [ this._engine._zram, current & 0x007F ];

            // BIOS Flag
            if ( this._inBios && current === 0xFF50 )
                return this._biosMapper.bind( this );

            // GPU Binding [0xFF40;0xFF80[
            if ( current >= 0xFF40 )
                return this._engine._gpu.settingMapping( user, current - 0xFF40 );

            // IO control handling [0xFF00;0xFF80[
            if ( current > 0xFF00 )
                return [ [ 0 ], 0 ];

            // Object attributes memory [0xFE00;0xFF00[
            if ( current >= 0xFE00 )
                return [ this._engine._oam, current & 0x1FFF ];

            // Working RAM shadow [0xE000;0xFE00[
            if ( current >= 0xF000 )
                return [ this._engine._wram, current & 0x1FFF ];
            if ( current >= 0xE000 )
                return [ this._engine._wram, current & 0x1FFF ];

            // Working RAM [0xC000;0xE000[
            if ( current >= 0xC000 )
                return [ this._engine._wram, current & 0x1FFF ];

            // External RAM [0xA000;0xC000[
            if ( current >= 0xA000 )
                return [ this._engine._eram, current & 0x1FFF ];

            // Graphics VRAM [0x8000;0xA000[
            if ( current >= 0x8000 )
                return this._engine._gpu.vramMapping( user, current & 0x1FFF );

            // BIOS [0x0000;0x0100[
            if ( current < 0x0100 && this._inBios === true )
                return [ this._engine._bios, current & 0x1FFF ];

            // ROM [0x0000;0x8000[
            return [ this._engine._rom, current ];

        },

        _biosMapper : function ( value ) {

            if ( typeof value === 'undefined' )
                return 0;

            this._inBios = value === 0;

            return undefined;

        }

    } );

} );
