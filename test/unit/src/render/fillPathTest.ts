import { fillPath } from '../../../../src/render/fillPath'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		fillPath()

		const expectedContextCallsOrder = [
			{ method: 'closePath' },
			{ method: 'fill' },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
