const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign({}, webpackCommonConfig, {
	entry: './dev/index.js',
	devtool: 'eval-source-map',
	plugins: [ new webpack.HotModuleReplacementPlugin() ],
	devServer: {
		contentBase: "dist",
		hot: true,
		inline: true,
	}
})
