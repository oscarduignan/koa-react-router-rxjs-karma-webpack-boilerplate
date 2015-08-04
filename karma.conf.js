var path = require('path');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],

        frameworks: ['jasmine'],

        files: [
            'src/js/tests.js'
        ],

        preprocessors: {
            'src/js/tests.js': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loaders: ['babel'],
                    include: path.join(__dirname, 'src')
                }]
            }
        },

        webpackMiddleware: {
            noInfo: true,
            quiet: true
        },

        plugins: [
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-jasmine'
        ]
    });
};