const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		files: [ 'context/bundle.js' ],
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 1500,
		customContextFile: 'context/index.html',
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	})
}
