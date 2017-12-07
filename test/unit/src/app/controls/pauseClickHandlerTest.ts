import { appState, NullarySideEffector, pauseClickHandler } from '../../../../../src'

const subject: NullarySideEffector = pauseClickHandler.default

describe('pause click handler', () => {
	it('sets animating to false', () => {
		appState.controls.animating = true

		subject()

		expect(appState.controls.animating).toBe(false)
	})

	it('enables the play button', () => {
		appState.dom.playButton.disabled = true

		subject()

		expect(appState.dom.playButton.disabled).toBe(false)
	})

	it('disables the pause button', () => {
		appState.dom.pauseButton.disabled = false

		subject()

		expect(appState.dom.pauseButton.disabled).toBe(true)
	})
})
