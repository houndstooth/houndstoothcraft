import warn from '../../../src/interface/warn'
import warnings from '../../../src/interface/warnings'

describe('warn', () => {
	it('adds a warning div to the warnings div containing the warning message', () => {
		warn('watch out!')
		warn('my man!')

		expect(warnings.innerHTML).toEqual('<div>watch out!</div><div>my man!</div>')
	})
})
