const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		files: [
			'testMarkers.js',
			'context/bundle.js',
			'../../dist/app.js',
		],
		browserNoActivityTimeout: 100000,
		reportSlowerThan: 1500,
		browsers: [ 'ChromeHeadless' ],
		singleRun: true,
	})
}
