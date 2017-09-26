import buildMockContext from '../../helpers/buildMockContext'
import buildPath from '../../../../src/render/buildPath'

describe('build path', () => {
	it('draws the path with the correct outline and fills it', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		buildPath({ context, outline })

		expect(contextCallsOrder).toEqual([
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		])
	})
})
