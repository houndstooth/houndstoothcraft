import render from '../../../src/render/render'
import colorUtilities from '../../../src/utilities/colorUtilities'
import { ERASE } from '../../../src/constants'
import renderUtilities from '../../../src/utilities/renderUtilities'

describe('render', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const context = {}

	beforeEach(() => {
		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)
		spyOn(renderUtilities, 'buildPath')
		spyOn(renderUtilities, 'fillPath')
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		render({ context, shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(renderUtilities.buildPath).not.toHaveBeenCalled()
		expect(renderUtilities.fillPath).not.toHaveBeenCalled()
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = [ [ 0, 1 ] ]

		render({ context, shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(renderUtilities.buildPath).not.toHaveBeenCalled()
		expect(renderUtilities.fillPath).not.toHaveBeenCalled()
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ] ]

		render({ context, shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(renderUtilities.buildPath).not.toHaveBeenCalled()
		expect(renderUtilities.fillPath).not.toHaveBeenCalled()
	})

	describe('when there are at least three coordinates in the outline', () => {
		let outline
		beforeEach(() => {
			outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
			render({ context, shapeColor, outline })
		})

		it('parses the shape color and sets the fill style to it', () => {
			expect(colorUtilities.parseColor).toHaveBeenCalledWith(shapeColor)
		})

		it('sets the fill style to the parsed color', () => {
			expect(context.fillStyle).toBe(parsedColor)
		})

		it('builds a path from it ', () => {
			expect(renderUtilities.buildPath).toHaveBeenCalledWith({ context, outline })
		})

		it('fills this path', () => {
			expect(renderUtilities.fillPath).toHaveBeenCalledWith({ context })
		})

		it('defaults the global composite operation to source-over', () => {
			expect(context.globalCompositeOperation).toEqual('source-over')
		})

		describe('when erasing', () => {
			it('sets the operation to destination-out', () => {
				render({ context, shapeColor: ERASE, outline })

				expect(context.globalCompositeOperation).toEqual('destination-out')
			})
		})
	})
})
