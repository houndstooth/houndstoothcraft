// tslint:disable:no-unsafe-any

import { appState, CANVAS_SIZE, from, setupMixedDownContext } from '../../../../../../src/indexForTest'
import { buildMockCanvas } from '../../../../helpers'

describe('setup mixed down context', () => {
	let subject: () => void
	let mixedDownContext: CanvasRenderingContext2D
	beforeEach(() => {
		subject = setupMixedDownContext.default
		// tslint:disable-next-line:no-object-literal-type-assertion
		mixedDownContext = {} as CanvasRenderingContext2D
		appState.dom.mixedDownCanvas = buildMockCanvas({ context: mixedDownContext }) as HTMLCanvasElement

		subject()
	})

	it('puts the mixed down canvas\'s context onto the app state', () => {
		// tslint:disable-next-line:no-any
		expect(appState.render.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down canvas\'s width and height to the default canvas size', () => {
		expect(appState.dom.mixedDownCanvas.height).toBe(from.Px(CANVAS_SIZE))
		expect(appState.dom.mixedDownCanvas.width).toBe(from.Px(CANVAS_SIZE))
	})
})
