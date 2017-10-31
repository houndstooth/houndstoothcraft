const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set(Object.assign({}, karmaCommonConfig, {
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 300,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	}))
}
