const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './build/indexWithHotModules.ts',
	mode: 'development',
	devServer: {
		static: 'dist',
		hot: true,
		port: process.env.DEV_SERVER_PORT,
	},
}
