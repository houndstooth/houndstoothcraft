import buildMockContext from '../helpers/buildMockContext'
import clipPath from '../../../src/render/clipPath'

describe('clip path', () => {
	it('saves the context so that the clip can be restored later, then clips the context (with the current path)', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		clipPath({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'save' },
			{ method: 'clip' },
		])
	})
})
