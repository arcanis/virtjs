define( [

    './common/Class',
    './common/Format',
    './common/Log',
    './common/Object',

    './common/Emitter',

    './core/Engine'

], function ( ClassUtil, FormatUtil, LogUtil, ObjectUtil, EmitterMixin, Engine ) {

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
