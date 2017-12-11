import {
	appState,
	attachControlHandlers,
	frameInputChangeHandler,
	NullarySideEffector,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../../../../../src/indexForTest'

const subject: NullarySideEffector = attachControlHandlers.default

describe('attach control handlers', () => {
	it('attaches the handlers for the controls', () => {
		subject()

		expect(appState.dom.frameInput.onchange).toBe(frameInputChangeHandler.default)
		expect(appState.dom.playButton.onclick).toBe(playClickHandler.default)
		expect(appState.dom.pauseButton.onclick).toBe(pauseClickHandler.default)
		expect(appState.dom.rewindButton.onclick).toBe(rewindClickHandler.default)
		expect(appState.dom.snapshotButton.onclick).toBe(snapshotClickHandler.default)
	})
})
