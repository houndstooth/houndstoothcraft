const webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined

module.exports = config => {
	config.set({
		frameworks: [ 'jasmine' ],
		files: [
			'test/integration/**/*.js',
			'**/test/effects/**/*.js'
		],
		webpack: webpackConfig,
		preprocessors: {
			'test/integration/**/*.js': [ 'webpack' ],
			'**/test/effects/**/*.js': [ 'webpack' ],
		},
		reporters: [ 'kjhtml' ],
        browserNoActivityTimeout: 100000,
	})
}
