// tslint:disable:no-object-literal-type-assertion

import { appState, getCurrentContext, to } from '../../../../../src/indexForTest'
import { buildMockContext } from '../../../helpers'

describe('get current context', () => {
	it('gets the current context', () => {
		const subject: () => CanvasRenderingContext2D = getCurrentContext.default

		const expectedContext: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		appState.render.contexts = [
			{} as CanvasRenderingContext2D,
			{} as CanvasRenderingContext2D,
			{} as CanvasRenderingContext2D,
			expectedContext,
			{} as CanvasRenderingContext2D,
			{} as CanvasRenderingContext2D,
		]
		appState.execute.currentLayer = to.Layer(3)

		expect(subject()).toBe(expectedContext)
	})
})
