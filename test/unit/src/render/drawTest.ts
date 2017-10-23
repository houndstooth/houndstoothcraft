import { draw } from '../../../../src/render/draw'
import * as fill from '../../../../src/render/fill'
import * as to from '../../../../src/utilities/to'
import * as view from '../../../../src/view'

describe('draw', () => {
	const shapeColor = { a: 1 }
	const context = {}

	const path = []
	beforeEach(() => {
		spyOn(view, 'applyView').and.returnValue(path)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = to.Outline([ [ 0, 1 ] ])

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = to.Outline([ [ 0, 1 ], [ 1, 1 ] ])

		draw({ context, shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline
		beforeEach(() => {
			spyOn(fill, 'fill')
			outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			draw({ context, shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(view.applyView).toHaveBeenCalledWith(outline)
		})

		it('fills the adjusted outline', () => {
			expect(fill.fill).toHaveBeenCalledWith({ context, shapeColor, path })
		})
	})
})
