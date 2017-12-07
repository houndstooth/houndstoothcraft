import Spy = jasmine.Spy
import {
	appState,
	gridComplete,
	gridProgressIntervalFunction,
	NullarySideEffector,
	windowWrapper,
} from '../../../../../src'

const subject: (_: NullarySideEffector) => void = gridComplete.default

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
		subject(resolveGrid)

		expect(windowWrapper.setInterval).toHaveBeenCalledWith(gridProgressIntervalFunction.default, 30)
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
