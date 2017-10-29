const webpackTestConfig = require('./webpack.test')

module.exports = {
	...webpackTestConfig,
	entry: './test/integration/index.ts',
}
