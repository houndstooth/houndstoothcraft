import { appState, cancelCurrentPattern } from '../../../../../../src/indexForTest'

describe('cancel current pattern', () => {
	it('sets the frame id to a new random number', () => {
		const subject: () => void = cancelCurrentPattern.default
		spyOn(Math, 'random').and.returnValue(0.4987)

		subject()

		expect(appState.execute.patternId).toBe(0.4987)
	})
})
