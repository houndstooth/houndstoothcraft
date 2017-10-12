import fill from '../../../../src/render/fill'
import { ERASE } from '../../../../src/constants'
import * as parseColor from '../../../../src/render/parseColor'
import * as buildPath from '../../../../src/render/buildPath'
import * as fillPath from '../../../../src/render/fillPath'
import buildMockContext from '../../../helpers/buildMockContext'

describe('fill', () => {
	const shapeColor = { a: 1 }
	const parsedColor = '#012345'
	const context = buildMockContext() as CanvasRenderingContext2D
	const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

	beforeEach(() => {
		spyOn(parseColor, 'default').and.returnValue(parsedColor)
		spyOn(buildPath, 'default')
		spyOn(fillPath, 'default')

		fill({ context, shapeColor, outline })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(parseColor.default).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('builds a path from it ', () => {
		expect(buildPath.default).toHaveBeenCalledWith({ context, outline })
	})

	it('fills this path', () => {
		expect(fillPath.default).toHaveBeenCalledWith({ context })
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
