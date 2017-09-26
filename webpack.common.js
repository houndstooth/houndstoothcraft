module.exports = {
	entry: './index.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	node: { fs: 'empty' },
}
