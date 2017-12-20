import {
	appState,
	composeMainHoundstooth,
	enableOrDisableAnimationControls,
	to,
	Unit,
} from '../../../../../../src/indexForTest'

describe('enable or disable animation controls', () => {
	let subject: () => void
	beforeEach(() => {
		subject = enableOrDisableAnimationControls.default
	})

	describe('when the main houndstooth has animations', () => {
		beforeEach(() => {
			appState.settings.overrides = { animationsPattern: { tileSettings: { tileSize: (): Unit => to.Unit(0) } } }
			composeMainHoundstooth.default()
			appState.dom.playButton.disabled = true
			appState.dom.frameInput.disabled = true
			appState.dom.pauseButton.disabled = false
			appState.dom.rewindButton.disabled = false

			subject()
		})

		it('enables the play button and frame input', () => {
			expect(appState.dom.playButton.disabled).toBe(false)
			expect(appState.dom.frameInput.disabled).toBe(false)

		})

		it('disables the pause and rewind button', () => {
			expect(appState.dom.pauseButton.disabled).toBe(true)
			expect(appState.dom.rewindButton.disabled).toBe(true)
		})
	})

	describe('when the houndstooth does not have animations', () => {
		beforeEach(() => {
			appState.dom.playButton.disabled = false
			appState.dom.frameInput.disabled = false
			appState.dom.pauseButton.disabled = false
			appState.dom.rewindButton.disabled = false

			subject()
		})

		it('disables all animation controls', () => {
			expect(appState.dom.playButton.disabled).toBe(true)
			expect(appState.dom.frameInput.disabled).toBe(true)
			expect(appState.dom.pauseButton.disabled).toBe(true)
			expect(appState.dom.rewindButton.disabled).toBe(true)
		})
	})
})
