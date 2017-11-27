import { pauseClickHandler, state } from '../../../../../src'
import { mockQuerySelector } from '../../../helpers'

describe('pause click handler', () => {
	let playButton: HTMLButtonElement
	let pauseButton: HTMLButtonElement

	beforeEach(() => {
		const {
			playButton: tmpPlayButton,
			pauseButton: tmpPauseButton,
		} = mockQuerySelector()
		playButton = tmpPlayButton as HTMLButtonElement
		pauseButton = tmpPauseButton as HTMLButtonElement
	})

	it('sets animating to false', () => {
		state.animating = true
		playButton.disabled = true
		pauseButton.disabled = false

		pauseClickHandler.default()

		expect(state.animating).toBe(false)
	})

	it('enables the play button', () => {
		pauseClickHandler.default()

		expect(playButton.disabled).toBe(false)
	})

	it('disables the pause button', () => {
		pauseClickHandler.default()

		expect(pauseButton.disabled).toBe(true)
	})
})
