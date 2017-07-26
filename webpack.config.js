const path = require('path')

module.exports = {
	devtool: 'source-map',
	entry: './index.js',
	output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
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
