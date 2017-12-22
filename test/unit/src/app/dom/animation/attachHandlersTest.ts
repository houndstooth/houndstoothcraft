import {
	appState,
	attachHandlers,
	frameInputHandler,
	pauseHandler,
	playHandler,
	rewindHandler,
	snapshotHandler,
} from '../../../../../../src/indexForTest'

describe('attach handlers', () => {
	let subject: () => void
	beforeEach(() => {
		subject = attachHandlers.default
	})

	it('attaches the handlers for the controls', () => {
		subject()

		expect(appState.dom.frameInput.onchange).toBe(frameInputHandler.default)
		expect(appState.dom.playButton.onclick).toBe(playHandler.default)
		expect(appState.dom.pauseButton.onclick).toBe(pauseHandler.default)
		expect(appState.dom.rewindButton.onclick).toBe(rewindHandler.default)
		expect(appState.dom.snapshotButton.onclick).toBe(snapshotHandler.default)
	})
})
