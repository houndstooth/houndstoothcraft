const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './test/integration/karmaIndex.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
				query: {
					configFileName: './build/tsconfig.test.json',
				},
			},
		],
	},
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
}
