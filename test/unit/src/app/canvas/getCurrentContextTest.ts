import { appState, getCurrentContext, to } from '../../../../../src'

const subject: () => CanvasRenderingContext2D = getCurrentContext.default

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D
		appState.canvas.contexts = [ {}, {}, {}, expectedContext, {}, {} ] as CanvasRenderingContext2D[]
		appState.execute.currentLayer = to.Layer(3)

		expect(subject()).toBe(expectedContext)
	})
})
