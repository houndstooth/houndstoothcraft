import {
	Color,
	fill,
	getColor,
	Outline,
	ShapeColorIndex,
	solid,
	SolidParams,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy


describe('solid', () => {
	let subject: (_: SolidParams) => void
	let shapeColorIndex: ShapeColorIndex
	let outline: Outline

	const shapeColor: Color = { a: 1 }
	const transparentColor: Color = { a: 0 }

	let getColorSpy: Spy
	beforeEach(() => {
		subject = solid.default
		outline = to.Outline([])
		shapeColorIndex = to.ShapeColorIndex(8)
		spyOn(fill, 'default')
		getColorSpy = spyOn(getColor, 'default').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		subject({ outline, shapeColorIndex })

		expect(getColor.default).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	it('when the color is not completely transparent, it renders', () => {
		subject({ outline, shapeColorIndex })

		expect(fill.default).toHaveBeenCalledWith({ outline, shapeColor })
	})

	it('when the color turns out to be completely transparent, it does not render', () => {
		getColorSpy.and.returnValue(transparentColor)

		subject({ outline, shapeColorIndex })

		expect(fill.default).not.toHaveBeenCalled()
	})
})
