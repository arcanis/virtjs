import { KeyboardInput } from 'virtjs/devices/inputs/KeyboardInput';
import { NullScreen }   from 'virtjs/devices/screens/NullScreen';
import { WebGLScreen }   from 'virtjs/devices/screens/WebGLScreen';
import { RAFrameTimer }  from 'virtjs/devices/timers/RAFrameTimer';
import { createEngine }  from 'virtjs';

import { fetchBinary } from './http';

export function buildEngine( type ) {

    return System.import( type ).then( function ( m ) {

        var screen = new WebGLScreen( {
            element : document.querySelector( '#screen .display' ) } );

        var input = new KeyboardInput( {
            inputs : m.inputs } );

        var timer = new RAFrameTimer( {
            } );

        return new m.Engine( { devices : {
            screen : screen,
            input : input,
            timer : timer
        } } );

    } );

};

export function loadRom( engine, rom ) {

    return fetchBinary( rom ).then( function ( rom ) {
        engine.load( rom );
        return engine;
    } );

};
