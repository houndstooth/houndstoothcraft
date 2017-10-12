import buildMockContext from '../../../helpers/buildMockContext'
import fillPath from '../../../../src/render/fillPath'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder }) as CanvasRenderingContext2D

		fillPath({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'closePath' },
			{ method: 'fill' },
		])
	})
})
