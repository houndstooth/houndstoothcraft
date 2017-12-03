import {
	composeMainHoundstooth,
	enableOrDisableAnimationControls,
	NullarySideEffector,
	PatternFunctions,
	to,
	Unit,
} from '../../../../../src'
import { mockQuerySelector } from '../../../helpers'

const subject: NullarySideEffector = enableOrDisableAnimationControls.default

describe('enable or disable animation controls', () => {
	let frameInput: HTMLInputElement
	let playButton: HTMLButtonElement
	let pauseButton: HTMLButtonElement
	let rewindButton: HTMLButtonElement

	beforeEach(() => {
		const {
			frameInput: tmpFrameInput,
			playButton: tmpPlayButton,
			pauseButton: tmpPauseButton,
			rewindButton: tmpRewindButton,
		} = mockQuerySelector()
		frameInput = tmpFrameInput as HTMLInputElement
		playButton = tmpPlayButton as HTMLButtonElement
		pauseButton = tmpPauseButton as HTMLButtonElement
		rewindButton = tmpRewindButton as HTMLButtonElement
	})

	describe('when the main houndstooth has animations', () => {
		beforeEach(() => {
			const animationsPattern: PatternFunctions = { tileSettings: { tileSize: (): Unit => to.Unit(0) } }
			composeMainHoundstooth.default({ houndstoothOverrides: { animationsPattern } })
			playButton.disabled = true
			frameInput.disabled = true
			pauseButton.disabled = false
			rewindButton.disabled = false

			subject()
		})

		it('enables the play button and frame input', () => {
			expect(playButton.disabled).toBe(false)
			expect(frameInput.disabled).toBe(false)

		})

		it('disables the pause and rewind button', () => {
			expect(pauseButton.disabled).toBe(true)
			expect(rewindButton.disabled).toBe(true)
		})
	})

	describe('when the houndstooth does not have animations', () => {
		beforeEach(() => {
			const animationsPattern: PatternFunctions = {}
			composeMainHoundstooth.default({ houndstoothOverrides: { animationsPattern } })
			playButton.disabled = false
			frameInput.disabled = false
			pauseButton.disabled = false
			rewindButton.disabled = false

			subject()
		})

		it('disables all animation controls', () => {
			expect(playButton.disabled).toBe(true)
			expect(frameInput.disabled).toBe(true)
			expect(pauseButton.disabled).toBe(true)
			expect(rewindButton.disabled).toBe(true)
		})
	})
})
