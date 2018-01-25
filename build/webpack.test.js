const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './test/integration/karmaIndex.ts',
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				query: {
					configFileName: './build/tsconfig.test.json',
				},
			},
		],
	},
	output: { path: __dirname + '/../test/integration/context', filename: 'bundle.js' },
}
