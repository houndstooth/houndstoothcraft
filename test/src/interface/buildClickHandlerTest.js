import buildClickHandler from '../../../src/interface/buildClickHandler'
import store from '../../../store'

describe('build click handler', () => {
	it('returns a function which resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy = jasmine.createSpy()
		buildClickHandler.__Rewire__('resetInterface', resetInterfaceSpy)
		const composeMainHoundstoothSpy = jasmine.createSpy()
		buildClickHandler.__Rewire__('composeMainHoundstooth', composeMainHoundstoothSpy)
		const executeSpy = jasmine.createSpy()
		buildClickHandler.__Rewire__('execute', executeSpy)

		const checkbox = document.createElement('input')
		checkbox.setAttribute('type', 'checkbox')

		const mockHoundstoothEffect = { name: 'mock tooth' }

		const clickHandler = buildClickHandler(checkbox, mockHoundstoothEffect)

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(composeMainHoundstoothSpy).not.toHaveBeenCalled()
		expect(executeSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect = { name: 'preexisting tooth' }
		store.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(composeMainHoundstoothSpy).toHaveBeenCalledWith(
			jasmine.objectContaining({
				houndstoothEffects: [ preExistingHoundstoothEffect, mockHoundstoothEffect ],
			})
		)
		expect(executeSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		composeMainHoundstoothSpy.calls.reset()
		executeSpy.calls.reset()

		// to confirm that it preserves the order otherwise when removing an effect
		const otherHoundstoothEffect = { name: 'other tooth' }
		store.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(composeMainHoundstoothSpy).toHaveBeenCalledWith(
			jasmine.objectContaining({
				houndstoothEffects: [ preExistingHoundstoothEffect, otherHoundstoothEffect ],
			})
		)
		expect(executeSpy).toHaveBeenCalled()
	})
})

const simulateClick = (checkbox, clickHandler) => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
