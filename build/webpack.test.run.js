const webpackTestConfig = require('./webpack.test')

module.exports = Object.assign({}, webpackTestConfig, {
	entry: './test/integration/index.ts',
})
