// tslint:disable:no-unsafe-any

import {
	Canvas,
	Context,
	defaults,
	documentWrapper,
	NullarySideEffector,
	state,
	storeMixedDownContext,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockCanvas } from '../../../helpers'

const subject: NullarySideEffector = storeMixedDownContext.default

describe('settings mixed down context', () => {
	let mixedDownContext: Context
	beforeEach(() => {
		expect(state.mixedDownContext).toEqual({})

		mixedDownContext = buildMockContext()
		const mixedDownCanvas: Canvas = buildMockCanvas({ context: mixedDownContext })
		spyOn(documentWrapper, 'querySelector').and.returnValue(mixedDownCanvas)

		subject()
	})

	it('puts the mixed down canvas\'s context onto the state', () => {
		// tslint:disable-next-line:no-any
		expect(state.mixedDownContext).toBe(mixedDownContext as any)
	})

	it('sets the mixed down context\'s width and height to the default canvas size', () => {
		expect(state.mixedDownContext.canvas.height).toBe(defaults.DEFAULT_CANVAS_SIZE)
		expect(state.mixedDownContext.canvas.width).toBe(defaults.DEFAULT_CANVAS_SIZE)
	})
})
