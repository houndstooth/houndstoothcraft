import { attachAnimationControlHandlers } from '../../../../src/page/attachAnimationControlHandlers'
import { PageElement } from '../../../../src/page/types'
import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../../../../src/ui/animationControlHandlers'
import { document } from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('attach animation control handlers', () => {
	it('attaches the handlers for the animation controls', () => {
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(document, 'querySelector').and.callFake((selector: string): PageElement => {
			switch (selector) {
				case '.play-button':
					return playButton
				case '.pause-button':
					return pauseButton
				case '.rewind-button':
					return rewindButton
				default:
					return buildMockElement()
			}
		})

		attachAnimationControlHandlers()

		expect(playButton.onclick).toBe(playClickHandler)
		expect(pauseButton.onclick).toBe(pauseClickHandler)
		expect(rewindButton.onclick).toBe(rewindClickHandler)
	})
})
