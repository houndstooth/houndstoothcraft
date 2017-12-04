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
import { mockQuerySelector } from '../../../helpers'

describe('rewind click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let rewindButton: HTMLButtonElement

	beforeEach(() => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(clearInterval, 'default')
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		const { rewindButton: tmpRewindButton } = mockQuerySelector()
		rewindButton = tmpRewindButton as HTMLButtonElement
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
			rewindButton.disabled = false

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(true)
			expect(clearMixedDownContext.default).toHaveBeenCalled()
		})

		it('when still running, it does not disable itself or clear the mixed down context', () => {
			state.controls.animating = true
			rewindButton.disabled = false

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(false)
			expect(clearMixedDownContext.default).not.toHaveBeenCalled()
		})
	})
})
