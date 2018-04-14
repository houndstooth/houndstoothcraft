const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './build/indexWithHotModules.ts',
	mode: 'development',
	plugins: [ new webpack.HotModuleReplacementPlugin() ],
	devServer: {
		contentBase: 'dist',
		hot: true,
		inline: true,
		port: process.env.DEV_SERVER_PORT,
	},
}
