import { Path } from '../../../../../src/app/render'
import { buildPath } from '../../../../../src/app/render/buildPath'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'
import { buildMockContext } from '../../../../helpers/buildMockContext'
import { MockContextCall } from '../../../../helpers/types'

describe('build path', () => {
	it('draws the correct path and fills it', () => {
		const path: Path = to.Path([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		buildPath({ path })

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})