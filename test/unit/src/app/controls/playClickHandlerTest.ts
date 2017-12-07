import {
	appState,
	executeSelectedHoundstoothEffects,
	mixDownContexts,
	NullarySideEffector,
	playClickHandler,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('play click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy

	beforeEach(() => {
		spyOn(mixDownContexts, 'default')
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		appState.controls.animating = false
		appState.dom.playButton.disabled = false
		appState.dom.pauseButton.disabled = true
		appState.dom.rewindButton.disabled = true

		playClickHandler.default()
	})

	it('disables the play button', () => {
		expect(appState.dom.playButton.disabled).toBe(true)
	})

	it('enables the pause button', () => {
		expect(appState.dom.pauseButton.disabled).toBe(false)
	})

	it('enables the rewind button', () => {
		expect(appState.dom.rewindButton.disabled).toBe(false)
	})

	it('set animating to true', () => {
		expect(appState.controls.animating).toBe(true)
	})

	it('mixes down the contexts', () => {
		expect(mixDownContexts.default).toHaveBeenCalled()
	})

	describe('starting vs resuming', () => {
		it('executes the selected houndstooth effects when there is no animation running', () => {
			expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
		})

		it('does not re-execute the selected houndstooth effects when already running an animation', () => {
			appState.execute.animationInterval = 25346
			executeSelectedHoundstoothEffectsSpy.calls.reset()

			playClickHandler.default()

			expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
		})
	})
})
