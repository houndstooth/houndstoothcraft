import buildEffectToggleClickHandler from '../.././../../src/ui/buildEffectToggleClickHandler'
import state from '../../../../src/state'
import * as execute from '../../../../src/execute'
import * as resetInterface from '../../../../src/ui/resetInterface'

describe('build effect toggle click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy = spyOn(resetInterface, 'default')

		const executeSelectedHoundstoothEffectsSpy = spyOn(execute, 'executeSelectedHoundstoothEffects')

		const checkbox = {} as HTMLInputElement

		const mockHoundstoothEffect = { name: 'mock tooth' }

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

		// to confirm that it preserves the order otherwise when removing an effect
		const otherHoundstoothEffect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox, clickHandler) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
