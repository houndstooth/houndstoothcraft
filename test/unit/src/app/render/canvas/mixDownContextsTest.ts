// tslint:disable:no-unsafe-any

import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { appState, CANVAS_SIZE, mixDownContexts } from '../../../../../../src/indexForTest'
import { createMockContext } from '../../../../helpers'

describe('mix down contexts', () => {
	let subject: () => void
	const drawImageSpy: Spy = jasmine.createSpy('drawImage')
	const clearRectSpy: Spy = jasmine.createSpy('clearRect')
	beforeEach(() => {
		subject = mixDownContexts.default
		appState.render.mixedDownContext = createMockContext({ clearRectSpy, drawImageSpy }) as CanvasRenderingContext2D
	})

	it('clears the mixed down canvas just before rendering', () => {
		subject()

		expect(clearRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})

	it('draws each of the contexts in turn onto the mixedDownContext', () => {
		const context1: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		const context2: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		const context3: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		const context4: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		const context5: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		const context6: CanvasRenderingContext2D = createMockContext() as CanvasRenderingContext2D
		appState.render.contexts = [
			context1,
			context2,
			context3,
			context4,
			context5,
			context6,
		]

		subject()

		// @ts-ignore
		const drawImageSpyCalls: CallInfo[] = drawImageSpy.calls.all()
		expect(drawImageSpyCalls[ 0 ].args[ 0 ]).toEqual(context1.canvas)
		expect(drawImageSpyCalls[ 1 ].args[ 0 ]).toEqual(context2.canvas)
		expect(drawImageSpyCalls[ 2 ].args[ 0 ]).toEqual(context3.canvas)
		expect(drawImageSpyCalls[ 3 ].args[ 0 ]).toEqual(context4.canvas)
		expect(drawImageSpyCalls[ 4 ].args[ 0 ]).toEqual(context5.canvas)
		expect(drawImageSpyCalls[ 5 ].args[ 0 ]).toEqual(context6.canvas)
	})
})
