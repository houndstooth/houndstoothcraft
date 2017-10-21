import { resetClip } from '../../../../src/render/resetClip'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		resetClip({ context })

		const expectedContextCallsOrder = [
			{ method: 'restore' },
		] as any

		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
