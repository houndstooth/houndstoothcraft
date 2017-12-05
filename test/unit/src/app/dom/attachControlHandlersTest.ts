import {
	attachControlHandlers,
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
	state,
} from '../../../../../src'

describe('attach control handlers', () => {
	it('attaches the handlers for the controls', () => {
		attachControlHandlers.default()

		expect(state.dom.frameInput.onchange).toBe(frameInputChangeHandler.default)
		expect(state.dom.playButton.onclick).toBe(playClickHandler.default)
		expect(state.dom.pauseButton.onclick).toBe(pauseClickHandler.default)
		expect(state.dom.rewindButton.onclick).toBe(rewindClickHandler.default)
		expect(state.dom.snapshotButton.onclick).toBe(snapshotClickHandler.default)
	})
})
