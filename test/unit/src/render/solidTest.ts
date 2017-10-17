import * as draw from '../../../../src/render/draw'
import * as getColor from '../../../../src/render/getColor'
import solid from '../../../../src/render/solid'

describe('solid', () => {
	const shapeColorIndex = 8
	const shapeColor = { a: 1 }
	const transparentColor = { a: 0 }
	const context = {}
	const outline = []
	let getColorSpy
	beforeEach(() => {
		spyOn(draw, 'default')
		getColorSpy = spyOn(getColor, 'default').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid({ context, outline, shapeColorIndex })

		expect(getColor.default).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	describe('when the color is not completely transparent', () => {
		it('renders', () => {
			solid({ context, outline, shapeColorIndex })

			expect(draw.default).toHaveBeenCalledWith({ context, shapeColor, outline })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		it('does not render', () => {
			getColorSpy.and.returnValue(transparentColor)

			solid({ context, outline, shapeColorIndex })

			expect(draw.default).not.toHaveBeenCalled()
		})
	})
})
