import { applyViewForShape, buildFill, buildPath, Color, fill, fillPath, Outline, Path, to } from '../../../../../src'

describe('fill', () => {
	const shapeColor: Color = { a: 1 }

	const path: Path = to.Path([])
	beforeEach(() => {
		spyOn(applyViewForShape, 'main').and.returnValue(path)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline: Outline = to.Outline([])

		fill.main({ shapeColor, outline })

		expect(applyViewForShape.main).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ] ])

		fill.main({ shapeColor, outline })

		expect(applyViewForShape.main).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ], [ 1, 1 ] ])

		fill.main({ shapeColor, outline })

		expect(applyViewForShape.main).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline: Outline
		beforeEach(() => {
			spyOn(buildPath, 'main')
			spyOn(buildFill, 'main')
			spyOn(fillPath, 'main')
			outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])

			fill.main({ shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(applyViewForShape.main).toHaveBeenCalledWith(outline)
		})

		it('builds a path from it ', () => {
			expect(buildPath.main).toHaveBeenCalledWith({ path })
		})

		it('builds the fill ', () => {
			expect(buildFill.main).toHaveBeenCalledWith({ shapeColor })
		})

		it('fills this path', () => {
			expect(fillPath.main).toHaveBeenCalled()
		})
	})
})
