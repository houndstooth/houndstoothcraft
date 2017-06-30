const webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined

module.exports = config => {
	config.set({
		frameworks: [ 'jasmine' ],
		files: [ 'test/**/*.js' ],
		webpack: webpackConfig,
		preprocessors: { './test/**/*.js': ['webpack'] },
		reporters: [ 'kjhtml' ]
	})
}
