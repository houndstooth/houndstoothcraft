import * as app from '../../../../../src/app'
import * as color from '../../../../../src/pattern/color'
import { Color, ShapeColorIndex } from '../../../../../src/pattern/color/types'
import Spy = jasmine.Spy
import { Outline } from '../../../../../src/pattern/stripe'
import { solid } from '../../../../../src/pattern/texture/solid'
import * as to from '../../../../../src/to'

describe('solid', () => {
	const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(8)
	const outline: Outline = to.Outline([])

	const shapeColor: Color = { a: 1 }
	const transparentColor: Color = { a: 0 }

	let getColorSpy: Spy
	beforeEach(() => {
		spyOn(app, 'fill')
		getColorSpy = spyOn(color, 'getColor').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid({ outline, shapeColorIndex })

		expect(color.getColor).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	it('when the color is not completely transparent, it renders', () => {
		solid({ outline, shapeColorIndex })

		expect(app.fill).toHaveBeenCalledWith({ outline, shapeColor })
	})

	it('when the color turns out to be completely transparent, it does not render', () => {
		getColorSpy.and.returnValue(transparentColor)

		solid({ outline, shapeColorIndex })

		expect(app.fill).not.toHaveBeenCalled()
	})
})
