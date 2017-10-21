import { to } from '../../../../src'
import { buildPath } from '../../../../src/render/buildPath'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('build path', () => {
	it('draws the path with the correct outline and fills it', () => {
		const outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		buildPath({ context, outline })

		const expectedContextCallsOrder = [
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
