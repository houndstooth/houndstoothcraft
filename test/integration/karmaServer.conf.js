const karmaBaseConfig = require('./karmaBaseConfig')

module.exports = config => {
	config.set(Object.assign(karmaBaseConfig, {
		reporters: [ 'kjhtml' ],
	}))
}
