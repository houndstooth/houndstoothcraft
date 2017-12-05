import {
	composeMainHoundstooth,
	enableOrDisableAnimationControls,
	NullarySideEffector,
	PatternFunctions,
	state,
	to,
	Unit,
} from '../../../../../src'

const subject: NullarySideEffector = enableOrDisableAnimationControls.default

describe('enable or disable animation controls', () => {
	describe('when the main houndstooth has animations', () => {
		beforeEach(() => {
			const animationsPattern: PatternFunctions = { tileSettings: { tileSize: (): Unit => to.Unit(0) } }
			composeMainHoundstooth.default({ houndstoothOverrides: { animationsPattern } })
			state.dom.playButton.disabled = true
			state.dom.frameInput.disabled = true
			state.dom.pauseButton.disabled = false
			state.dom.rewindButton.disabled = false

			subject()
		})

		it('enables the play button and frame input', () => {
			expect(state.dom.playButton.disabled).toBe(false)
			expect(state.dom.frameInput.disabled).toBe(false)

		})

		it('disables the pause and rewind button', () => {
			expect(state.dom.pauseButton.disabled).toBe(true)
			expect(state.dom.rewindButton.disabled).toBe(true)
		})
	})

	describe('when the houndstooth does not have animations', () => {
		beforeEach(() => {
			const animationsPattern: PatternFunctions = {}
			composeMainHoundstooth.default({ houndstoothOverrides: { animationsPattern } })
			state.dom.playButton.disabled = false
			state.dom.frameInput.disabled = false
			state.dom.pauseButton.disabled = false
			state.dom.rewindButton.disabled = false

			subject()
		})

		it('disables all animation controls', () => {
			expect(state.dom.playButton.disabled).toBe(true)
			expect(state.dom.frameInput.disabled).toBe(true)
			expect(state.dom.pauseButton.disabled).toBe(true)
			expect(state.dom.rewindButton.disabled).toBe(true)
		})
	})
})
