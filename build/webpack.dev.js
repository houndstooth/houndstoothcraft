const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign(webpackCommonConfig, {
	entry: './dev/index.js',
	devtool: 'eval-source-map',
	watch: true,
})
