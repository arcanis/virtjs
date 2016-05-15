module.exports = {

    resolveLoader: {
        root: __dirname + '/node_modules/'
    },

    resolve: {
        extensions: [ '', '.js' ],
        root: __dirname,
        alias: {
            'virtjs': __dirname + '/sources/'
        }
    },

    entry: {
        'main': [
            'virtjs/index'
        ]
    },

    output: {
        path: __dirname + '/build/',
        library: 'Virtjs',
        libraryTarget: 'umd',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },

    module: {
        loaders: [ {
            test: /\.js$/,
            loader: 'babel-loader',
            include: __dirname + '/sources'
        } ]
    },

    externals: {
        'fs': true
    }

};
