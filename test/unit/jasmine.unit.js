const jasmineCommonConfig = require('../jasmine.common.js')

module.exports = {
	...jasmineCommonConfig,
	// stopSpecOnExpectationFailure: false,
	spec_dir: '.',
	spec_files: [ 'test/unit/src/**/*.ts', 'effects/*/test/unit/**/*.ts' ],
}
