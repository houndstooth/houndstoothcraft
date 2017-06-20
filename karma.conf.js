module.exports = config => {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [ 
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': [ 'browserify' ]
        },
        browserify: {
            debug: true,
            transform: [
                [
                    'babelify',
                    {
                        "presets": ["es2015"],
                        "plugins": ["rewire"]
                    }
                ]
            ]
        },
        plugins: [ 
            'karma-browserify',
            'karma-jasmine',
            'karma-jasmine-html-reporter'
        ],
        reporters: [ 'kjhtml' ]
    })
}
