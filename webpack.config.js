var path = require('path'),
    webpack = require('webpack'),
    CleanPlugin = require('clean-webpack-plugin');

var NODE_ENV    = process.env.NODE_ENV || 'development',
    PRODUCTION  = NODE_ENV === 'production',
    DEVELOPMENT = NODE_ENV === 'development';

module.exports = {
    entry: {
        'body': [
            path.join(__dirname, 'src', 'js', 'body.js')
        ],
        'head': [
            path.join(__dirname, 'src', 'js', 'head.js')
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CleanPlugin(['dist']),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: (DEVELOPMENT ? ['react-hot'] : []).concat('babel'),
            include: path.join(__dirname, 'src')
        }]
    },
    devtool: (DEVELOPMENT ? 'eval-source-map' : 'inline-source-map'),
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        stats: {
            colors: true,
            chunkModules: false
        },
        proxy: {
            "*": "http://localhost:3000"
        }
    }
};