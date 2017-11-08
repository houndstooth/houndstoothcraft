import { resetClip } from '../../../../../src/app/render/resetClip'
import { state } from '../../../../../src/state'
import { buildMockContext } from '../../../../helpers/buildMockContext'
import { MockContextCall } from '../../../../helpers/types'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		resetClip()

		const expectedContextCallsOrder: MockContextCall[] = [ { method: 'restore' } ]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
