import {
	attachControlHandlers,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../../../../../src'
import { mockQuerySelector } from '../../../helpers'

describe('attach control handlers', () => {
	it('attaches the handlers for the controls', () => {
		const {
			playButton: tmpPlayButton,
			pauseButton: tmpPauseButton,
			rewindButton: tmpRewindButton,
			snapshotButton: tmpSnapshotButton,
		} = mockQuerySelector()
		const playButton: HTMLButtonElement = tmpPlayButton as HTMLButtonElement
		const pauseButton: HTMLButtonElement = tmpPauseButton as HTMLButtonElement
		const rewindButton: HTMLButtonElement = tmpRewindButton as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = tmpSnapshotButton as HTMLButtonElement

		attachControlHandlers.main()

		expect(playButton.onclick).toBe(playClickHandler.main)
		expect(pauseButton.onclick).toBe(pauseClickHandler.main)
		expect(rewindButton.onclick).toBe(rewindClickHandler.main)
		expect(snapshotButton.onclick).toBe(snapshotClickHandler.main)
	})
})
