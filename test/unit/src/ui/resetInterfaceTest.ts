import * as page from '../../../../src/page'
import * as render from '../../../../src/render'
import { state } from '../../../../src/state'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import { setSetting } from '../../../../src/store/setSetting'
import { Effect, State } from '../../../../src/store/types'
import { resetInterface } from '../../../../src/ui/resetInterface'
import { NullarySideEffector } from '../../../../src/utilities/types'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('reset interface', () => {
	const warningsContainer: page.PageElement = buildMockElement()
	beforeEach(() => {
		spyOn(windowWrapper.document, 'querySelector').and.returnValue(warningsContainer)
		spyOn(windowWrapper.window, 'clearInterval')
	})

	it('clears warnings', () => {
		resetInterface()

		expect(warningsContainer.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		spyOn(render, 'clear')

		resetInterface()

		expect(render.clear).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		const interval: NullarySideEffector = (): void => undefined
		state.interval = interval

		resetInterface()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.window.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('clears any active rendering progress measurement', () => {
		const progressInterval: NullarySideEffector = (): void => undefined

		state.progressInterval = progressInterval

		resetInterface()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.window.clearInterval).toHaveBeenCalledWith(state.progressInterval)
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
})
