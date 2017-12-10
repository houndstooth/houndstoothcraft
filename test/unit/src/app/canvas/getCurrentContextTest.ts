import { appState, getCurrentContext, to } from '../../../../../src'
import { buildMockContext } from '../../../helpers'

const subject: () => CanvasRenderingContext2D = getCurrentContext.default

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		appState.canvas.contexts = [
			buildMockContext() as CanvasRenderingContext2D,
			buildMockContext() as CanvasRenderingContext2D,
			buildMockContext() as CanvasRenderingContext2D,
			expectedContext,
			buildMockContext() as CanvasRenderingContext2D,
			buildMockContext() as CanvasRenderingContext2D,
		]
		appState.execute.currentLayer = to.Layer(3)

		expect(subject()).toBe(expectedContext)
	})
})
