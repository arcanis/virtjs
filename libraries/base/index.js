/*global define, module*/

define( [

    './core/Engine',

    './mixins/Emitter',

    './utils/Class',
    './utils/Debug',
    './utils/Format',
    './utils/Function',
    './utils/Log',
    './utils/Memory',
    './utils/Object',
    './utils/Reflection'

], function ( Engine, EmitterMixin, ClassUtil, DebugUtil, FormatUtil, FunctionUtil, LogUtil, MemoryUtil, ObjectUtil, ReflectionUtil ) {

    if ( typeof window !== 'undefined' ) {
        var root = window, key = 'Virtjs';
    } else {
        var root = module, key = 'exports';
    }

    return root[ key ] = {

        ClassUtil      : ClassUtil,
        DebugUtil      : DebugUtil,
        FormatUtil     : FormatUtil,
        FunctionUtil   : FunctionUtil,
        LogUtil        : LogUtil,
        MemoryUtil     : MemoryUtil,
        ObjectUtil     : ObjectUtil,
        ReflectionUtil : ReflectionUtil,

        EmitterMixin : EmitterMixin,

        Engine : Engine,

        create : function ( Engine, options ) {
            return new Engine( options );
        },

        data : {
            // Plugins register here
        },

        engine : {
            // Plugins register here
        },

        input : {
            // Plugins register here
        },

        screen : {
            // Plugins register here
        },

        timer : {
            // Plugins register here
        },

        debug : {
            // Plugins register here
        }

    };

} );
