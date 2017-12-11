// tslint:disable:no-unsafe-any

import {
	appState,
	constants,
	from,
	NullarySideEffector,
	setupMixedDownContext,
} from '../../../../../src/indexForTest'
import { buildMockCanvas, buildMockContext } from '../../../helpers'

const subject: NullarySideEffector = setupMixedDownContext.default

describe('settings mixed down context', () => {
	let mixedDownContext: CanvasRenderingContext2D
	beforeEach(() => {
		mixedDownContext = buildMockContext() as CanvasRenderingContext2D
		appState.dom.mixedDownCanvas = buildMockCanvas({ context: mixedDownContext }) as HTMLCanvasElement

		subject()
	})

	it('puts the mixed down canvas\'s context onto the app state', () => {
		// tslint:disable-next-line:no-any
		expect(appState.render.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down context\'s width and height to the default canvas size', () => {
		expect(appState.render.mixedDownContext.canvas.height).toBe(from.Px(constants.CANVAS_SIZE))
		expect(appState.render.mixedDownContext.canvas.width).toBe(from.Px(constants.CANVAS_SIZE))
	})
})
