import { ERASE } from '../../../../src/constants'
import { Context } from '../../../../src/page'
import { Color } from '../../../../src/render'
import { buildFill } from '../../../../src/render/buildFill'
import * as parseColor from '../../../../src/render/parseColor'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('build fill', () => {
	const shapeColor: Color = { a: 1 }
	const parsedColor: string = '#012345'
	let context: Context
	beforeEach(() => {
		context = buildMockContext()
		state.contexts = [ context ]
		spyOn(parseColor, 'parseColor').and.returnValue(parsedColor)

		buildFill({ shapeColor })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(parseColor.parseColor).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('defaults the global composite operation to source-over', () => {
		expect(context.globalCompositeOperation).toEqual('source-over')
	})

	describe('when erasing', () => {
		it('sets the operation to destination-out', () => {
			buildFill({ shapeColor: ERASE })

			expect(context.globalCompositeOperation).toEqual('destination-out')
		})
	})
})
