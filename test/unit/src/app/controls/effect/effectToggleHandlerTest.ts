import {
	appState,
	cancelCurrentPattern,
	clearAnimationIntervalAndRemoveFromState,
	clearContexts,
	clearMixedDownContext,
	effectToggleHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeEffect,
	NamedEffect,
	resetMainHoundstooth,
	resolveGrid,
	updateDescriptions,
} from '../../../../../../src/indexForTest'
import { createMockElement, createMockEvent, SimulateClick } from '../../../../helpers'

describe('effect toggle handler', () => {
	let subject: (_: Event) => void
	let checkbox: HTMLInputElement
	let effect: NamedEffect

	beforeEach(() => {
		spyOn(executeEffect, 'default')
		spyOn(enableOrDisableAnimationControls, 'default')
		spyOn(enableOrDisableOtherEffectToggles, 'default')
		spyOn(updateDescriptions, 'default')
		spyOn(clearMixedDownContext, 'default')
		spyOn(clearContexts, 'default')
		spyOn(clearAnimationIntervalAndRemoveFromState, 'default')
		spyOn(cancelCurrentPattern, 'default')
		spyOn(resetMainHoundstooth, 'default')
		spyOn(resolveGrid, 'default')

		checkbox = createMockElement() as HTMLInputElement
		checkbox.name = 'mock-tooth'
		effect = { name: 'mock tooth', description: '' }
		subject = effectToggleHandler.default

		expect(executeEffect.default).not.toHaveBeenCalled()
		expect(enableOrDisableAnimationControls.default).not.toHaveBeenCalled()
		expect(enableOrDisableOtherEffectToggles.default).not.toHaveBeenCalled()
		expect(updateDescriptions.default).not.toHaveBeenCalled()

		appState.controls.selectedEffects = [ 'preexisting-tooth' ]

		appState.settings.availableEffects = { 'mock-tooth': effect }

		simulateClick(checkbox, subject)
	})

	it('adds the clicked effect to the selection', () => {
		expect(appState.controls.selectedEffects).toEqual([ 'preexisting-tooth', 'mock-tooth' ])
	})

	it('executes the selected effect, since the selection has now changed', () => {
		expect(executeEffect.default).toHaveBeenCalled()
	})

	it('enables or disables animation controls depending on whether the new selection has animations', () => {
		expect(enableOrDisableAnimationControls.default).toHaveBeenCalled()
	})

	it('enables or disables the other effect, depending on whether the new selection would have conflicts', () => {
		expect(enableOrDisableOtherEffectToggles.default).toHaveBeenCalled()
	})

	it('updates the descriptions to include one for each of the new set of selected effect', () => {
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

	it('clears any active animation and removes them from the state', () => {
		expect(clearAnimationIntervalAndRemoveFromState.default).toHaveBeenCalled()
	})

	it('resets the main houndstooth', () => {
		expect(resetMainHoundstooth.default).toHaveBeenCalled()
	})

	it('cancels the previous pattern', () => {
		expect(cancelCurrentPattern.default).toHaveBeenCalled()
	})

	it('resolves the grid', () => {
		expect(resolveGrid.default).toHaveBeenCalled()
	})

	it('removes the effect if it is already selected', () => {
		simulateClick(checkbox, subject)

		expect(appState.controls.selectedEffects).toEqual([ 'preexisting-tooth' ])
	})
})

const simulateClick: SimulateClick = (checkbox: HTMLInputElement, handler: (_: Event) => void): void => {
	checkbox.checked = !checkbox.checked
	// @ts-ignore
	handler(createMockEvent({ target: checkbox }))
}
