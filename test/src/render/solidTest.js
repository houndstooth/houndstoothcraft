import solid from '../../../src/render/solid'

describe('solid', () => {
	let getColorSpy
	let drawSpy

	const shapeColorIndex = 8
	const shapeColor = { a: 1 }
	const transparentColor = { a: 0 }
	const context = {}
	const outline = []

	beforeEach(() => {
		drawSpy = jasmine.createSpy()
		solid.__Rewire__('draw', drawSpy)
		getColorSpy = jasmine.createSpy().and.returnValue(shapeColor)
		solid.__Rewire__('getColor', getColorSpy)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid({ context, outline, shapeColorIndex })

		expect(getColorSpy).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	describe('when the color is not completely transparent', () => {
		it('renders', () => {
			solid({ context, outline, shapeColorIndex })

			expect(drawSpy).toHaveBeenCalledWith({ context, shapeColor, outline })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		it('does not render', () => {
			getColorSpy.and.returnValue(transparentColor)

			solid({ context, outline, shapeColorIndex })

			expect(drawSpy).not.toHaveBeenCalled()
		})
	})
})
