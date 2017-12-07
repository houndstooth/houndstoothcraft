import {
	appState,
	attachControlHandlers,
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../../../../../src'

describe('attach control handlers', () => {
	it('attaches the handlers for the controls', () => {
		attachControlHandlers.default()

		expect(appState.dom.frameInput.onchange).toBe(frameInputChangeHandler.default)
		expect(appState.dom.playButton.onclick).toBe(playClickHandler.default)
		expect(appState.dom.pauseButton.onclick).toBe(pauseClickHandler.default)
		expect(appState.dom.rewindButton.onclick).toBe(rewindClickHandler.default)
		expect(appState.dom.snapshotButton.onclick).toBe(snapshotClickHandler.default)
	})
})
