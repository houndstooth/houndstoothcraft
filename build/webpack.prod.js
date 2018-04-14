const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './index.ts',
	mode: 'production',
	output: { path: __dirname + '/../dist', filename: 'bundle.js' },
}
