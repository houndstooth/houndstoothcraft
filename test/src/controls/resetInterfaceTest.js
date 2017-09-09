import resetInterface from '../../../src/controls/resetInterface'
import warn from '../../../src/controls/warn'
import store from '../../../store'
import initialStore from '../../../src/store/initialStore'
import setupWarnings from '../../../src/controls/setupWarnings'
import display from '../../../src/display'

describe('reset interface', () => {
	it('clears warnings', () => {
		const warnings = document.querySelector('.warnings') || setupWarnings()
		warn('oh no')
		expect(warnings.innerHTML).toBe('<div>oh no</div>')

		resetInterface()

		expect(warnings.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		const clearSpy = spyOn(display, 'clear')

		resetInterface()

		expect(clearSpy).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		spyOn(window, 'clearInterval')

		resetInterface()

		expect(window.clearInterval).toHaveBeenCalledWith(store.interval)
	})

	it('resets the store, except for any selected effects', () => {
		const fakeHoundstoothEffect = {}
		store.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		store.mainHoundstooth.basePattern.gridSettings = { gridSize: 42 }

		resetInterface()

		const expectedStore = initialStore.INITIAL_STORE
		expectedStore.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		expect(store).toEqual(expectedStore)
	})
})
