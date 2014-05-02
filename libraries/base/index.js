/*global define, module*/

define( [

    './core/Engine',

    './devices/data/LocalStorage',
    './devices/debug/Tracer',
    './devices/inputs/Button',
    './devices/inputs/Keyboard',
    './devices/inputs/Mixed',
    './devices/inputs/Null',
    './devices/screens/Sink',
    './devices/screens/WebGL',
    './devices/timers/Immediate',
    './devices/timers/RAFrame',
    './devices/timers/Sink',

    './mixins/Emitter',

    './utils/Class',
    './utils/Debug',
    './utils/Format',
    './utils/Function',
    './utils/Log',
    './utils/Memory',
    './utils/Object',
    './utils/Reflection'

], function ( Engine, LocalStorageDataDevice, TracerDebugDevice, ButtonInputDevice, KeyboardInputDevice, MixedInputDevice, NullInputDevice, SinkScreenDevice, WebGLScreenDevice, ImmediateTimerDevice, RAFrameTimerDevice, SinkTimerDevice, EmitterMixin, ClassUtil, DebugUtil, FormatUtil, FunctionUtil, LogUtil, MemoryUtil, ObjectUtil, ReflectionUtil ) {

    return {

        ClassUtil        : ClassUtil,
        DebugUtil        : DebugUtil,
        FormatUtil       : FormatUtil,
        FunctionUtil     : FunctionUtil,
        LogUtil          : LogUtil,
        MemoryUtil       : MemoryUtil,
        ObjectUtil       : ObjectUtil,
        ReflectionUtil   : ReflectionUtil,

        EmitterMixin     : EmitterMixin,

        Engine           : Engine,

        data : {
            LocalStorage : LocalStorageDataDevice
        },

        input : {
            Button       : ButtonInputDevice,
            Keyboard     : KeyboardInputDevice,
            Null         : NullInputDevice
        },

        screen : {
            Sink         : SinkScreenDevice,
            WebGL        : WebGLScreenDevice
        },

        timer : {
            RAFrame      : RAFrameTimerDevice,
            Immediate    : ImmediateTimerDevice,
            Sink         : SinkTimerDevice
        },

        debug : {
            Tracer       : TracerDebugDevice
        },

        engine : {
            // Plugins register here
        },

        create : function ( Engine, options ) {
            return new Engine( options );
        }

    };

} );
