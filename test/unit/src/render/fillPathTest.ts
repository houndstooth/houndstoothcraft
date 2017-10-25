import { fillPath } from '../../../../src/render/fillPath'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextCall } from '../../../types/MockContextCall'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		fillPath()

		// tslint:disable:no-any
		const expectedContextCallsOrder = [
			{ method: 'closePath' },
			{ method: 'fill' },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
