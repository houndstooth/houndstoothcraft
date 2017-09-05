import fill from '../../../src/render/fill'
import colorUtilities from '../../../src/utilities/colorUtilities'
import { ERASE } from '../../../src/constants'
import renderUtilities from '../../../src/utilities/renderUtilities'

describe('fill', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const context = {}
	const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
	beforeEach(() => {
		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)
		spyOn(renderUtilities, 'buildPath')
		spyOn(renderUtilities, 'fillPath')

		fill({ context, shapeColor, outline })
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
			fill({ context, shapeColor: ERASE, outline })

			expect(context.globalCompositeOperation).toEqual('destination-out')
		})
	})
})
