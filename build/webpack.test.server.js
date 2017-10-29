const webpack = require('webpack')
const webpackTestConfig = require('./webpack.test')

module.exports = {
	...webpackTestConfig,
	entry: './test/integration/autoRefresh/index.ts',
	watch: true,
	plugins: [
		new webpack.EnvironmentPlugin([
			'INTEGRATION_TEST_CODE_UPDATES_WATCHER_PORT',
			'DEV_SERVER_PORT',
			'COVERAGE_REPORT_SERVER_PORT',
			'CLOSE_TABS_WATCHER_PORT',
		])
	],
}
