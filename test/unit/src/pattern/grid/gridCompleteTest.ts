import Spy = jasmine.Spy
import { PageElement } from '../../../../../src/app/page/types'
import * as buildGridProgressIntervalFunction from '../../../../../src/pattern/grid/buildGridProgressIntervalFunction'
import { gridComplete } from '../../../../../src/pattern/grid/gridComplete'
import { state } from '../../../../../src/state'
import { noop } from '../../../../../src/utilities/noop'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import { documentWrapper, windowWrapper } from '../../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('grid complete', () => {
	const fakeGridProgressIntervalFunction: NullarySideEffector = noop
	const fakeGridProgressIntervalItself: {} = {}
	let resolveGrid: Spy
	let buildGridProgressIntervalFunctionSpy: Spy
	beforeEach(() => {
		resolveGrid = jasmine.createSpy('resolveGrid')
		buildGridProgressIntervalFunctionSpy = spyOn(buildGridProgressIntervalFunction, 'buildGridProgressIntervalFunction')
		buildGridProgressIntervalFunctionSpy.and.returnValue(fakeGridProgressIntervalFunction)

		spyOn(windowWrapper, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeGridProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		gridComplete(resolveGrid)

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(fakeGridProgressIntervalFunction, 30)
	})

	it('saves the watcher onto the store so it can be cancelled from elsewhere if necessary', () => {
		state.gridProgressInterval = undefined

		gridComplete(resolveGrid)

		// tslint:disable-next-line:no-any
		expect(state.gridProgressInterval).toBe(fakeGridProgressIntervalItself as any)
	})

	it('builds the progress interval function with this particular progress bar', () => {
		const progressBar: PageElement = buildMockElement()
		spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)

		gridComplete(resolveGrid)

		expect(buildGridProgressIntervalFunctionSpy).toHaveBeenCalledWith({ progressBar })
	})

	it('saves the grid resolution function onto the store so others can resolve it', () => {
		gridComplete(resolveGrid)

		expect(state.resolveGrid).toBe(resolveGrid)
	})
})
