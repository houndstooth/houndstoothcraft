module.exports = {
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				query: {
					configFileName: './tsconfig.browser.json',
				},
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js" ]
	},
	node: { fs: 'empty' },
}
