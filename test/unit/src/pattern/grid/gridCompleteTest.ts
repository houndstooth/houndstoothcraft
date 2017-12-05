import Spy = jasmine.Spy
import {
	gridComplete,
	gridProgressIntervalFunction,
	NullarySideEffector,
	state,
	windowWrapper,
} from '../../../../../src'

describe('grid complete', () => {
	const fakeGridProgressIntervalItself: number = 9275
	let resolveGrid: Spy
	beforeEach(() => {
		resolveGrid = jasmine.createSpy('resolveGrid')

		spyOn(windowWrapper, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeGridProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		gridComplete.default(resolveGrid)

		expect(windowWrapper.setInterval).toHaveBeenCalledWith(gridProgressIntervalFunction.default, 30)
	})

	it('saves the watcher onto the settings so it can be cancelled from elsewhere if necessary', () => {
		gridComplete.default(resolveGrid)

		expect(state.execute.gridProgressInterval).toBe(9275)
	})

	it('saves the grid resolution function onto the settings so others can resolve it', () => {
		gridComplete.default(resolveGrid)

		expect(state.execute.resolveGrid).toBe(resolveGrid)
	})
})
