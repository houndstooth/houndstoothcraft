import { applyViewForShape, buildFill, buildPath, Color, fill, fillPath, Outline, Path, to } from '../../../../../src'

const subject: (_: { outline: Outline, shapeColor: Color }) => void = fill.default

describe('fill', () => {
	const shapeColor: Color = { a: 1 }

	const path: Path = to.Path([])
	beforeEach(() => {
		spyOn(applyViewForShape, 'default').and.returnValue(path)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline: Outline = to.Outline([])

		subject({ shapeColor, outline })

		expect(applyViewForShape.default).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ] ])

		subject({ shapeColor, outline })

		expect(applyViewForShape.default).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ], [ 1, 1 ] ])

		subject({ shapeColor, outline })

		expect(applyViewForShape.default).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline: Outline
		beforeEach(() => {
			spyOn(buildPath, 'default')
			spyOn(buildFill, 'default')
			spyOn(fillPath, 'default')
			outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])

			subject({ shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(applyViewForShape.default).toHaveBeenCalledWith(outline)
		})

		it('builds a path from it ', () => {
			expect(buildPath.default).toHaveBeenCalledWith({ path })
		})

		it('builds the fill ', () => {
			expect(buildFill.default).toHaveBeenCalledWith({ shapeColor })
		})

		it('fills this path', () => {
			expect(fillPath.default).toHaveBeenCalled()
		})
	})
})
