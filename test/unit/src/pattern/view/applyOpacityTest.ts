import { applyOpacity, getCurrentContext, NullarySideEffector, patternState } from '../../../../../src/indexForTest'
import { buildMockContext } from '../../../helpers'

describe('apply opacity', () => {
	let subject: NullarySideEffector
	let context: CanvasRenderingContext2D
	beforeEach(() => {
		subject = applyOpacity.default

		context = buildMockContext() as CanvasRenderingContext2D
		spyOn(getCurrentContext, 'default').and.returnValue(context)
	})

	it('has no effect if no opacity level is specified', () => {
		expect(context.globalAlpha).toBe(1)

		subject()

		expect(context.globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		patternState.colorSettings.opacity = 1

		subject()

		expect(context.globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		patternState.colorSettings.opacity = 0.4

		subject()

		expect(context.globalAlpha).toBe(0.4)
	})
})
