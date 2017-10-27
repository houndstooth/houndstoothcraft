import * as canvas from '../../../../src/canvas'
import { PageElement } from '../../../../src/page/types/PageElement'
import { state } from '../../../../src/state'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import { Effect } from '../../../../src/store/types/Effect'
import { State } from '../../../../src/store/types/State'
import { resetInterface } from '../../../../src/ui/resetInterface'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('reset interface', () => {
	const warningsContainer: PageElement = buildMockElement()
	beforeEach(() => {
		spyOn(windowWrapper.document, 'querySelector').and.returnValue(warningsContainer)
		spyOn(windowWrapper.window, 'clearInterval')
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

		expect(windowWrapper.window.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('resets the state, except for any selected effects', () => {
		const fakeHoundstoothEffect: Effect = {
			animationsPattern: {},
			basePattern: {},
			layersPattern: {},
			name: '',
		}
		state.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		state.mainHoundstooth.basePattern.gridSettings = { gridSize: 42 }

		resetInterface()

		const expectedStore: State = DEFAULT_STATE
		expectedStore.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		expect(state).toEqual(expectedStore)
	})
})
