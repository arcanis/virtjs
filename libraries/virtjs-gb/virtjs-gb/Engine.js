import { PageSet }                     from 'virtjs/core/jit/PageSet';
import { ReadOnlyPage }                from 'virtjs/core/jit/ReadOnlyPage';
import { VersionedPage }               from 'virtjs/core/jit/VersionedPage';
import { Engine as BaseEngine }        from 'virtjs/core/Engine';
import { NullInput }                   from 'virtjs/devices/inputs/NullInput';
import { NullScreen }                  from 'virtjs/devices/screens/NullScreen';
import { SerialTimer }                 from 'virtjs/devices/timers/SerialTimer';
import { EmitterMixin }                from 'virtjs/mixins/EmitterMixin';
import { createDefensiveProxy, mixin } from 'virtjs/utils/ObjectUtils';

import { GPU }                         from 'virtjs-gb/components/GPU';
import { KeyIO }                       from 'virtjs-gb/components/KeyIO';
import { MMU }                         from 'virtjs-gb/components/MMU';
import { Environment }                 from 'virtjs-gb/Environment';
import { Interpreter }                 from 'virtjs-gb/Interpreter';
import { fixRomSize }                  from 'virtjs-gb/tools';

export class Engine extends mixin( null, EmitterMixin ) {

    constructor( { devices = { }, advanced = { }, events = [ ] } = { } ) {

        super( );

        this._startEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._stopEvent = !!~events.indexOf( 'start' ) ? { } : null;
        this._setupEvent = !!~events.indexOf( 'setup' ) ? { } : null;
        this._errorEvent = !!~events.indexOf( 'error' ) ? { error : null } : null;

        this._debugMode = Boolean( advanced.debugMode );

        this.screen = devices.screen || new NullScreen( );
        this.timer = devices.timer || new SerialTimer( );
        this.input = devices.input || new NullInput( );

        this.gpu = new GPU( {
            screen : this.screen
        } );

        this.keyio = new KeyIO( {
            input : this.input
        } );

        this.mmu = new MMU( {
            events : events
        } );

        this.interpreter = new Interpreter( {
            engine : this,
            events : events
        } );

        this.mmu.link( {
            keyio : this.keyio,
            gpu : this.gpu
        } );

        this.gpu.link( {
            mmu : this.mmu
        } );

        this.interpreter.link( {
            mmu : this.mmu,
            gpu : this.gpu
        } );

        this._runTimer = null;

    }

    setup( environment ) {

        try {

            this.environment = environment;

            this.interpreter.setup( this.environment );
            this.gpu.setup( this.environment );
            this.keyio.setup( this.environment );
            this.mmu.setup( this.environment );

        } catch ( err ) {

            this.environment = null;

            if ( this._errorEvent ) {
                this._errorEvent.error = err;
                this.emit( 'error', this._errorEvent );
            }

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

        return this.interpreter.disassembleAt( address );

    }

    isRunning( ) {

        return this._runTimer !== null;

    }

    stop( ) {

        if ( ! this._runTimer )
            return ;

        this.interpreter.endFrame( );

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

            this._runTimer = this.timer.nextTick( entry );

            this.interpreter.runFrame( );

        };

        var tryRun = ( ) => {

            try {

                run( );

            } catch ( err ) {

                this.stop( );

                this._errorEvent.error = err;
                this.emit( 'error', this._errorEvent );

            }

        };

        if ( this._startEvent )
            this.emit( 'start', this._startEvent );

        var entry = this._errorEvent ? tryRun : run;
        this._runTimer = this.timer.nextTick( entry );

    }

};
