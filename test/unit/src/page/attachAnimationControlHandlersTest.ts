import { attachAnimationControlHandlers } from '../../../../src/page/attachAnimationControlHandlers'
import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../../../../src/ui/animationControlHandlers'
import { mockQuerySelector } from '../../helpers/mockQuerySelector'

describe('attach animation control handlers', () => {
	it('attaches the handlers for the animation controls', () => {
		const { playButton, pauseButton, rewindButton } = mockQuerySelector()

		attachAnimationControlHandlers()

		expect(playButton.onclick).toBe(playClickHandler)
		expect(pauseButton.onclick).toBe(pauseClickHandler)
		expect(rewindButton.onclick).toBe(rewindClickHandler)
	})
})
