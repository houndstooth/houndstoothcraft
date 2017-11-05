import Spy = jasmine.Spy
import * as buildGridProgressIntervalFunction from '../../../../src/execute/buildGridProgressIntervalFunction'
import { gridComplete } from '../../../../src/execute/gridComplete'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { document, windowWrapper } from '../../../../src/utilities/windowWrapper'
import { noop } from '../../../helpers/noop'
import { buildMockElement } from '../../helpers/buildMockElement'

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
		spyOn(document, 'querySelector').and.returnValue(progressBar)

		gridComplete(resolveGrid)

		expect(buildGridProgressIntervalFunctionSpy).toHaveBeenCalledWith({ progressBar })
	})

	it('saves the grid resolution function onto the store so others can resolve it', () => {
		gridComplete(resolveGrid)

		expect(state.resolveGrid).toBe(resolveGrid)
	})
})
