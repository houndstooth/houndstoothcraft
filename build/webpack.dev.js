const common = require('./webpack.common')

module.exports = Object.assign(common, {
	entry: './autoRefreshingIndex.js',
	devtool: 'eval-source-map',
	watch: true,
})
