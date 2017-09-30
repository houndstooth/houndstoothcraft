const karmaBaseConfig = require('./karma.common')

module.exports = config => {
	config.set(Object.assign(karmaBaseConfig, {
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 5000,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
		files: [ 'index.js' ],
		preprocessors: { 'index.js': [ 'webpack' ] },
		webpack: require('../../build/webpack.test'),
	}))
}
