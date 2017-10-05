module.exports = {
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js" ]
	},
	node: { fs: 'empty' },
}
