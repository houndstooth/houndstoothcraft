const karmaCommonConfig = require('./karma.common')

module.exports = config => {
	config.set(Object.assign(karmaCommonConfig, {
		reporters: [ 'kjhtml' ],
	}))
}
