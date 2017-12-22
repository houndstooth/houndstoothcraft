import { appState, createPath, Path, to } from '../../../../../../src/indexForTest'
import { createMockContext, MockContextCall } from '../../../../helpers'

describe('create path', () => {
	it('draws the correct path and fills it', () => {
		const subject: (_: { path: Path }) => void = createPath.default
		const path: Path = to.Path([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ createMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject({ path })

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'beginPath' },
			{ method: 'moveTo', x: 0, y: 1 },
			{ method: 'lineTo', x: 1, y: 1 },
			{ method: 'lineTo', x: 1, y: 0 },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
