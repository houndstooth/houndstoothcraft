const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		reporters: [ 'kjhtml' ],
		files: [ 'dist/bundle.js', 'dist/styles.css' ],
		customDebugFile: 'dist/debug.html',
		port: process.env.INTEGRATION_TEST_SERVER_PORT,
	})
}
