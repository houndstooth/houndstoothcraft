import render from '../../../src/render/render'

describe('render', () => {
	const shapeColor = {}
	const context = {}

	let applyViewSpy
	const adjustedOutline = []
	beforeEach(() => {
		applyViewSpy = jasmine.createSpy().and.returnValue(adjustedOutline)
		render.__Rewire__('applyView', applyViewSpy)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		render({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = [ [ 0, 1 ] ]

		render({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ] ]

		render({ context, shapeColor, outline })

		expect(applyViewSpy).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let fillSpy
		let outline
		beforeEach(() => {
			fillSpy = jasmine.createSpy()
			render.__Rewire__('fill', fillSpy)
			outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			render({ context, shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(applyViewSpy).toHaveBeenCalledWith(outline)
		})

		it('fills the adjusted outline', () => {
			expect(fillSpy).toHaveBeenCalledWith({ context, shapeColor, outline: adjustedOutline })
		})
	})
})
