module.exports = {

    entry : __dirname + '/index.js',

    output : {

        libraryTarget : 'commonjs2',

        path : __dirname + '/output/',
        filename : 'virtjs.node.js'

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
