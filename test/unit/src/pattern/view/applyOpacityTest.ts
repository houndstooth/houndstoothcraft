import { applyOpacity, getCurrentContext, NullarySideEffector } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { setPatternStateForTest } from '../../../helpers'

const subject: NullarySideEffector = applyOpacity.default

describe('apply opacity', () => {
	let context: CanvasRenderingContext2D
	beforeEach(() => {
		context = buildMockContext() as CanvasRenderingContext2D
		spyOn(getCurrentContext, 'default').and.returnValue(context)
	})

	it('has no effect if no opacity level is specified', () => {
		expect(context.globalAlpha).toBe(1)

		subject()

		expect(context.globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		setPatternStateForTest('colorSettings', { opacity: 1 })

		subject()

		expect(context.globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		setPatternStateForTest('colorSettings', { opacity: 0.4 })

		subject()

		expect(context.globalAlpha).toBe(0.4)
	})
})
