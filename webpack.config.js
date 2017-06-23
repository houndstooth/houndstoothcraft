const path = require('path')

module.exports = {
	devtool: 'source-map',
	entry: './src/index.js',
	output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: { presets: ['es2015'], plugins: ['rewire'] }
			}
		]
	},
	node: { fs: 'empty' }
}