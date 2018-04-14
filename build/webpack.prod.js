const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './index.ts',
	mode: 'production',
}
