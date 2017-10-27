import * as execute from '../../../../src/execute'
import { InputElement } from '../../../../src/page'
import { state } from '../../../../src/state'
import { Effect } from '../../../../src/store/types/Effect'
import { buildEffectToggleClickHandler } from '../../../../src/ui/buildEffectToggleClickHandler'
import * as resetInterface from '../../../../src/ui/resetInterface'
import { NullarySideEffector } from '../../../../src/utilities/types'
import Spy = jasmine.Spy

describe('build effect toggle click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy: Spy = spyOn(resetInterface, 'resetInterface')

		const executeSelectedHoundstoothEffectsSpy: Spy = spyOn(execute, 'executeSelectedHoundstoothEffects')

		const checkbox: InputElement = {}

		const houndstoothEffect: Effect = { name: 'mock tooth' }

		const clickHandler: NullarySideEffector = buildEffectToggleClickHandler({
			checkbox, houndstoothEffect,
		})

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect: Effect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, houndstoothEffect ])

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		executeSelectedHoundstoothEffectsSpy.calls.reset()

		// To confirm that it preserves the order otherwise when removing an effect:
		const otherHoundstoothEffect: Effect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})
})

type SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector) => void

const simulateClick: SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector): void => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
