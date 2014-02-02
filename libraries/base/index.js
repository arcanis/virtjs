define( [

    './core/Engine',

    './mixins/Emitter',

    './utils/Class',
    './utils/Format',
    './utils/Log',
    './utils/Object'

], function ( Engine, EmitterMixin, ClassUtil, FormatUtil, LogUtil, ObjectUtil ) {

    return {

        ClassUtil : ClassUtil,
        FormatUtil : FormatUtil,
        LogUtil : LogUtil,
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
