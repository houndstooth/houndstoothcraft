import buildEffectToggleClickHandler from '../.././../../src/ui/buildEffectToggleClickHandler'
import state from '../../../../src/state'
import * as execute from '../../../../src/execute'
import * as resetInterface from '../../../../src/ui/resetInterface'

describe('build effect toggle click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		spyOn(resetInterface, 'default')

		spyOn(execute, 'executeSelectedHoundstoothEffects')

		const checkbox = {}

		const mockHoundstoothEffect = { name: 'mock tooth' }

		const clickHandler = buildEffectToggleClickHandler(checkbox, mockHoundstoothEffect)

		expect(resetInterface.default).not.toHaveBeenCalled()
		expect(execute.executeSelectedHoundstoothEffects).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, mockHoundstoothEffect ])

		expect(resetInterface.default).toHaveBeenCalled()
		expect(execute.executeSelectedHoundstoothEffects).toHaveBeenCalled()

		resetInterface.default.calls.reset()
		execute.executeSelectedHoundstoothEffects.calls.reset()

		// to confirm that it preserves the order otherwise when removing an effect
		const otherHoundstoothEffect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterface.default).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(execute.executeSelectedHoundstoothEffects).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox, clickHandler) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
