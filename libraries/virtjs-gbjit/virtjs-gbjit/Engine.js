import { PageSet }              from 'virtjs/core/jit/PageSet';
import { ReadOnlyPage }         from 'virtjs/core/jit/ReadOnlyPage';
import { VersionedPage }        from 'virtjs/core/jit/VersionedPage';
import { Engine as BaseEngine } from 'virtjs/core/Engine';
import { EmitterMixin }         from 'virtjs/mixins/EmitterMixin';
import { mixin }                from 'virtjs/utils/ObjectUtils';

import { GPU }                  from 'virtjs-gbjit/components/GPU';
import { KeyIO }                from 'virtjs-gbjit/components/KeyIO';
import { MMU }                  from 'virtjs-gbjit/components/MMU';
import { Environment }          from 'virtjs-gbjit/Environment';
import { Interpreter }          from 'virtjs-gbjit/Interpreter';
import { fixRomSize }           from 'virtjs-gbjit/tools';

export var inputs = {

    RIGHT  :  0x21,
    LEFT   :  0x22,
    UP     :  0x24,
    DOWN   :  0x28,

    A      :  0x11,
    B      :  0x12,

    SELECT :  0x14,
    START  :  0x18

};

export class Engine extends mixin( BaseEngine, EmitterMixin ) {

    constructor( { devices, advanced = { }, events = [ ] } = { } ) {

        super( );

        this._startEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._stopEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._setupEvent = !!~events.indexOf( 'setup' ) ? { } : null;

        this.screen = devices.screen;
        this.timer = devices.timer;
        this.input = devices.input;

        this._gpu = new GPU( {
            screen : devices.screen
        } );

        this._keyio = new KeyIO( {
            input : devices.input
        } );

        this._mmu = new MMU( {
            events : events
        } );

        this._interpreter = new Interpreter( {
            engine : this,
            events : events
        } );

        this._mmu.link( {
            keyio : this._keyio,
            gpu : this._gpu
        } );

        this._gpu.link( {
            mmu : this._mmu
        } );

        this._interpreter.link( {
            mmu : this._mmu,
            gpu : this._gpu
        } );

        this._runTimer = null;

    }

    setup( environment ) {

        this.environment = environment;

        this._interpreter.setup( this.environment );
        this._gpu.setup( this.environment );
        this._keyio.setup( this.environment );
        this._mmu.setup( this.environment );

        if ( this._setupEvent ) {
            this.emit( 'setup', this._setupEvent );
        }

    }

    loadArrayBuffer( arrayBuffer, { autostart = true } = { } ) {

        this.setup( new Environment( {
            romBuffer : fixRomSize( arrayBuffer )
        } ) );

        if ( autostart ) {
            this.run( );
        }

    }

    disassembleAt( address ) {

        return this._interpreter.disassembleAt( address );

    }

    isRunning( ) {

        return this._runTimer !== null;

    }

    stop( ) {

        if ( ! this._runTimer )
            return ;

        this._interpreter.endFrame( );

        this.timer.cancelTick( this._runTimer );
        this._runTimer = null;

        if ( this._stopEvent ) {
            this.emit( 'stop', this._stopEvent );
        }

    }

    run( ) {

        if ( this._runTimer )
            return ;

        var run = ( ) => {

            this._runTimer = this.timer.nextTick( run );

            this._interpreter.runFrame( );

        };

        if ( this._startEvent )
            this.emit( 'start', this._startEvent );

        run( );

    }

};
