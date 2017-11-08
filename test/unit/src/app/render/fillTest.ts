import { Path } from '../../../../../src/app/render'
import * as buildFill from '../../../../../src/app/render/buildFill'
import * as buildPath from '../../../../../src/app/render/buildPath'
import { fill } from '../../../../../src/app/render/fill'
import * as fillPath from '../../../../../src/app/render/fillPath'
import * as pattern from '../../../../../src/pattern'
import { Color } from '../../../../../src/pattern/color/types'
import { Outline } from '../../../../../src/pattern/stripe'
import * as to from '../../../../../src/to'

describe('fill', () => {
	const shapeColor: Color = { a: 1 }

	const path: Path = to.Path([])
	beforeEach(() => {
		spyOn(pattern, 'applyViewForShape').and.returnValue(path)
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline: Outline = to.Outline([])

		fill({ shapeColor, outline })

		expect(pattern.applyViewForShape).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ] ])

		fill({ shapeColor, outline })

		expect(pattern.applyViewForShape).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline: Outline = to.Outline([ [ 0, 1 ], [ 1, 1 ] ])

		fill({ shapeColor, outline })

		expect(pattern.applyViewForShape).not.toHaveBeenCalled()
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
			expect(pattern.applyViewForShape).toHaveBeenCalledWith(outline)
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
