import buildMockContext from '../../../helpers/buildMockContext'
import clipPath from '../../../../src/render/clipPath'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder }) as CanvasRenderingContext2D

		clipPath({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'save' },
			{ method: 'clip' },
		])
	})
})
