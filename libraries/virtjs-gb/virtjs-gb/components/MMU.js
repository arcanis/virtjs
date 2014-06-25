import { EmitterMixin }                                                             from 'virtjs/mixins/EmitterMixin';
import { createAccessor, createPlainOldData, createImmutable, createUnaddressable } from 'virtjs/utils/MemoryUtils';
import { mixin }                                                                    from 'virtjs/utils/ObjectUtils';
import { preprocessMethods }                                                        from 'virtjs/utils/PreprocessUtils';

import { bios } from '../bios';

export class MMU extends mixin( null, EmitterMixin ) {

    constructor( engine ) {

        this._engine = engine;

        preprocessMethods( this, [
            'readUint8', 'writeUint8'
        ], this._engine._options );

        // Memory mapping cache

        this._getters = [ ];
        this._setters = [ ];

    }

    setup( ) {

        // Cache all of the mappers

        for ( var t = 0; t <= 0xFFFF; ++ t ) {

            var mapping = this.mapAddress( t );

            ( function ( mapping ) {

                if ( Array.isArray( mapping ) ) {
                    var array = mapping[ 0 ], index = mapping[ 1 ];
                    this._getters[ t ] = function ( ) { return array[ index ]; };
                    this._setters[ t ] = function ( value ) { array[ index ] = value; };
                } else {
                    this._getters[ t ] = mapping;
                    this._setters[ t ] = mapping;
                }

            } ).call( this, mapping );

        }

    }

    readInt8( address ) {

        var n = this.readUint8( address );

        if ( n > 0x7f )
            n -= 0x100;

        return n;

    }

    readUint8( address ) {

        var value = this._getters[ address ]( void 0, address );

        if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'read' ) !== - 1 ) {

            // This event can override the return value by calling e.override(<newValue>).

            var overrideFn = function ( newValue ) { value = newValue; };
            this.emit( 'read', { address : address, value : value, override : overrideFn } );

        }

        return value;

    }

    writeUint8( address, value ) {

        if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'write' ) !== - 1 ) {

            // This event can override the new value by calling e.override(<newValue>)

            var overrideFn = function ( newValue ) { value = newValue; };
            this.emit( 'write', { address : address, value : value, override : overrideFn } );

            if ( typeof value === 'undefined' ) {

                // If the new value should be 'undefined', then we just ignore the write

                return ;

            }

        }

        this._setters[ address ]( value, address );

        if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'post-write' ) !== - 1 ) {
            this.emit( 'post-write', { address : address, value : value } );
        }

    }

    readUint16( address ) {

        var a = this.readUint8( address + 0 );
        var b = this.readUint8( address + 1 );

        return ( b << 8 ) | ( a << 0 );

    }

    writeUint16( address, value ) {

        this.writeUint8( address + 0, ( value & 0x00FF ) >> 0 );
        this.writeUint8( address + 1, ( value & 0xFF00 ) >> 8 );

    }

    mapAddress( address ) {

        // [CPU] Enabled interrupts [0xFFFF;0xFFFF]

        if ( address === 0xFFFF )
            return createPlainOldData( this._engine.environment, 'enabledInterrupts' );

        //       High RAM [0xFF80;0xFFFF[

        if ( address >= 0xFF80 && address < 0xFFFF )
            return createPlainOldData( this._engine.environment.hram, address - 0xFF80 );

        // [MMU] BIOS flag [0xFF50]

        if ( ! this._engine.environment.mmuBiosLocked && address === 0xFF50 )
            return createAccessor( this._biosLockAccess, this );

        // [IO]  Miscellaneous / Unused registers [0xFF70;0xFF80[

        if ( address >= 0xFF70 && address < 0xFF80 )
            return createImmutable( 0x00 );

        // [GPU] GPU binding [0xFF40;0xFF70[

        if ( address >= 0xFF40 && address < 0xFF70 )
            return this._engine.gpu.settingsMapping( address - 0xFF40 );

        // [SND] Sound binding [0xFF10;0xFF30[

        if ( address >= 0xFF10 && address < 0xFF40 )
            return createImmutable( 0x00 );

        // [CPU] Requested interruptions [0xFF0F]

        if ( address === 0xFF0F )
            return createPlainOldData( this._engine.environment, 'pendingInterrupts' );

        // [TIM] Timer binding [0xFF04;0xFF08[

        if ( address >= 0xFF04 && address < 0xFF08 )
            return this._engine.timer.timerMapping( address - 0xFF04 );

        // [IO]  Serial transfer [0xFF01;0xFF02]

        if ( address >= 0xFF01 && address <= 0xFF02 )
            return createImmutable( 0x00 );

        // [IO]  Input binding [0xFF00]

        if ( address === 0xFF00 )
            return this._engine.io.keyMapping( address - 0xFF00 );

        //       Empty area

        if ( address >= 0xFEA0 && address < 0xFF00 )
            return createImmutable( 0x00 );

        // [GPU] Object attributes memory [0xFE00;0xFF00[

        if ( address >= 0xFE00 && address < 0xFEA0 )
            return this._engine.gpu.oamMapping( address - 0xFE00 );

        //       Working RAM shadow [0xE000;0xFE00[

        if ( address >= 0xE000 && address < 0xFE00 )
            return createPlainOldData( this._engine.environment.wram, address & 0x1FFF );

        //       Working RAM [0xC000;0xE000[

        if ( address >= 0xC000 && address < 0xE000 )
            return createPlainOldData( this._engine.environment.wram, address & 0x1FFF );

        //       External RAM [0xA000;0xC000[

        if ( address >= 0xA000 && address < 0xC000 )
            return this._engine.cartridge.ramMapping( address - 0xA000 );

        // [GPU] Graphics VRAM [0x8000;0xA000[

        if ( address >= 0x8000 && address < 0xA000 )
            return this._engine.gpu.vramMapping( address & 0x1FFF );

        //       BIOS [0x0000;0x0100[

        if ( ! this._engine.environment.mmuBiosLocked && address < 0x0100 )
            return createAccessor( this._biosAccess, this, address );

        //       ROM [0x0000;0x8000[

        if ( address < 0x8000 )
            return this._engine.cartridge.romMapping( address );

        return createUnaddressable( address, 16 );

    }

    _biosLockAccess( value ) {

        if ( typeof value === 'undefined' ) {
            return 0;
        } else {
            this._engine.environment.mmuBiosLocked = value !== 0;
        }

    }

    _biosAccess( address, value ) {

        if ( typeof value === 'undefined' ) {
            return bios[ address ];
        } else {
            return void 0;
        }

    }

};
