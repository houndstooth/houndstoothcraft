const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 1234,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	})
}
