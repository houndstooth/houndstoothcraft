import { applyViewForGrid, CANVAS_SIZE, CYAN, getCurrentContext, patternState } from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { createMockContext } from '../../../helpers'

describe('apply view for grid', () => {
	let subject: () => void
	beforeEach(() => {
		subject = applyViewForGrid.default
	})

	describe('applying background color', () => {
		const defaultFillStyle: string = '#000000'
		let fillRectSpy: Spy
		let context: CanvasRenderingContext2D
		beforeEach(() => {
			fillRectSpy = jasmine.createSpy('fillRect')
			context = createMockContext({ fillRectSpy }) as CanvasRenderingContext2D
			spyOn(getCurrentContext, 'default').and.returnValue(context)
		})

		it('fills the entire canvas with the color', () => {
			patternState.colorSettings.backgroundColor = CYAN

			subject()

			expect(context.fillStyle).toBe('rgba(0,255,255,1)')
			expect(fillRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
		})

		it('returns early when no background color is set', () => {
			subject()

			expect(context.fillStyle).toBe(defaultFillStyle)
			expect(fillRectSpy).not.toHaveBeenCalled()
		})
	})

	describe('applying opacity', () => {
		let context: CanvasRenderingContext2D
		beforeEach(() => {
			context = createMockContext() as CanvasRenderingContext2D
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
})
