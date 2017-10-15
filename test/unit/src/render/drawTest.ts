import draw from '../../../../src/render/draw'
import * as view from '../../../../src/view'
import * as fill from '../../../../src/render/fill'
import Outline from '../../../../src/space/types/Outline'

describe('draw', () => {
	const shapeColor = { a: 1 }
	const context = {}

	const adjustedOutline = []
	beforeEach(() => {
		spyOn(view, 'applyView').and.returnValue(adjustedOutline)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = [ [ 0 as any, 1 as any ] ] as Outline

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = [ [ 0 as any, 1 as any ], [ 1 as any, 1 as any ] ] as Outline

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline
		beforeEach(() => {
			spyOn(fill, 'default')
			outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			draw({ context, shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(view.applyView).toHaveBeenCalledWith(outline)
		})

		it('fills the adjusted outline', () => {
			expect(fill.default).toHaveBeenCalledWith({ context, shapeColor, outline: adjustedOutline })
		})
	})
})
