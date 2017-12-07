// tslint:disable:no-unsafe-any

import {
	appState,
	Canvas,
	constants,
	Context,
	documentWrapper,
	NullarySideEffector,
	storeMixedDownContext,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockCanvas } from '../../../helpers'

const subject: NullarySideEffector = storeMixedDownContext.default

describe('settings mixed down context', () => {
	let mixedDownContext: Context
	beforeEach(() => {
		expect(appState.canvas.mixedDownContext).toEqual({})

		mixedDownContext = buildMockContext()
		const mixedDownCanvas: Canvas = buildMockCanvas({ context: mixedDownContext })
		spyOn(documentWrapper, 'querySelector').and.returnValue(mixedDownCanvas)

		subject()
	})

	it('puts the mixed down canvas\'s context onto the app state', () => {
		// tslint:disable-next-line:no-any
		expect(appState.canvas.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down context\'s width and height to the default canvas size', () => {
		expect(appState.canvas.mixedDownContext.canvas.height).toBe(constants.CANVAS_SIZE)
		expect(appState.canvas.mixedDownContext.canvas.width).toBe(constants.CANVAS_SIZE)
	})
})
