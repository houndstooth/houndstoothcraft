import * as canvas from '../../../../src/canvas'
import * as page from '../../../../src/page'
import { state } from '../../../../src/state'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import { setSetting } from '../../../../src/store/setSetting'
import { Effect, State } from '../../../../src/store/types'
import { resetInterface } from '../../../../src/ui/resetInterface'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'
import Spy = jasmine.Spy

describe('reset interface', () => {
	const warningsContainer: page.PageElement = buildMockElement()
	let querySelectorSpy: Spy
	beforeEach(() => {
		querySelectorSpy = spyOn(windowWrapper.document, 'querySelector').and.returnValue(warningsContainer)
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

		// tslint:disable-next-line:no-unsafe-any
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
		setSetting('gridSettings', { gridSize: 42 })

		resetInterface()

		const expectedStore: State = DEFAULT_STATE
		expectedStore.selectedHoundstoothEffects.push(fakeHoundstoothEffect)
		expect(state).toEqual(expectedStore)
	})

	it('creates the warnings container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		const createWarningsContainerSpy: Spy = spyOn(page, 'createWarningsContainer')
		createWarningsContainerSpy.and.returnValue(warningsContainer)

		resetInterface()

		expect(createWarningsContainerSpy).toHaveBeenCalled()
	})
})
