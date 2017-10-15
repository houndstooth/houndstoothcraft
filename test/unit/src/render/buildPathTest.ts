import buildMockContext from '../../../helpers/buildMockContext'
import buildPath from '../../../../src/render/buildPath'
import Outline from '../../../../src/space/types/Outline'

describe('build path', () => {
	it('draws the path with the correct outline and fills it', () => {
		const outline = [ [ 0 as any, 1 as any ], [ 1 as any, 1 as any ], [ 1 as any, 0 as any ] ] as Outline
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder }) as CanvasRenderingContext2D

		buildPath({ context, outline })

		expect(contextCallsOrder).toEqual([
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		])
	})
})
