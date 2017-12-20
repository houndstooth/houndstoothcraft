import { appState, cancelPreviousPattern } from '../../../../../src/indexForTest'

describe('cancel previous pattern', () => {
	it('sets the pattern ref to a new random number', () => {
		const subject: () => void = cancelPreviousPattern.default
		spyOn(Math, 'random').and.returnValue(0.4987)

		subject()

		expect(appState.execute.frameId).toBe(0.4987)
	})
})
