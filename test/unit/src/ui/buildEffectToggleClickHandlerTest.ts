import * as execute from '../../../../src/execute'
import { InputElement } from '../../../../src/page/types/InputElement'
import { state } from '../../../../src/state'
import { buildEffectToggleClickHandler } from '../../../../src/ui/buildEffectToggleClickHandler'
import * as resetInterface from '../../../../src/ui/resetInterface'
import { NullarySideEffector } from '../../../../src/utilities/types/NullarySideEffector'

describe('build effect toggle click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy = spyOn(resetInterface, 'resetInterface')

		const executeSelectedHoundstoothEffectsSpy = spyOn(execute, 'executeSelectedHoundstoothEffects')

		const checkbox = {}

		const mockHoundstoothEffect = { name: 'mock tooth' }

		// tslint:disable-next-line:no-void-expression
		const clickHandler = buildEffectToggleClickHandler({ checkbox, houndstoothEffect: mockHoundstoothEffect })

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, mockHoundstoothEffect ])

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		executeSelectedHoundstoothEffectsSpy.calls.reset()

		// To confirm that it preserves the order otherwise when removing an effect:
		const otherHoundstoothEffect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
