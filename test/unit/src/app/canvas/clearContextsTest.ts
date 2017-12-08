import {
	appState,
	clearContext,
	clearContexts,
	NullarySideEffector,
} from '../../../../../src'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = clearContexts.default

describe('clear contexts', () => {
	it('calls clear on each context, with the canvas size', () => {
		const clearContextSpy: Spy = spyOn(clearContext, 'default')
		const context1: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		const context2: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		const context3: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		appState.canvas.contexts = [ context1, context2, context3 ]

		subject()

		const calls: CallInfo[] = clearContextSpy.calls.all()
		expect(calls.length).toBe(3)
		expect(calls[ 0 ].args[ 0 ]).toEqual(context1)
		expect(calls[ 1 ].args[ 0 ]).toEqual(context2)
		expect(calls[ 2 ].args[ 0 ]).toEqual(context3)
	})
})
