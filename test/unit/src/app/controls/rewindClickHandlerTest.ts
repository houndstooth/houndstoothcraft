import {
	clearInterval,
	clearMixedDownContext,
	executeSelectedHoundstoothEffects,
	NullarySideEffector,
	rewindClickHandler,
	state,
	to,
	updateCurrentFrame,
} from '../../../../../src'
import Spy = jasmine.Spy

describe('rewind click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy

	beforeEach(() => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(clearInterval, 'default')
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
	})

	it('clears the interval and removes it from state', () => {
		rewindClickHandler.default()

		expect(clearInterval.default).toHaveBeenCalledWith('animationInterval')
	})

	it('resets the current frame', () => {
		rewindClickHandler.default()

		expect(updateCurrentFrame.default).toHaveBeenCalledWith(to.Frame(0))
	})

	it('executes the selected houndstooth effects', () => {
		rewindClickHandler.default()

		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})

	describe('animation paused / still running', () => {
		it('when paused, it disables itself and clears the mixed down context', () => {
			state.controls.animating = false
			state.dom.rewindButton.disabled = false

			rewindClickHandler.default()

			expect(state.dom.rewindButton.disabled).toBe(true)
			expect(clearMixedDownContext.default).toHaveBeenCalled()
		})

		it('when still running, it does not disable itself or clear the mixed down context', () => {
			state.controls.animating = true
			state.dom.rewindButton.disabled = false

			rewindClickHandler.default()

			expect(state.dom.rewindButton.disabled).toBe(false)
			expect(clearMixedDownContext.default).not.toHaveBeenCalled()
		})
	})
})
