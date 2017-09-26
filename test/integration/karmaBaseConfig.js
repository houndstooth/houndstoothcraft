const webpackConfig = require('../../webpack.common')
webpackConfig.entry = undefined

module.exports = ({
	files: [ 'karmaTestIndex.js' ],
	preprocessors: { 'karmaTestIndex.js': [ 'webpack' ] },
	webpack: webpackConfig,
	frameworks: [ 'jasmine' ],
})
