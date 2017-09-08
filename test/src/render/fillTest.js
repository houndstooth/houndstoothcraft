import fill from '../../../src/render/fill'
import colorUtilities from '../../../src/utilities/colorUtilities'
import { ERASE } from '../../../src/constants'

describe('fill', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const context = {}
	const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
	let buildPathSpy
	let fillPathSpy
	beforeEach(() => {
		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)
		buildPathSpy = jasmine.createSpy()
		fill.__Rewire__('buildPath', buildPathSpy)
		fillPathSpy = jasmine.createSpy()
		fill.__Rewire__('fillPath', fillPathSpy)

		fill({ context, shapeColor, outline })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(colorUtilities.parseColor).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('builds a path from it ', () => {
		expect(buildPathSpy).toHaveBeenCalledWith({ context, outline })
	})

	it('fills this path', () => {
		expect(fillPathSpy).toHaveBeenCalledWith({ context })
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
