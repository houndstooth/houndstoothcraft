import {
	applyViewForShape,
	Color,
	createPath,
	fill,
	fillPath,
	Outline,
	Path,
	setupRenderStyle,
	to,
} from '../../../../../../src/indexForTest'

describe('fill', () => {
	let subject: (_: { outline: Outline, shapeColor: Color }) => void
	const shapeColor: Color = { a: 1 }

	let path: Path
	beforeEach(() => {
		subject = fill.default
		path = to.Path([])
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
			spyOn(createPath, 'default')
			spyOn(setupRenderStyle, 'default')
			spyOn(fillPath, 'default')
			outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])

			subject({ shapeColor, outline })
		})

		it('adjusts for the view setting', () => {
			expect(applyViewForShape.default).toHaveBeenCalledWith(outline)
		})

		it('builds a path from it ', () => {
			expect(createPath.default).toHaveBeenCalledWith({ path })
		})

		it('sets up the render style', () => {
			expect(setupRenderStyle.default).toHaveBeenCalledWith({ shapeColor })
		})

		it('fills this path', () => {
			expect(fillPath.default).toHaveBeenCalled()
		})
	})
})
