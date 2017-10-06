const webpackCommonConfig = require('./webpack.common')

module.exports = Object.assign({}, webpackCommonConfig, {
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
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
})
