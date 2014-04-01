define( [

    './core/Engine',

    './mixins/Emitter',

    './utils/Class',
    './utils/Debug',
    './utils/Format',
    './utils/Log',
    './utils/Memory',
    './utils/Object',
    './utils/Reflection'

], function ( Engine, EmitterMixin, ClassUtil, DebugUtil, FormatUtil, LogUtil, MemoryUtil, ObjectUtil, ReflectionUtil ) {

    return {

        ClassUtil      : ClassUtil,
        DebugUtil      : DebugUtil,
        FormatUtil     : FormatUtil,
        LogUtil        : LogUtil,
        MemoryUtil     : MemoryUtil,
        ObjectUtil     : ObjectUtil,
        ReflectionUtil : ReflectionUtil,

        EmitterMixin : EmitterMixin,

        Engine : Engine,

        create : function ( Engine, options ) {
            return new Engine( options );
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
