import resetInterface from '../../../../src/ui/resetInterface'
import state from '../../../../src/state'
import resetState from '../../../../src/store/resetState'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import * as canvas from '../../../../src/canvas'
import * as window from '../../../../src/utilities/windowWrapper'

describe('reset interface', () => {
	const warningsContainer = {}
	beforeEach(() => {
		spyOn(window.document, 'querySelector').and.returnValue(warningsContainer)
		spyOn(window.window, 'clearInterval')
		resetState(state)
	})

	it('clears warnings', () => {
		resetInterface()

		expect(warningsContainer.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		spyOn(canvas, 'clear')

		resetInterface()

		expect(canvas.clear).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		resetInterface()

		expect(window.window.clearInterval).toHaveBeenCalledWith(state.interval)
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
