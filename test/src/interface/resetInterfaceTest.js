import resetInterface from '../../../src/interface/resetInterface'
import warn from '../../../src/interface/warn'
import warnings from '../../../src/interface/warnings'
import store from '../../../store'
import initialStore from '../../../src/store/initialStore'

describe('reset interface', () => {
	it('clears warnings', () => {
		warn('oh no')
		expect(warnings.innerHTML).toBe('<div>oh no</div>')

		resetInterface()

		expect(warnings.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		const clearSpy = jasmine.createSpy()
		resetInterface.__Rewire__('clear', clearSpy)

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
