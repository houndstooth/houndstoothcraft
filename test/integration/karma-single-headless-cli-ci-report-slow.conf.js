const karmaBaseConfig = require('./karmaBaseConfig')

module.exports = config => {
	config.set(Object.assign(karmaBaseConfig, {
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 1000,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	}))
}
