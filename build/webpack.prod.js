const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign({}, webpackCommonConfig, {
	entry: './index.ts',
	plugins: [ new webpack.optimize.UglifyJsPlugin() ],
	output: { path: __dirname + '/../dist', filename: 'bundle.js' },
})
