import { appState, pauseHandler } from '../../../../../../src/indexForTest'

describe('pause handler', () => {
	let subject: () => void
	beforeEach(() => {
		subject = pauseHandler.default
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
