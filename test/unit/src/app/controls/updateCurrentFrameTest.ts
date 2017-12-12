import { appState, Frame, to, updateCurrentFrame } from '../../../../../src/indexForTest'


describe('update current frame', () => {
	let subject: (_: Frame) => void
	beforeEach(() => {
		subject = updateCurrentFrame.default
		subject(to.Frame(543))
	})

	it('updates the current frame on the app state', () => {
		expect(appState.controls.currentFrame).toBe(to.Frame(543))
	})

	it('updates the current frame in the frame input', () => {
		expect(appState.dom.frameInput.value).toBe('543')
	})
})
