import { attachControlHandlers } from '../../../../../src/app/page/attachControlHandlers'
import { pauseClickHandler } from '../../../../../src/app/ui/pauseClickHandler'
import { playClickHandler } from '../../../../../src/app/ui/playClickHandler'
import { rewindClickHandler } from '../../../../../src/app/ui/rewindClickHandler'
import { snapshotClickHandler } from '../../../../../src/app/ui/snapshotClickHandler'
import { mockQuerySelector } from '../../../helpers/mockQuerySelector'

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

		attachControlHandlers()

		expect(playButton.onclick).toBe(playClickHandler)
		expect(pauseButton.onclick).toBe(pauseClickHandler)
		expect(rewindButton.onclick).toBe(rewindClickHandler)
		expect(snapshotButton.onclick).toBe(snapshotClickHandler)
	})
})
