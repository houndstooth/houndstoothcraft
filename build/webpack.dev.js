const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign(webpackCommonConfig, {
	entry: './dev/index.js',
	devtool: 'eval-source-map',
	watch: true,
	plugins: [ new webpack.EnvironmentPlugin(['WATCHER_PORT']) ],
})
