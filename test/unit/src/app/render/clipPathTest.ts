import { clipPath, state } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ]

		clipPath.default()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
