const webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined

module.exports = config => {
	config.set({
		frameworks: [ 'jasmine' ],
		files: [ 'test/**/*.js', 'effects/**/test/**/*.js' ],
		webpack: webpackConfig,
		preprocessors: { 
			'test/**/*.js': ['webpack'],
			'effects/**/test/**/*.js': ['webpack']
		},
		reporters: [ 'kjhtml' ]
	})
}
