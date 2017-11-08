import * as page from '../../../../../src/app/page'
import * as render from '../../../../../src/app/render'
import { resetInterface } from '../../../../../src/app/ui/resetInterface'
import { Effect } from '../../../../../src/pattern'
import { state } from '../../../../../src/state'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import * as windowWrapper from '../../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('reset interface', () => {
	const warningsContainer: page.PageElement = buildMockElement()
	beforeEach(() => {
		spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(warningsContainer)
		spyOn(windowWrapper.windowWrapper, 'clearInterval')
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
		expect(windowWrapper.windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('clears any active rendering progress measurement', () => {
		const gridProgressInterval: NullarySideEffector = (): void => undefined

		state.gridProgressInterval = gridProgressInterval

		resetInterface()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.windowWrapper.clearInterval).toHaveBeenCalledWith(state.gridProgressInterval)
	})

	it('resets the state, except for any selected effects', () => {
		const fakeHoundstoothEffect: Effect = {
			animationsPattern: {},
			basePattern: {},
			layersPattern: {},
			name: 'fake',
		}
		state.selectedHoundstoothEffects.push(fakeHoundstoothEffect)

		resetInterface()

		expect(state.selectedHoundstoothEffects[0]).toEqual(fakeHoundstoothEffect)
	})
})
