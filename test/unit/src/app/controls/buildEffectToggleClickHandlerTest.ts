import {
	buildEffectToggleClickHandler,
	cancelPreviousPattern,
	clearContexts,
	clearInterval,
	clearMixedDownContext,
	documentWrapper,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeSelectedHoundstoothEffects,
	InputElement,
	NamedEffect,
	NullarySideEffector,
	PageElement,
	resetMainHoundstooth,
	state,
	updateDescriptions,
} from '../../../../../src'
import { buildMockElement, SimulateClick } from '../../../helpers'

describe('build effect toggle click handler returns a function which', () => {
	let subject: NullarySideEffector
	let checkbox: InputElement
	let houndstoothEffect: NamedEffect
	let preExistingHoundstoothEffect: NamedEffect
	const descriptionsContainer: PageElement = buildMockElement()

	beforeEach(() => {
		spyOn(executeSelectedHoundstoothEffects, 'default')
		spyOn(enableOrDisableAnimationControls, 'default')
		spyOn(enableOrDisableOtherEffectToggles, 'default')
		spyOn(updateDescriptions, 'default')
		spyOn(documentWrapper, 'querySelector').and.returnValue(descriptionsContainer)
		spyOn(clearMixedDownContext, 'default')
		spyOn(clearContexts, 'default')
		spyOn(clearInterval, 'default')
		spyOn(cancelPreviousPattern, 'default')
		spyOn(resetMainHoundstooth, 'default')

		checkbox = buildMockElement()
		houndstoothEffect = { name: 'mock tooth', description: '' }
		subject = buildEffectToggleClickHandler.default({ checkbox, houndstoothEffect })

		expect(executeSelectedHoundstoothEffects.default).not.toHaveBeenCalled()
		expect(enableOrDisableAnimationControls.default).not.toHaveBeenCalled()
		expect(enableOrDisableOtherEffectToggles.default).not.toHaveBeenCalled()
		expect(updateDescriptions.default).not.toHaveBeenCalled()

		preExistingHoundstoothEffect = { name: 'preexisting tooth', description: '' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, subject)
	})

	it('adds the clicked effect to the selection', () => {
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, houndstoothEffect ])
	})

	it('executes the selected houndstooth effects, since the selection has now changed', () => {
		expect(executeSelectedHoundstoothEffects.default).toHaveBeenCalled()
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
		expect(descriptionsContainer.innerHTML).toBe('')
	})

	it('clears contexts', () => {
		expect(clearContexts.default).toHaveBeenCalled()
	})

	it('clears the mixed down context', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		expect(clearInterval.default).toHaveBeenCalledWith('animationInterval')
	})

	it('clears any active rendering progress measurement', () => {
		expect(clearInterval.default).toHaveBeenCalledWith('gridProgressInterval')
	})

	it('resets the main houndstooth', () => {
		expect(resetMainHoundstooth.default).toHaveBeenCalled()
	})

	it('cancels the previous pattern', () => {
		expect(cancelPreviousPattern.default).toHaveBeenCalled()
	})

	it('removes the effect if it is already selected', () => {
		simulateClick(checkbox, subject)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect ])
	})
})

const simulateClick: SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector): void => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
