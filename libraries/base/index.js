define( [

    './common/Class',
    './common/Format',
    './common/Object',

    './core/Engine'

], function ( ClassUtil, FormatUtil, ObjectUtil, Engine ) {

    return {

        ClassUtil : ClassUtil,
        FormatUtil : FormatUtil,
        ObjectUtil : ObjectUtil,

        Engine : Engine,

        create : function ( Engine, options ) {
            return new Engine( options );
        },

        engine : {
            // Plugins register here
        }

    };

} );
