const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'build/tsconfig.browser.json',
				},
			},
		],
	},
	entry: './index.ts',
	mode: 'production',
}
