const webpackConfig = require('../../webpack.common')
webpackConfig.entry = undefined

module.exports = ({
	files: [ 'index.js' ],
	preprocessors: { 'index.js': [ 'webpack' ] },
	webpack: webpackConfig,
	frameworks: [ 'jasmine' ],
})
