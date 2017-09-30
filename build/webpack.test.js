const common = require('./webpack.common')

module.exports = Object.assign(common, {
	entry: './test/integration/index.js',
	watch: true,
	output: { path: __dirname + '/../test/integration/dist', filename: 'bundle.js' },
})
