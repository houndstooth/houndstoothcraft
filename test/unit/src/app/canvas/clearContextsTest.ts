import {
	clearContext,
	clearContexts,
	Context,
	NullarySideEffector,
	Px,
	setSetting,
	state,
	to,
} from '../../../../../src'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = clearContexts.default

describe('clear contexts', () => {
	it('calls clear on each context, with the canvas size', () => {
		const canvasSize: Px = to.Px(450)
		setSetting.default('canvasSize', canvasSize)
		const clearContextSpy: Spy = spyOn(clearContext, 'default')
		const context1: Context = buildMockContext()
		const context2: Context = buildMockContext()
		const context3: Context = buildMockContext()
		state.canvas.contexts = [ context1, context2, context3 ]

		subject()

		const calls: CallInfo[] = clearContextSpy.calls.all()
		expect(calls.length).toBe(3)
		expect(calls[ 0 ].args[ 0 ]).toEqual({ context: context1, canvasSize })
		expect(calls[ 1 ].args[ 0 ]).toEqual({ context: context2, canvasSize })
		expect(calls[ 2 ].args[ 0 ]).toEqual({ context: context3, canvasSize })
	})
})
