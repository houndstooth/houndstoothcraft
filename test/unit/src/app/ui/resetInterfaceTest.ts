import {
	clear,
	documentWrapper,
	Effect,
	NullarySideEffector,
	PageElement,
	resetInterface,
	state,
	windowWrapper,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('reset interface', () => {
	const warningsContainer: PageElement = buildMockElement()
	beforeEach(() => {
		spyOn(documentWrapper, 'querySelector').and.returnValue(warningsContainer)
		spyOn(windowWrapper, 'clearInterval')
	})

	it('clears warnings', () => {
		resetInterface.main()

		expect(warningsContainer.innerHTML).toBe('')
	})

	it('clears canvas', () => {
		spyOn(clear, 'main')

		resetInterface.main()

		expect(clear.main).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		const interval: NullarySideEffector = (): void => undefined
		state.interval = interval

		resetInterface.main()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('clears any active rendering progress measurement', () => {
		const gridProgressInterval: NullarySideEffector = (): void => undefined

		state.gridProgressInterval = gridProgressInterval

		resetInterface.main()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.gridProgressInterval)
	})

	it('resets the state, except for any selected effects', () => {
		const fakeHoundstoothEffect: Effect = {
			animationsPattern: {},
			basePattern: {},
			layersPattern: {},
			name: 'fake',
		}
		state.selectedHoundstoothEffects.push(fakeHoundstoothEffect)

		resetInterface.main()

		expect(state.selectedHoundstoothEffects[ 0 ]).toEqual(fakeHoundstoothEffect)
	})
})
