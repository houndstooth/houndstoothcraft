const common = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign(common, {
	plugins: [ new UglifyJSPlugin() ],
})
