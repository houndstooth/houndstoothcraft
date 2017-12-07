import { appState, pauseClickHandler } from '../../../../../src'

describe('pause click handler', () => {
	it('sets animating to false', () => {
		appState.controls.animating = true

		pauseClickHandler.default()

		expect(appState.controls.animating).toBe(false)
	})

	it('enables the play button', () => {
		appState.dom.playButton.disabled = true

		pauseClickHandler.default()

		expect(appState.dom.playButton.disabled).toBe(false)
	})

	it('disables the pause button', () => {
		appState.dom.pauseButton.disabled = false

		pauseClickHandler.default()

		expect(appState.dom.pauseButton.disabled).toBe(true)
	})
})
