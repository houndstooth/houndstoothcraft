const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
	output: { path: __dirname + '/dist', filename: 'bundle.js' },
	plugins: [ new UglifyJSPlugin() ]
})
