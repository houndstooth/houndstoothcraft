import {
	executeSelectedHoundstoothEffects,
	mixDownContexts,
	NullarySideEffector,
	playClickHandler,
	state,
	to,
} from '../../../../../src'
import Spy = jasmine.Spy
import { mockQuerySelector } from '../../../helpers'

describe('play click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let playButton: HTMLButtonElement
	let pauseButton: HTMLButtonElement
	let rewindButton: HTMLButtonElement

	beforeEach(() => {
		spyOn(mixDownContexts, 'default')
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		const {
			playButton: tmpPlayButton,
			pauseButton: tmpPauseButton,
			rewindButton: tmpRewindButton,
		} = mockQuerySelector()
		playButton = tmpPlayButton as HTMLButtonElement
		pauseButton = tmpPauseButton as HTMLButtonElement
		rewindButton = tmpRewindButton as HTMLButtonElement
	})

	describe('when already animating', () => {
		beforeEach(() => {
			state.animating = true
			playButton.disabled = true
			pauseButton.disabled = false

			playClickHandler.default()
		})

		// tslint:disable-next-line:max-line-length
		it('stays animating (this situation where you could click the button while it is already animating should never be the case though once disabling works)', () => {
			expect(state.animating).toBe(true)
		})

		it('keeps the play button disabled', () => {
			expect(playButton.disabled).toBe(true)
		})

		it('keeps the pause button enabled', () => {
			expect(pauseButton.disabled).toBe(false)
		})

		it('does not execute the selected houndstooth effects again', () => {
			expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
		})

		it('does not mix down the contexts', () => {
			expect(mixDownContexts.default).not.toHaveBeenCalled()
		})
	})

	describe('when not already animating', () => {
		beforeEach(() => {
			state.animating = false
			playButton.disabled = false
			pauseButton.disabled = true
		})

		it('set animating to true', () => {
			playClickHandler.default()

			expect(state.animating).toBe(true)
		})

		it('mixes down the contexts', () => {
			playClickHandler.default()

			expect(mixDownContexts.default).toHaveBeenCalled()
		})

		it('disables the play button', () => {
			playClickHandler.default()

			expect(playButton.disabled).toBe(true)
		})

		it('enables the pause button', () => {
			playClickHandler.default()

			expect(pauseButton.disabled).toBe(false)
		})

		describe('current frame', () => {
			describe('when 0', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(0)
				})

				it('executes the selected houndstooth effects', () => {
					playClickHandler.default()

					expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
				})

				it('enables the rewind button', () => {
					rewindButton.disabled = true

					playClickHandler.default()

					expect(rewindButton.disabled).toBe(false)
				})
			})

			describe('when not 0 (restarting after a pause)', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(4000)
				})

				it('does not re-execute the selected houndstooth effects', () => {
					playClickHandler.default()

					expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
				})
			})
		})
	})
})
