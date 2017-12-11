import { appState, Frame, getCurrentFrame, to } from '../../../../../src/indexForTest'

const subject: () => Frame = getCurrentFrame.default

describe('get current frame', () => {
	it('returns the current frame', () => {
		appState.controls.currentFrame = to.Frame(57)

		expect(subject()).toBe(to.Frame(57))
	})
})
