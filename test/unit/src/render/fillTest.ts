import { to } from '../../../../src'
import { ERASE } from '../../../../src/constants'
import * as buildPath from '../../../../src/render/buildPath'
import { fill } from '../../../../src/render/fill'
import * as fillPath from '../../../../src/render/fillPath'
import * as parseColor from '../../../../src/render/parseColor'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('fill', () => {
	const shapeColor = { a: 1 }
	const parsedColor = '#012345'
	const context = buildMockContext()
	const outline = to.Outline([ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ])

	beforeEach(() => {
		spyOn(parseColor, 'parseColor').and.returnValue(parsedColor)
		spyOn(buildPath, 'buildPath')
		spyOn(fillPath, 'fillPath')

		fill({ context, shapeColor, outline })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(parseColor.parseColor).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('builds a path from it ', () => {
		expect(buildPath.buildPath).toHaveBeenCalledWith({ context, outline })
	})

	it('fills this path', () => {
		expect(fillPath.fillPath).toHaveBeenCalledWith({ context })
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
