const common = require('./webpack.common')

module.exports = Object.assign(common, {
	devtool: 'eval-source-map',
	watch: true,
})
