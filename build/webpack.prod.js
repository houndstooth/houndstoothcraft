const webpackCommonConfig = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign(webpackCommonConfig, {
	plugins: [ new UglifyJSPlugin() ],
})
