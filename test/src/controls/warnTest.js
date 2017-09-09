import warn from '../../../src/controls/warn'

describe('warn', () => {
	it('adds a warning div to the warnings div containing the warning message', () => {
		warn('watch out!')
		warn('my man!')

		const warnings = document.querySelector('.warnings')
		expect(warnings.innerHTML).toEqual('<div>watch out!</div><div>my man!</div>')
	})
})
