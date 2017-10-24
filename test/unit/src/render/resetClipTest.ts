import { resetClip } from '../../../../src/render/resetClip'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		resetClip()

		const expectedContextCallsOrder = [
			{ method: 'restore' },
		] as any

		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
