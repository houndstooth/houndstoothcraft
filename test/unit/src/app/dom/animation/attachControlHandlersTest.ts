import {
	appState,
	attachControlHandlers,
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../../../../../../src/indexForTest'

describe('attach control handlers', () => {
	let subject: () => void
	beforeEach(() => {
		subject = attachControlHandlers.default
	})

	it('attaches the handlers for the controls', () => {
		subject()

		expect(appState.dom.frameInput.onchange).toBe(frameInputChangeHandler.default)
		expect(appState.dom.playButton.onclick).toBe(playClickHandler.default)
		expect(appState.dom.pauseButton.onclick).toBe(pauseClickHandler.default)
		expect(appState.dom.rewindButton.onclick).toBe(rewindClickHandler.default)
		expect(appState.dom.snapshotButton.onclick).toBe(snapshotClickHandler.default)
	})
})
