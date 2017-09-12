import resetInterface from '../../../src/ui/resetInterface'
import warn from '../../../src/ui/warn'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import initialState from '../../../src/store/initialState'
import canvas from '../../../src/canvas'

describe('reset interface', () => {
	beforeEach(() => resetState(state))

	it('clears warnings', () => {
		resetInterface()
		const warnings = document.querySelector('.warnings')
		warn('oh no')
		expect(warnings.innerHTML).toBe('<div>oh no</div>')
		resetInterface()
		expect(warnings.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		const clearSpy = spyOn(canvas, 'clear')

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
