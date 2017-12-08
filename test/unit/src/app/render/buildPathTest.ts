import { appState, buildPath, Path, to } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

const subject: (_: { path: Path }) => void = buildPath.default

describe('build path', () => {
	it('draws the correct path and fills it', () => {
		const path: Path = to.Path([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])
		const contextCallsOrder: MockContextCall[] = []
		appState.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

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
