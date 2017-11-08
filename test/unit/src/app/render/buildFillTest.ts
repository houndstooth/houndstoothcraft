import { Context } from '../../../../../src/app/page'
import { buildFill } from '../../../../../src/app/render/buildFill'
import { ERASE } from '../../../../../src/constants'
import * as pattern from '../../../../../src/pattern'
import { Color } from '../../../../../src/pattern/color/types'
import { state } from '../../../../../src/state'
import { buildMockContext } from '../../../../helpers/buildMockContext'

describe('build fill', () => {
	const shapeColor: Color = { a: 1 }
	const parsedColor: string = '#012345'
	let context: Context
	beforeEach(() => {
		context = buildMockContext()
		state.contexts = [ context ]
		spyOn(pattern, 'parseColor').and.returnValue(parsedColor)

		buildFill({ shapeColor })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(pattern.parseColor).toHaveBeenCalledWith(shapeColor)
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
