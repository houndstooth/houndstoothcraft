import { appState, fillPath } from '../../../../../src/indexForTest'
import { buildMockContext, MockContextCall } from '../../../helpers'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const subject: () => void = fillPath.default
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'closePath' },
			{ method: 'fill' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
