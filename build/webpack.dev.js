const common = require('./webpack.common')

module.exports = Object.assign(common, {
	entry: './dev/index.js',
	devtool: 'eval-source-map',
	watch: true,
})
