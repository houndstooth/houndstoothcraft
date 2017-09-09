import resetInterface from '../../../src/controls/resetInterface'
import warn from '../../../src/controls/warn'
import state from '../../../state'
import initialState from '../../../src/store/initialState'
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

		expect(window.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('resets the state, except for any selected effects', () => {
		const fakeHoundstoothEffect = {}
		state.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		state.mainHoundstooth.basePattern.gridSettings = { gridSize: 42 }

		resetInterface()

		const expectedStore = initialState.INITIAL_STATE
		expectedStore.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		expect(state).toEqual(expectedStore)
	})
})
