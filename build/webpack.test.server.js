const webpack = require('webpack')
const webpackTestConfig = require('./webpack.test')

module.exports = Object.assign(webpackTestConfig, {
	entry: './test/integration/autoRefresh/index.js',
	watch: true,
	plugins: [ new webpack.EnvironmentPlugin(['KARMA_WATCHER_PORT']) ],
})
