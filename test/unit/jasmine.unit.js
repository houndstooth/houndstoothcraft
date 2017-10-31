require('core-js')
const jasmineCommonConfig = require('../jasmine.common.js')

module.exports = Object.assign({}, jasmineCommonConfig, {
	spec_dir: '.',
	spec_files: [ '**/test/unit/src/**/*.ts' ],
})
