import {
	clearMixedDownContext,
	executeSelectedHoundstoothEffects,
	noop,
	NullarySideEffector,
	rewindClickHandler,
	state,
	to,
	updateCurrentFrame,
	windowWrapper,
} from '../../../../../src'
import Spy = jasmine.Spy
import { mockQuerySelector } from '../../../helpers'

describe('rewind click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let rewindButton: HTMLButtonElement
	const interval: NullarySideEffector = noop.default
	beforeEach(() => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(windowWrapper, 'clearInterval')
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		const { rewindButton: tmpRewindButton } = mockQuerySelector()
		rewindButton = tmpRewindButton as HTMLButtonElement

		state.interval = interval
	})

	it('clears the interval and removes it from state', () => {
		rewindClickHandler.default()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(interval)
		expect(state.interval).toBe(undefined)
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
			state.animating = false
			rewindButton.disabled = false

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(true)
			expect(clearMixedDownContext.default).toHaveBeenCalled()
		})

		it('when still running, it does not disable itself or clear the mixed down context', () => {
			state.animating = true
			rewindButton.disabled = false

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(false)
			expect(clearMixedDownContext.default).not.toHaveBeenCalled()
		})
	})
})
