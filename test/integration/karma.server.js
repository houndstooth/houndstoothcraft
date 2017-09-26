const karmaBaseConfig = require('./karma.common')

module.exports = config => {
	config.set(Object.assign(karmaBaseConfig, {
		reporters: [ 'kjhtml' ],
	}))
}
