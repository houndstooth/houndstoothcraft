module.exports = ({
	frameworks: [ 'jasmine' ],
	files: [ 'dist/bundle.js' ],
	client: { jasmine: require('../jasmine.common') }
})
