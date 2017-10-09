const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign({}, webpackCommonConfig, {
	entry: './dev/index.ts',
	devtool: 'eval-source-map',
	plugins: [ new webpack.HotModuleReplacementPlugin() ],
	devServer: {
		contentBase: "dist",
		hot: true,
		inline: true,
		port: process.env.DEV_SERVER_PORT,
	}
})
