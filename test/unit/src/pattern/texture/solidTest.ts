import { Color, fill, getColor, Outline, ShapeColorIndex, solid, to } from '../../../../../src'
import Spy = jasmine.Spy

describe('solid', () => {
	const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(8)
	const outline: Outline = to.Outline([])

	const shapeColor: Color = { a: 1 }
	const transparentColor: Color = { a: 0 }

	let getColorSpy: Spy
	beforeEach(() => {
		spyOn(fill, 'main')
		getColorSpy = spyOn(getColor, 'main').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid.main({ outline, shapeColorIndex })

		expect(getColor.main).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	it('when the color is not completely transparent, it renders', () => {
		solid.main({ outline, shapeColorIndex })

		expect(fill.main).toHaveBeenCalledWith({ outline, shapeColor })
	})

	it('when the color turns out to be completely transparent, it does not render', () => {
		getColorSpy.and.returnValue(transparentColor)

		solid.main({ outline, shapeColorIndex })

		expect(fill.main).not.toHaveBeenCalled()
	})
})
