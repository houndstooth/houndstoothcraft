import { to } from '../../../../src'
import { buildPath } from '../../../../src/render/buildPath'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextCall } from '../../../types/MockContextCall'

describe('build path', () => {
	it('draws the correct path and fills it', () => {
		const path = to.Path([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		buildPath({ path })

		// tslint:disable:no-any
		const expectedContextCallsOrder = [
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
