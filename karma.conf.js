const webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined

module.exports = config => {
	config.set({
		frameworks: [ 'jasmine' ],
		files: [
			'test/integration/karmaTestIndex.js',
		],
		webpack: webpackConfig,
		preprocessors: {
			'test/integration/karmaTestIndex.js': [ 'webpack' ],
		},
		reporters: [ 'kjhtml' ],
        browserNoActivityTimeout: 100000,
	})
}
