import {
	buildEffectToggleClickHandler,
	enableOrDisableAnimationControls,
	enableOrDisableOtherEffectToggles,
	executeSelectedHoundstoothEffects,
	InputElement,
	NamedEffect,
	NullarySideEffector,
	resetInterface,
	state,
} from '../../../../../src'
import { buildMockElement, SimulateClick } from '../../../helpers'

describe('build effect toggle click handler returns a function which', () => {
	let subject: NullarySideEffector
	let checkbox: InputElement
	let houndstoothEffect: NamedEffect
	let preExistingHoundstoothEffect: NamedEffect
	beforeEach(() => {
		spyOn(resetInterface, 'default')
		spyOn(executeSelectedHoundstoothEffects, 'default')
			// .and.returnValue(new Promise<NullarySideEffector>((): void => undefined))
		spyOn(enableOrDisableAnimationControls, 'default')
		spyOn(enableOrDisableOtherEffectToggles, 'default')

		checkbox = buildMockElement()
		houndstoothEffect = { name: 'mock tooth' }
		subject = buildEffectToggleClickHandler.default({ checkbox, houndstoothEffect })

		expect(resetInterface.default).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffects.default).not.toHaveBeenCalled()
		expect(enableOrDisableAnimationControls.default).not.toHaveBeenCalled()
		expect(enableOrDisableOtherEffectToggles.default).not.toHaveBeenCalled()

		preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, subject)
	})

	it('adds the clicked effect to the selection', () => {
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, houndstoothEffect ])
	})

	it('resets the interface', () => {
		expect(resetInterface.default).toHaveBeenCalled()
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

	it('removes the effect if it is already selected', () => {
		simulateClick(checkbox, subject)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect ])
	})
})

const simulateClick: SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector): void => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
