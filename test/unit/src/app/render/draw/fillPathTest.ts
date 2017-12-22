import { appState, fillPath } from '../../../../../../src/indexForTest'
import { createMockContext, MockContextCall } from '../../../../helpers'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const subject: () => void = fillPath.default
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ createMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'closePath' },
			{ method: 'fill' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
