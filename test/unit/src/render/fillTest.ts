import { ERASE } from '../../../../src/constants'
import * as buildPath from '../../../../src/render/buildPath'
import fill from '../../../../src/render/fill'
import * as fillPath from '../../../../src/render/fillPath'
import * as parseColor from '../../../../src/render/parseColor'
import Outline from '../../../../src/space/types/Outline'
import buildMockContext from '../../../helpers/buildMockContext'

describe('fill', () => {
	const shapeColor = { a: 1 }
	const parsedColor = '#012345'
	const context = buildMockContext()
	const outline = [ [ 0 as any, 1 as any ], [ 1 as any, 1 as any ], [ 1 as any, 0 as any ] ] as Outline

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
