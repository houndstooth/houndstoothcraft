import * as buildFill from '../../../../src/render/buildFill'
import * as buildPath from '../../../../src/render/buildPath'
import { fill } from '../../../../src/render/fill'
import * as fillPath from '../../../../src/render/fillPath'
import { Outline } from '../../../../src/space/types/Outline'
import * as to from '../../../../src/utilities/to'
import * as view from '../../../../src/view'

describe('fill', () => {
	const shapeColor = { a: 1 }

	const path = to.Path([])
	beforeEach(() => {
		spyOn(view, 'applyView').and.returnValue(path)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = to.Outline([])

		fill({ shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = to.Outline([ [ 0, 1 ] ])

		fill({ shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = to.Outline([ [ 0, 1 ], [ 1, 1 ] ])

		fill({ shapeColor, outline })

		expect(view.applyView).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline: Outline
		beforeEach(() => {
			spyOn(buildPath, 'buildPath')
			spyOn(buildFill, 'buildFill')
			spyOn(fillPath, 'fillPath')
			outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])

			fill({ shapeColor, outline })
		})

		it('adjusts for the view settings', () => {
			expect(view.applyView).toHaveBeenCalledWith(outline)
		})

		it('builds a path from it ', () => {
			expect(buildPath.buildPath).toHaveBeenCalledWith({ path })
		})

		it('builds the fill ', () => {
			expect(buildFill.buildFill).toHaveBeenCalledWith({ shapeColor })
		})

		it('fills this path', () => {
			expect(fillPath.fillPath).toHaveBeenCalled()
		})
	})
})
