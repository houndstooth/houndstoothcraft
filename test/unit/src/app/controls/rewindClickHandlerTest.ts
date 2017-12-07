import {
	appState,
	clearInterval,
	clearMixedDownContext,
	executeSelectedEffects,
	NullarySideEffector,
	rewindClickHandler,
	to,
	updateCurrentFrame,
} from '../../../../../src'
import Spy = jasmine.Spy

const subject: NullarySideEffector = rewindClickHandler.default

describe('rewind click handler', () => {
	let executeSelectedEffectsSpy: Spy

	beforeEach(() => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(clearInterval, 'default')
		executeSelectedEffectsSpy = spyOn(executeSelectedEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
	})

	it('clears the interval with the helper which also removes it from the state', () => {
		subject()

		expect(clearInterval.default).toHaveBeenCalledWith('animationInterval')
	})

	it('resets the current frame', () => {
		subject()

		expect(updateCurrentFrame.default).toHaveBeenCalledWith(to.Frame(0))
	})

	it('executes the selected effects', () => {
		subject()

		expect(executeSelectedEffectsSpy).toHaveBeenCalled()
	})

	describe('animation paused / still running', () => {
		it('when paused, it disables itself and clears the mixed down context', () => {
			appState.controls.animating = false
			appState.dom.rewindButton.disabled = false

			subject()

			expect(appState.dom.rewindButton.disabled).toBe(true)
			expect(clearMixedDownContext.default).toHaveBeenCalled()
		})

		it('when still running, it does not disable itself or clear the mixed down context', () => {
			appState.controls.animating = true
			appState.dom.rewindButton.disabled = false

			subject()

			expect(appState.dom.rewindButton.disabled).toBe(false)
			expect(clearMixedDownContext.default).not.toHaveBeenCalled()
		})
	})
})
