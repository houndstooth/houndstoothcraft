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

		attachControlHandlers.default()

		expect(playButton.onclick).toBe(playClickHandler.default)
		expect(pauseButton.onclick).toBe(pauseClickHandler.default)
		expect(rewindButton.onclick).toBe(rewindClickHandler.default)
		expect(snapshotButton.onclick).toBe(snapshotClickHandler.default)
	})
})
