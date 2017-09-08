import mockContext from '../helpers/mockContext'
import resetClip from '../../../src/render/resetClip'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder = []
		const context = mockContext(contextCallsOrder)

		resetClip({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'restore' },
		])
	})
})
