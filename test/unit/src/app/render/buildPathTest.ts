import { buildPath, Path, state, to } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

describe('build path', () => {
	it('draws the correct path and fills it', () => {
		const path: Path = to.Path([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		buildPath.main({ path })

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
