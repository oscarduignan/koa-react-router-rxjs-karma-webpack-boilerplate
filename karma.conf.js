var path = require('path');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'chai', 'sinon-chai'],

        phantomjsLauncher: {
          exitOnResourceError: true
        },

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
            noInfo: true
        },

        plugins: [
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher',
            'karma-webpack',
            'karma-mocha',
            'karma-chai-plugins'
        ]

    });
};