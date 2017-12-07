import { appState, buildFill, Color, constants, Context, parseColor } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'

const subject: (_: { shapeColor: Color }) => void = buildFill.default

describe('build fill', () => {
	const { ERASE } = constants
	const shapeColor: Color = { a: 1 }
	const parsedColor: string = '#012345'
	let context: Context
	beforeEach(() => {
		context = buildMockContext()
		appState.canvas.contexts = [ context ]
		spyOn(parseColor, 'default').and.returnValue(parsedColor)

		subject({ shapeColor })
	})

	it('parses the shape color and sets the fill style to it', () => {
		expect(parseColor.default).toHaveBeenCalledWith(shapeColor)
	})

	it('sets the fill style to the parsed color', () => {
		expect(context.fillStyle).toBe(parsedColor)
	})

	it('defaults the global composite operation to source-over', () => {
		expect(context.globalCompositeOperation).toEqual('source-over')
	})

	describe('when erasing', () => {
		it('sets the operation to destination-out', () => {
			subject({ shapeColor: ERASE })

			expect(context.globalCompositeOperation).toEqual('destination-out')
		})
	})
})
