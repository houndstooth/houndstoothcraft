import { appState, Color, ERASE, parseColor, setupRenderStyle } from '../../../../../../src/indexForTest'
import { createMockContext } from '../../../../helpers'

describe('setup render style', () => {
	let subject: (_: { shapeColor: Color }) => void
	const shapeColor: Color = { a: 1 }
	const parsedColor: string = '#012345'
	let context: CanvasRenderingContext2D
	beforeEach(() => {
		subject = setupRenderStyle.default
		context = createMockContext() as CanvasRenderingContext2D
		appState.render.contexts = [ context ]
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
