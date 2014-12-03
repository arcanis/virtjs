module.exports = {

    entry : __dirname + '/index.js',

    output : {

        libraryTarget : 'var',
        library : 'virtjs',

        path : __dirname + '/output/',
        filename : 'virtjs.web.js'

    },

    resolve : {

        root : __dirname + '/../sources/',

        alias : {
            'virtjs' : __dirname + '/../sources/'
        }

    },

    module : {

        loaders : [
            { test : /\.js$/, loader : __dirname + '/node_modules/webpack-traceur-loader?runtime&async-functions' }
        ]

    },

    node : {

        'fs' : 'empty'

    }

};
