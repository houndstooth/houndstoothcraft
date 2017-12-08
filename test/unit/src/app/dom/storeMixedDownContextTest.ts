// tslint:disable:no-unsafe-any

import {
	appState,
	constants,
	from,
	globalWrapper,
	NullarySideEffector,
	storeMixedDownContext,
} from '../../../../../src'
import { buildMockCanvas, buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = storeMixedDownContext.default

describe('settings mixed down context', () => {
	let mixedDownContext: CanvasRenderingContext2D
	beforeEach(() => {
		mixedDownContext = buildMockContext() as CanvasRenderingContext2D
		const mixedDownCanvas: HTMLCanvasElement = buildMockCanvas({ context: mixedDownContext }) as HTMLCanvasElement
		spyOn(globalWrapper.document, 'querySelector').and.returnValue(mixedDownCanvas)

		subject()
	})

	it('puts the mixed down canvas\'s context onto the app state', () => {
		// tslint:disable-next-line:no-any
		expect(appState.canvas.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down context\'s width and height to the default canvas size', () => {
		expect(appState.canvas.mixedDownContext.canvas.height).toBe(from.Px(constants.CANVAS_SIZE))
		expect(appState.canvas.mixedDownContext.canvas.width).toBe(from.Px(constants.CANVAS_SIZE))
	})
})
