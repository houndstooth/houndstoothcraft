import { createOverrideClear, overrideClearHandler } from '../../../../../../src/indexForTest'

describe('create override clear', () => {
	it('makes a button which reads "clear" and which clears the corresponding override upon click', () => {
		const subject: () => HTMLButtonElement = createOverrideClear.default

		const actualClear: HTMLButtonElement = subject()

		expect(actualClear.onclick).toBe(overrideClearHandler.default)
		expect(actualClear.innerHTML).toBe('clear')
	})
})
