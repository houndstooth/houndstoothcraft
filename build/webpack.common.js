module.exports = {
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js" ]
	},
	node: { fs: 'empty' },
}
