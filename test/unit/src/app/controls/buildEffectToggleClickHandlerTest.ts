import {
	appState,
	buildEffectToggleClickHandler,
	cancelPreviousPattern,
	clearContexts,
	clearIntervalAndRemoveFromState,
	clearMixedDownContext,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeSelectedEffects,
	NamedEffect,
	NullarySideEffector,
	resetMainHoundstooth,
	updateDescriptions,
} from '../../../../../src/indexForTest'
import { buildMockElement, SimulateClick } from '../../../helpers'

describe('build effect toggle click handler returns a function which', () => {
	let subject: NullarySideEffector
	let checkbox: HTMLInputElement
	let effect: NamedEffect
	let preExistingEffect: NamedEffect

	beforeEach(() => {
		spyOn(executeSelectedEffects, 'default')
		spyOn(enableOrDisableAnimationControls, 'default')
		spyOn(enableOrDisableOtherEffectToggles, 'default')
		spyOn(updateDescriptions, 'default')
		spyOn(clearMixedDownContext, 'default')
		spyOn(clearContexts, 'default')
		spyOn(clearIntervalAndRemoveFromState, 'default')
		spyOn(cancelPreviousPattern, 'default')
		spyOn(resetMainHoundstooth, 'default')

		checkbox = buildMockElement() as HTMLInputElement
		effect = { name: 'mock tooth', description: '' }
		subject = buildEffectToggleClickHandler.default({ checkbox, effect })

		expect(executeSelectedEffects.default).not.toHaveBeenCalled()
		expect(enableOrDisableAnimationControls.default).not.toHaveBeenCalled()
		expect(enableOrDisableOtherEffectToggles.default).not.toHaveBeenCalled()
		expect(updateDescriptions.default).not.toHaveBeenCalled()

		preExistingEffect = { name: 'preexisting tooth', description: '' }
		appState.controls.selectedEffects = [ preExistingEffect ]

		simulateClick(checkbox, subject)
	})

	it('adds the clicked effect to the selection', () => {
		expect(appState.controls.selectedEffects).toEqual([ preExistingEffect, effect ])
	})

	it('executes the selected effects, since the selection has now changed', () => {
		expect(executeSelectedEffects.default).toHaveBeenCalled()
	})

	it('enables or disables animation controls depending on whether the new selection has animations', () => {
		expect(enableOrDisableAnimationControls.default).toHaveBeenCalled()
	})

	it('enables or disables the other effects, depending on whether the new selection would have conflicts', () => {
		expect(enableOrDisableOtherEffectToggles.default).toHaveBeenCalled()
	})

	it('updates the descriptions to include one for each of the new set of selected effects', () => {
		expect(updateDescriptions.default).toHaveBeenCalled()
	})

	it('clears descriptions', () => {
		expect(appState.dom.descriptionsContainer.innerHTML).toBe('')
	})

	it('clears contexts', () => {
		expect(clearContexts.default).toHaveBeenCalled()
	})

	it('clears the mixed down context', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		expect(clearIntervalAndRemoveFromState.default).toHaveBeenCalledWith('animationInterval')
	})

	it('clears any active rendering progress measurement', () => {
		expect(clearIntervalAndRemoveFromState.default).toHaveBeenCalledWith('gridProgressInterval')
	})

	it('resets the main houndstooth', () => {
		expect(resetMainHoundstooth.default).toHaveBeenCalled()
	})

	it('cancels the previous pattern', () => {
		expect(cancelPreviousPattern.default).toHaveBeenCalled()
	})

	it('removes the effect if it is already selected', () => {
		simulateClick(checkbox, subject)

		expect(appState.controls.selectedEffects).toEqual([ preExistingEffect ])
	})
})

const simulateClick: SimulateClick = (checkbox: HTMLInputElement, clickHandler: NullarySideEffector): void => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
