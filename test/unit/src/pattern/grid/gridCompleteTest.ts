import Spy = jasmine.Spy
import {
	buildGridProgressIntervalFunction,
	gridComplete,
	noop,
	NullarySideEffector,
	PageElement,
	state,
	windowWrapper,
} from '../../../../../src'
import { mockQuerySelector } from '../../../helpers'

describe('grid complete', () => {
	const fakeGridProgressIntervalFunction: NullarySideEffector = noop.default
	const fakeGridProgressIntervalItself: {} = {}
	let resolveGrid: Spy
	let buildGridProgressIntervalFunctionSpy: Spy
	beforeEach(() => {
		resolveGrid = jasmine.createSpy('resolveGrid')
		buildGridProgressIntervalFunctionSpy = spyOn(buildGridProgressIntervalFunction, 'default')
		buildGridProgressIntervalFunctionSpy.and.returnValue(fakeGridProgressIntervalFunction)

		spyOn(windowWrapper, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeGridProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		gridComplete.default(resolveGrid)

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(fakeGridProgressIntervalFunction, 30)
	})

	it('saves the watcher onto the settings so it can be cancelled from elsewhere if necessary', () => {
		state.gridProgressInterval = undefined

		gridComplete.default(resolveGrid)

		// tslint:disable-next-line:no-any
		expect(state.gridProgressInterval).toBe(fakeGridProgressIntervalItself as any)
	})

	it('builds the progress interval function with this particular progress bar', () => {
		const { progressBar: tmpProgressBar, progressMessage: tmpProgressMessage } = mockQuerySelector()
		const progressBar: PageElement = tmpProgressBar
		const progressMessage: PageElement = tmpProgressMessage

		gridComplete.default(resolveGrid)

		expect(buildGridProgressIntervalFunctionSpy).toHaveBeenCalledWith({ progressBar, progressMessage })
	})

	it('saves the grid resolution function onto the settings so others can resolve it', () => {
		gridComplete.default(resolveGrid)

		expect(state.resolveGrid).toBe(resolveGrid)
	})
})
