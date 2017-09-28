const common = require('../jasmine.common.js')

module.exports = Object.assign(common, {
	spec_dir: '.',
	spec_files: [ '**/test/unit/src/**/*.js' ],
})
