import { attachAnimationControlHandlers } from '../../../../../src/app/page/attachAnimationControlHandlers'
import {
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
} from '../../../../../src/app/ui/animationControlHandlers'
import { mockQuerySelector } from '../../../helpers/mockQuerySelector'

describe('attach animation control handlers', () => {
	it('attaches the handlers for the animation controls', () => {
		const {
			playButton: tmpPlayButton,
			pauseButton: tmpPauseButton,
			rewindButton: tmpRewindButton,
		} = mockQuerySelector()
		const playButton: HTMLButtonElement = tmpPlayButton as HTMLButtonElement
		const pauseButton: HTMLButtonElement = tmpPauseButton as HTMLButtonElement
		const rewindButton: HTMLButtonElement = tmpRewindButton as HTMLButtonElement

		attachAnimationControlHandlers()

		expect(playButton.onclick).toBe(playClickHandler)
		expect(pauseButton.onclick).toBe(pauseClickHandler)
		expect(rewindButton.onclick).toBe(rewindClickHandler)
	})
})
