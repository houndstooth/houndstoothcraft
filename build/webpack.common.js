module.exports = {
	module: {
		loaders: [
			{
				test: /\.[jt]s$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		],
	},
	node: { fs: 'empty' },
}
