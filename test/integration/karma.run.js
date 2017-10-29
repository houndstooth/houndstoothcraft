const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 5000,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	})
}
