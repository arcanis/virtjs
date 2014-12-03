import { Engine as BaseEngine }        from '../../core/Engine';
import { NullInput }                   from '../../devices/inputs/NullInput';
import { NullScreen }                  from '../../devices/screens/NullScreen';
import { SerialTimer }                 from '../../devices/timers/SerialTimer';
import { EmitterMixin }                from '../../mixins/EmitterMixin';
import { createDefensiveProxy, mixin } from '../../utils/ObjectUtils';

import { GPU }                         from './components/GPU';
import { KeyIO }                       from './components/KeyIO';
import { MMU }                         from './components/MMU';
import { Environment }                 from './Environment';
import { Interpreter }                 from './Interpreter';
import { fixRomSize }                  from './tools';

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
