import resetInterface from '../../../src/ui/resetInterface'
import warn from '../../../src/ui/warn'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import { DEFAULT_STATE } from '../../../src/store/defaults'
import * as canvas from '../../../src/canvas'

describe('reset interface', () => {
	beforeEach(() => resetState(state))

	it('clears warnings', () => {
		resetInterface()
		const warningsContainer = document.querySelector('.warnings-container')
		warn('oh no')
		expect(warningsContainer.innerHTML).toBe('<div>oh no</div>')
		resetInterface()
		expect(warningsContainer.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		spyOn(canvas, 'clear')

		resetInterface()

		expect(canvas.clear).toHaveBeenCalled()
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

		const expectedStore = DEFAULT_STATE
		expectedStore.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		expect(state).toEqual(expectedStore)
	})
})
