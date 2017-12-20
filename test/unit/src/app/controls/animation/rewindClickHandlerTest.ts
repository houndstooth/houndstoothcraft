import {
	appState,
	clearIntervalAndRemoveFromState,
	clearMixedDownContext,
	executePattern,
	rewindClickHandler,
	to,
	updateCurrentFrame,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('rewind click handler', () => {
	let subject: () => void
	let executeSelectedEffectsSpy: Spy

	beforeEach(() => {
		subject = rewindClickHandler.default
		spyOn(clearMixedDownContext, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(clearIntervalAndRemoveFromState, 'default')
		executeSelectedEffectsSpy = spyOn(executePattern, 'default')
			.and.returnValue(new Promise<() => void>((): void => undefined))
	})

	it('clears the interval with the helper which also removes it from the state', () => {
		subject()

		expect(clearIntervalAndRemoveFromState.default).toHaveBeenCalledWith('animationInterval')
	})

	it('resets the current frame', () => {
		subject()

		expect(updateCurrentFrame.default).toHaveBeenCalledWith(to.Frame(0))
	})

	it('executes the selected effect', () => {
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
