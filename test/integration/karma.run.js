const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		files: [ 'dist/bundle.js' ],
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 1500,
		customContextFile: 'dist/index.html',
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	})
}
