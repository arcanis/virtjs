require.config( {

    paths : {
        'Esprima' : 'vendors/Esprima-140212',
        'Escodegen' : 'vendors/Escodegen-1.2.0.min'
    },

    map : {
        '*' : {
            'base' : '../../libraries/base/index',
            'architectures' : '../../libraries/architectures/'
        }
    },

    shim : {

        'Escodegen' : { exports : 'escodegen' },

        '../../libraries/base/index' : {
            deps : [ 'Esprima' ]
        }

    }

} );
