import { clipPath, state } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		clipPath.main()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
