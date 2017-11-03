import Spy = jasmine.Spy
import * as buildProgressIntervalFunction from '../../../../src/execute/buildProgressIntervalFunction'
import { gridComplete } from '../../../../src/execute/gridComplete'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { document, windowWrapper } from '../../../../src/utilities/windowWrapper'
import { noop } from '../../../helpers/noop'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('grid complete', () => {
	const fakeProgressIntervalFunction: NullarySideEffector = noop
	const fakeProgressIntervalItself: {} = {}
	let resolveGrid: Spy
	let buildProgressIntervalFunctionSpy: Spy
	beforeEach(() => {
		resolveGrid = jasmine.createSpy('resolveGrid')
		buildProgressIntervalFunctionSpy = spyOn(buildProgressIntervalFunction, 'buildProgressIntervalFunction')
		buildProgressIntervalFunctionSpy.and.returnValue(fakeProgressIntervalFunction)

		spyOn(windowWrapper, 'setInterval').and.callFake((fn: NullarySideEffector) => {
			fn()

			return fakeProgressIntervalItself
		})
	})

	it('schedules a watcher of the rendering progress', () => {
		gridComplete(resolveGrid)

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(fakeProgressIntervalFunction, 30)
	})

	it('saves the watcher onto the store so it can be cancelled from elsewhere if necessary', () => {
		state.progressInterval = undefined

		gridComplete(resolveGrid)

		// tslint:disable-next-line:no-any
		expect(state.progressInterval).toBe(fakeProgressIntervalItself as any)
	})

	it('builds the progress interval function from the progress bar and the resolution of the grid promise', () => {
		const progressBar: PageElement = buildMockElement()
		spyOn(document, 'querySelector').and.returnValue(progressBar)

		gridComplete(resolveGrid)

		expect(buildProgressIntervalFunctionSpy).toHaveBeenCalledWith({ progressBar, resolveGrid })
	})
})
