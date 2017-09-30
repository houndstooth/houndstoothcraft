const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign(webpackCommonConfig, {
	entry: './test/integration/index.js',
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
})
