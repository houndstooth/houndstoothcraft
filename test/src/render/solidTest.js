import solid from '../../../src/render/solid'
import colorUtilities from '../../../src/utilities/colorUtilities'

describe('solid', () => {
	let getColorSpy
	let renderSpy

	const shapeColorIndex = 8
	const shapeColor = { a: 1 }
	const transparentColor = { a: 0 }
	const context = {}
	const outline = []

	beforeEach(() => {
		renderSpy = jasmine.createSpy()
		solid.__Rewire__('render', renderSpy)
		getColorSpy = spyOn(colorUtilities, 'getColor').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid({ context, outline, shapeColorIndex })

		expect(getColorSpy).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	describe('when the color is not completely transparent', () => {
		it('renders', () => {
			solid({ context, outline, shapeColorIndex })

			expect(renderSpy).toHaveBeenCalledWith({ context, shapeColor, outline })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		it('does not render', () => {
			getColorSpy.and.returnValue(transparentColor)

			solid({ context, outline, shapeColorIndex })

			expect(renderSpy).not.toHaveBeenCalled()
		})
	})
})
