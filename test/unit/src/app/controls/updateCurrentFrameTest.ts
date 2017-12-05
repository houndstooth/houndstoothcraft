import { Frame, state, to, updateCurrentFrame } from '../../../../../src'

const subject: (frame: Frame) => void = updateCurrentFrame.default

describe('update current frame', () => {
	beforeEach(() => {
		subject(to.Frame(543))
	})

	it('updates the current frame on the state', () => {
		expect(state.controls.currentFrame).toBe(to.Frame(543))
	})

	it('updates the current frame in the frame input', () => {
		expect(state.dom.frameInput.value).toBe('543')
	})
})
