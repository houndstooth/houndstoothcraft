import { resetClip, state } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		resetClip.main()

		const expectedContextCallsOrder: MockContextCall[] = [ { method: 'restore' } ]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
