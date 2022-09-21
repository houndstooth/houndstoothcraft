const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	entry: './test/integration/karmaIndex.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'build/tsconfig.test.json',
				},
			},
		],
	},
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
}
