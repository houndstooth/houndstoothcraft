import {
	executeSelectedHoundstoothEffects,
	mixDownContexts,
	NullarySideEffector,
	playClickHandler,
	state,
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

		state.controls.animating = false
		playButton.disabled = false
		pauseButton.disabled = true
		rewindButton.disabled = true

		playClickHandler.default()
	})

	it('disables the play button', () => {
		expect(playButton.disabled).toBe(true)
	})

	it('enables the pause button', () => {
		expect(pauseButton.disabled).toBe(false)
	})

	it('enables the rewind button', () => {
		expect(rewindButton.disabled).toBe(false)
	})

	it('set animating to true', () => {
		expect(state.controls.animating).toBe(true)
	})

	it('mixes down the contexts', () => {
		expect(mixDownContexts.default).toHaveBeenCalled()
	})

	describe('starting vs resuming', () => {
		it('executes the selected houndstooth effects when there is no animation running', () => {
			expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
		})

		it('does not re-execute the selected houndstooth effects when already running an animation', () => {
			state.execute.animationInterval = 25346
			executeSelectedHoundstoothEffectsSpy.calls.reset()

			playClickHandler.default()

			expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
		})
	})
})
