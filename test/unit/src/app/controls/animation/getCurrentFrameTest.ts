import { appState, Frame, getCurrentFrame, to } from '../../../../../../src/indexForTest'

describe('get current frame', () => {
	let subject: () => Frame
	beforeEach(() => {
		subject = getCurrentFrame.default
	})

	it('returns the current frame', () => {
		appState.controls.currentFrame = to.Frame(57)

		expect(subject()).toBe(to.Frame(57))
	})
})
