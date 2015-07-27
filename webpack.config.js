var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
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
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    devServer: {
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