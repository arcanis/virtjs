define( [

    './core/Engine',

    './mixins/Emitter',

    './utils/Class',
    './utils/Format',
    './utils/Log',
    './utils/Memory',
    './utils/Object'

], function ( Engine, EmitterMixin, ClassUtil, FormatUtil, LogUtil, MemoryUtil, ObjectUtil ) {

    return {

        ClassUtil : ClassUtil,
        FormatUtil : FormatUtil,
        LogUtil : LogUtil,
        MemoryUtil : MemoryUtil,
        ObjectUtil : ObjectUtil,

        EmitterMixin : EmitterMixin,

        Engine : Engine,

        create : function ( Engine, options ) {
            return new Engine( options );
        },

        engine : {
            // Plugins register here
        }

    };

} );
