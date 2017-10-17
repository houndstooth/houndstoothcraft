import resetClip from '../../../../src/render/resetClip'
import buildMockContext from '../../../helpers/buildMockContext'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder = [] as any
		const context = buildMockContext({ contextCallsOrder })

		resetClip({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'restore' },
		])
	})
})
