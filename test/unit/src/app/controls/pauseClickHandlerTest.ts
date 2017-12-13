import { appState, pauseClickHandler } from '../../../../../src/indexForTest'

describe('pause click handler', () => {
	let subject: () => void
	beforeEach(() => {
		subject = pauseClickHandler.default
	})

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
