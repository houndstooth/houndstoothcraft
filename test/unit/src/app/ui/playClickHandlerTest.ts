import * as execute from '../../../../../src/app/execute'
import { playClickHandler } from '../../../../../src/app/ui/playClickHandler'
import { state } from '../../../../../src/state'
import Spy = jasmine.Spy
import * as to from '../../../../../src/to'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import { mockQuerySelector } from '../../../helpers/mockQuerySelector'

describe('play click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let playButton: HTMLButtonElement
	let pauseButton: HTMLButtonElement
	let rewindButton: HTMLButtonElement

	beforeEach(() => {
		executeSelectedHoundstoothEffectsSpy = spyOn(execute, 'executeSelectedHoundstoothEffects')
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
		})

		// tslint:disable-next-line:max-line-length
		it('stays animating (this situation where you could click the button while it is already animating should never be the case though once disabling works)', () => {
			playClickHandler()

			expect(state.animating).toBe(true)
		})

		it('keeps the play button disabled', () => {
			playClickHandler()

			expect(playButton.disabled).toBe(true)
		})

		it('keeps the pause button enabled', () => {
			playClickHandler()

			expect(pauseButton.disabled).toBe(false)
		})

		it('does not execute the selected houndstooth effects again', () => {
			playClickHandler()

			expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
		})
	})

	describe('when not already animating', () => {
		beforeEach(() => {
			state.animating = false
			playButton.disabled = false
			pauseButton.disabled = true
		})

		it('set animating to true', () => {
			playClickHandler()

			expect(state.animating).toBe(true)
		})

		it('disables the play button', () => {
			playClickHandler()

			expect(playButton.disabled).toBe(true)
		})

		it('enables the pause button', () => {
			playClickHandler()

			expect(pauseButton.disabled).toBe(false)
		})

		describe('current frame', () => {
			describe('when 0', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(0)
				})

				it('executes the selected houndstooth effects', () => {
					playClickHandler()

					expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
				})

				it('enables the rewind button', () => {
					rewindButton.disabled = true

					playClickHandler()

					expect(rewindButton.disabled).toBe(false)
				})
			})

			describe('when not 0 (restarting after a pause)', () => {
				beforeEach(() => {
					state.currentFrame = to.Frame(4000)
				})

				it('does not re-execute the selected houndstooth effects', () => {
					playClickHandler()

					expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
				})
			})
		})
	})
})
