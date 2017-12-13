// tslint:disable:no-unsafe-any

import { appState, CANVAS_SIZE, from, setupMixedDownContext } from '../../../../../src/indexForTest'
import { buildMockCanvas, buildMockContext } from '../../../helpers'

describe('settings mixed down context', () => {
	let subject: () => void
	let mixedDownContext: CanvasRenderingContext2D
	beforeEach(() => {
		subject = setupMixedDownContext.default
		mixedDownContext = buildMockContext() as CanvasRenderingContext2D
		appState.dom.mixedDownCanvas = buildMockCanvas({ context: mixedDownContext }) as HTMLCanvasElement

		subject()
	})

	it('puts the mixed down canvas\'s context onto the app state', () => {
		// tslint:disable-next-line:no-any
		expect(appState.render.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down context\'s width and height to the default canvas size', () => {
		expect(appState.render.mixedDownContext.canvas.height).toBe(from.Px(CANVAS_SIZE))
		expect(appState.render.mixedDownContext.canvas.width).toBe(from.Px(CANVAS_SIZE))
	})
})
