module.exports = config => {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [ 
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': [ 'browserify' ]
        },
        browsers: ['Chrome'],
        browserify: {
            debug: true,
            transform: [
                [
                    'babelify',
                    {
                        "presets": ["es2015"]
                    }
                ]
            ]
        },
        plugins: [ 
            'karma-chrome-launcher', 
            'karma-browserify',
            'karma-jasmine',
            'karma-jasmine-html-reporter'
        ],
        reporters: [ 'kjhtml' ]
    })
}
