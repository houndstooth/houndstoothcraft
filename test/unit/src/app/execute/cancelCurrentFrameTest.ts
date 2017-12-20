import { appState, cancelCurrentFrame } from '../../../../../src/indexForTest'

describe('cancel current frame', () => {
	it('sets the frame id to a new random number', () => {
		const subject: () => void = cancelCurrentFrame.default
		spyOn(Math, 'random').and.returnValue(0.4987)

		subject()

		expect(appState.execute.frameId).toBe(0.4987)
	})
})
