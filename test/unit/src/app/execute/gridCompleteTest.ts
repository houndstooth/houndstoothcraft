import Spy = jasmine.Spy
import {
	appState,
	globalWrapper,
	gridComplete,
	gridProgressIntervalFunction,
	NullarySideEffector,
} from '../../../../../src/indexForTest'

describe('grid complete', () => {
	let subject: (_: NullarySideEffector) => void
	const fakeGridProgressIntervalItself: number = 9275
	let resolveGrid: Spy
	beforeEach(() => {
		subject = gridComplete.default
		resolveGrid = jasmine.createSpy('resolveGrid')

		spyOn(globalWrapper.window, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeGridProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		subject(resolveGrid)

		expect(globalWrapper.window.setInterval).toHaveBeenCalledWith(gridProgressIntervalFunction.default, 30)
	})

	it('saves the watcher onto the settings so it can be cancelled from elsewhere if necessary', () => {
		subject(resolveGrid)

		expect(appState.execute.gridProgressInterval).toBe(9275)
	})

	it('saves the grid resolution function onto the settings so others can resolve it', () => {
		subject(resolveGrid)

		expect(appState.execute.resolveGrid).toBe(resolveGrid)
	})
})
