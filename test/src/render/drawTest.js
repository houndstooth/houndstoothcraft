import draw from '../../../src/render/draw'
import view from '../../../src/view'

describe('draw', () => {
	const shapeColor = {}
	const context = {}

	let applyViewSpy
	const adjustedOutline = []
	beforeEach(() => {
		applyViewSpy = spyOn(view, 'applyView').and.returnValue(adjustedOutline)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		draw({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = [ [ 0, 1 ] ]

		draw({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ] ]

		draw({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let fillSpy
		let outline
		beforeEach(() => {
			fillSpy = jasmine.createSpy()
			draw.__Rewire__('fill', fillSpy)
			outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			draw({ context, shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(applyViewSpy).toHaveBeenCalledWith(outline)
		})

		it('fills the adjusted outline', () => {
			expect(fillSpy).toHaveBeenCalledWith({ context, shapeColor, outline: adjustedOutline })
		})
	})
})
