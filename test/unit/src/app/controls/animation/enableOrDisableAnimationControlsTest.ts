import {
	appState,
	composeMainHoundstooth,
	enableOrDisableAnimationControls,
	mainHoundstoothHasAnimations,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('enable or disable animation controls', () => {
	let subject: () => void
	let mainHoundstoothHasAnimationsSpy: Spy
	beforeEach(() => {
		mainHoundstoothHasAnimationsSpy = spyOn(mainHoundstoothHasAnimations, 'default')
		subject = enableOrDisableAnimationControls.default
	})

	describe('when the main houndstooth has animations', () => {
		beforeEach(() => {
			mainHoundstoothHasAnimationsSpy.and.returnValue(true)
			composeMainHoundstooth.default()
			appState.dom.playButton.disabled = true
			appState.dom.frameInput.disabled = true
			appState.dom.pauseButton.disabled = false
			appState.dom.rewindButton.disabled = false
		})

		describe('when the app is not currently animating', () => {
			beforeEach(() => {
				appState.controls.animating = false
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

		describe('when the app is currently animating', () => {
			beforeEach(() => {
				appState.controls.animating = true
				subject()
			})

			it('enables the frame input', () => {
				expect(appState.dom.frameInput.disabled).toBe(false)
			})

			it('disables the play button', () => {
				expect(appState.dom.playButton.disabled).toBe(true)
			})

			it('enables the pause and rewind button', () => {
				expect(appState.dom.pauseButton.disabled).toBe(false)
				expect(appState.dom.rewindButton.disabled).toBe(false)
			})
		})
	})

	describe('when the houndstooth does not have animations', () => {
		beforeEach(() => {
			mainHoundstoothHasAnimationsSpy.and.returnValue(false)

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
