import Spy = jasmine.Spy
import {
	buildGridProgressIntervalFunction,
	documentWrapper,
	gridComplete,
	noop,
	NullarySideEffector,
	PageElement,
	state,
	windowWrapper,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('grid complete', () => {
	const fakeGridProgressIntervalFunction: NullarySideEffector = noop.main
	const fakeGridProgressIntervalItself: {} = {}
	let resolveGrid: Spy
	let buildGridProgressIntervalFunctionSpy: Spy
	beforeEach(() => {
		resolveGrid = jasmine.createSpy('resolveGrid')
		buildGridProgressIntervalFunctionSpy = spyOn(buildGridProgressIntervalFunction, 'main')
		buildGridProgressIntervalFunctionSpy.and.returnValue(fakeGridProgressIntervalFunction)

		spyOn(windowWrapper, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeGridProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		gridComplete.main(resolveGrid)

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(fakeGridProgressIntervalFunction, 30)
	})

	it('saves the watcher onto the store so it can be cancelled from elsewhere if necessary', () => {
		state.gridProgressInterval = undefined

		gridComplete.main(resolveGrid)

		// tslint:disable-next-line:no-any
		expect(state.gridProgressInterval).toBe(fakeGridProgressIntervalItself as any)
	})

	it('builds the progress interval function with this particular progress bar', () => {
		const progressBar: PageElement = buildMockElement()
		spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)

		gridComplete.main(resolveGrid)

		expect(buildGridProgressIntervalFunctionSpy).toHaveBeenCalledWith({ progressBar })
	})

	it('saves the grid resolution function onto the store so others can resolve it', () => {
		gridComplete.main(resolveGrid)

		expect(state.resolveGrid).toBe(resolveGrid)
	})
})
