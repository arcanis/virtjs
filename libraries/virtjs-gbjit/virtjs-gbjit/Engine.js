import { PageSet }                     from 'virtjs/core/jit/PageSet';
import { ReadOnlyPage }                from 'virtjs/core/jit/ReadOnlyPage';
import { VersionedPage }               from 'virtjs/core/jit/VersionedPage';
import { Engine as BaseEngine }        from 'virtjs/core/Engine';
import { NullInput }                   from 'virtjs/devices/inputs/NullInput';
import { NullScreen }                  from 'virtjs/devices/screens/NullScreen';
import { SerialTimer }                 from 'virtjs/devices/timers/SerialTimer';
import { EmitterMixin }                from 'virtjs/mixins/EmitterMixin';
import { createDefensiveProxy, mixin } from 'virtjs/utils/ObjectUtils';

import { GPU }                         from 'virtjs-gbjit/components/GPU';
import { KeyIO }                       from 'virtjs-gbjit/components/KeyIO';
import { MMU }                         from 'virtjs-gbjit/components/MMU';
import { Environment }                 from 'virtjs-gbjit/Environment';
import { Interpreter }                 from 'virtjs-gbjit/Interpreter';
import { fixRomSize }                  from 'virtjs-gbjit/tools';

export class Engine extends mixin( BaseEngine, EmitterMixin ) {

    constructor( { devices = { }, advanced = { }, events = [ ] } = { } ) {

        super( );

        this._startEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._stopEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._setupEvent = !!~events.indexOf( 'setup' ) ? { } : null;

        this._debugMode = Boolean( advanced.debugMode );

        this.screen = devices.screen || new NullScreen( );
        this.timer = devices.timer || new SerialTimer( );
        this.input = devices.input || new NullInput( );

        this._gpu = new GPU( {
            screen : this.screen
        } );

        this._keyio = new KeyIO( {
            input : this.input
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

        try {

            this.environment = environment;

            this._interpreter.setup( this.environment );
            this._gpu.setup( this.environment );
            this._keyio.setup( this.environment );
            this._mmu.setup( this.environment );

        } catch ( err ) {

            this.environment = null;

            throw err;

        }

        if ( this._setupEvent ) {
            this.emit( 'setup', this._setupEvent );
        }

    }

    loadArrayBuffer( arrayBuffer, { initialState, autoStart = true } = { } ) {

        var environment = new Environment( {
            romBuffer : fixRomSize( arrayBuffer ),
            initialState : initialState
        } );

        if ( this._debugMode )
            environment = createDefensiveProxy( environment );

        this.setup( environment );

        if ( autoStart ) {
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

        if ( ! this.environment )
            return ;

        var run = ( ) => {

            this._runTimer = this.timer.nextTick( run );

            this._interpreter.runFrame( );

        };

        if ( this._startEvent )
            this.emit( 'start', this._startEvent );

        this._runTimer = this.timer.nextTick( run );

    }

};
