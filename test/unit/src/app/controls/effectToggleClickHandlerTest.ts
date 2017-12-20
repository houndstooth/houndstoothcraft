import {
	appState,
	cancelPreviousPattern,
	clearContexts,
	clearIntervalAndRemoveFromState,
	clearMixedDownContext,
	effectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeSelectedEffects,
	NamedEffect,
	resetMainHoundstooth,
	updateDescriptions,
} from '../../../../../src/indexForTest'
import { buildMockElement, SimulateClick } from '../../../helpers'

describe('effect toggle click handler', () => {
	let subject: (_: Event) => void
	let checkbox: HTMLInputElement
	let effect: NamedEffect

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
		checkbox.name = 'mock-tooth'
		effect = { name: 'mock tooth', description: '' }
		subject = effectToggleClickHandler.default

		expect(executeSelectedEffects.default).not.toHaveBeenCalled()
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

		expect(appState.controls.selectedEffects).toEqual([ 'preexisting-tooth' ])
	})
})

const simulateClick: SimulateClick = (checkbox: HTMLInputElement, clickHandler: (_: Event) => void): void => {
	checkbox.checked = !checkbox.checked
	// tslint:disable-next-line:no-any
	clickHandler({ target: checkbox } as any)
}
