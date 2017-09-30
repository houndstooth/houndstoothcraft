const webpackTestConfig = require('./webpack.test')

module.exports = Object.assign(webpackTestConfig, {
	watch: true,
})
