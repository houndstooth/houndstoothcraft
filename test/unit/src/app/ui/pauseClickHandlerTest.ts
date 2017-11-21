import { pauseClickHandler } from '../../../../../src/app/ui/pauseClickHandler'
import { state } from '../../../../../src/state'
import { mockQuerySelector } from '../../../helpers/mockQuerySelector'

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

		pauseClickHandler()

		expect(state.animating).toBe(false)
	})

	it('enables the play button', () => {
		pauseClickHandler()

		expect(playButton.disabled).toBe(false)
	})

	it('disables the pause button', () => {
		pauseClickHandler()

		expect(pauseButton.disabled).toBe(true)
	})
})
