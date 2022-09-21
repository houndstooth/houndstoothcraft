module.exports = {
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.browser.json',
				},
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js" ],
		fallback: { fs: false }
	},
	output: { path: __dirname + '/../dist', filename: 'bundle.js' },
}
