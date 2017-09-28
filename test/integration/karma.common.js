module.exports = ({
	files: [ 'index.js' ],
	preprocessors: { 'index.js': [ 'webpack' ] },
	webpack: require('../../build/webpack.test'),
	frameworks: [ 'jasmine' ],
})
