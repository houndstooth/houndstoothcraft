const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set({
		...karmaCommonConfig,
		reporters: [ 'kjhtml' ],
		files: [ 'context/bundle.js', 'context/styles.css' ],
		customDebugFile: 'context/debug.html',
		port: process.env.INTEGRATION_TEST_SERVER_PORT,
	})
}
