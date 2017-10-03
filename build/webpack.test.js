const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign({}, webpackCommonConfig, {
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
})
