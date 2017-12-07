import { appState, clipPath, NullarySideEffector } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

const subject: NullarySideEffector = clipPath.default

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder: MockContextCall[] = []
		appState.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
