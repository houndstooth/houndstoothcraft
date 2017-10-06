const webpackCommonConfig = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign({}, webpackCommonConfig, {
	entry: './index.ts',
	plugins: [ new UglifyJSPlugin() ],
	output: { path: __dirname + '/../dist', filename: 'bundle.js' },
})
