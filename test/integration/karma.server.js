const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set(Object.assign({}, karmaCommonConfig, {
		reporters: [ 'kjhtml' ],
		port: process.env.KARMA_SERVER_PORT,
	}))
}
