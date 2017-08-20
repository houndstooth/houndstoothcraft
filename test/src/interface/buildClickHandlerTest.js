import buildClickHandler from '../../../src/interface/buildClickHandler'
import store from '../../../store'

describe('build click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy = jasmine.createSpy()
		buildClickHandler.__Rewire__('resetInterface', resetInterfaceSpy)
		const executeSelectedHoundstoothEffectsSpy = jasmine.createSpy()
		buildClickHandler.__Rewire__('executeSelectedHoundstoothEffects', executeSelectedHoundstoothEffectsSpy)

		const checkbox = document.createElement('input')
		checkbox.setAttribute('type', 'checkbox')

		const mockHoundstoothEffect = { name: 'mock tooth' }

		const clickHandler = buildClickHandler(checkbox, mockHoundstoothEffect)

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		store.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(store.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, mockHoundstoothEffect ])

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		executeSelectedHoundstoothEffectsSpy.calls.reset()

		// to confirm that it preserves the order otherwise when removing an effect
		const otherHoundstoothEffect = { name: 'other tooth' }
		store.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(store.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox, clickHandler) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
