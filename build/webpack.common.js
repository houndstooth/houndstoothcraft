module.exports = {
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
				query: {
					configFileName: './build/tsconfig.browser.json',
				},
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js" ]
	},
	output: { path: __dirname + '/../dist', filename: 'bundle.js' },
	node: { fs: 'empty' },
}
