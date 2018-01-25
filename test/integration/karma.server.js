const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		reporters: [ 'kjhtml' ],
		client: {
			CLOSE_TABS_WATCHER_PORT: process.env.CLOSE_TABS_WATCHER_PORT,
			DEV_SERVER_PORT: process.env.DEV_SERVER_PORT,
			COVERAGE_REPORT_SERVER_PORT: process.env.COVERAGE_REPORT_SERVER_PORT,
			INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT: process.env.INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT,
		},
		files: [
			'testMarkers.js',
			'context/bundle.js',
			'context/styles.css',
			'../../dist/app.js',
			'autoRefresh/closeTabsListener.js',
			'autoRefresh/integrationTestCodeUpdatesListener.js',
		],
		port: process.env.INTEGRATION_TEST_SERVER_PORT,
	})
}
