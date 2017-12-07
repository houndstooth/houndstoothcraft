import {
	appState,
	executeSelectedEffects,
	mixDownContexts,
	NullarySideEffector,
	playClickHandler,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('play click handler', () => {
	let executeSelectedEffectsSpy: Spy

	beforeEach(() => {
		spyOn(mixDownContexts, 'default')
		executeSelectedEffectsSpy = spyOn(executeSelectedEffects, 'default')
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
		it('executes the selected effects when there is no animation running', () => {
			expect(executeSelectedEffectsSpy).toHaveBeenCalled()
		})

		it('does not re-execute the selected effects when already running an animation', () => {
			appState.execute.animationInterval = 25346
			executeSelectedEffectsSpy.calls.reset()

			playClickHandler.default()

			expect(executeSelectedEffectsSpy).not.toHaveBeenCalled()
		})
	})
})
