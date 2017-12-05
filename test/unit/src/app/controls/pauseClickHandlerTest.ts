import { pauseClickHandler, state } from '../../../../../src'

describe('pause click handler', () => {
	it('sets animating to false', () => {
		state.controls.animating = true

		pauseClickHandler.default()

		expect(state.controls.animating).toBe(false)
	})

	it('enables the play button', () => {
		state.dom.playButton.disabled = true

		pauseClickHandler.default()

		expect(state.dom.playButton.disabled).toBe(false)
	})

	it('disables the pause button', () => {
		state.dom.pauseButton.disabled = false

		pauseClickHandler.default()

		expect(state.dom.pauseButton.disabled).toBe(true)
	})
})
