import { appState, cancelPreviousPattern, NullarySideEffector } from '../../../../../src/indexForTest'


describe('cancel previous pattern', () => {
	it('sets the pattern ref to a new random number', () => {
		const subject: NullarySideEffector = cancelPreviousPattern.default
		spyOn(Math, 'random').and.returnValue(0.4987)

		subject()

		expect(appState.execute.patternRef).toBe(0.4987)
	})
})
