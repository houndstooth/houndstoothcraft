import { ShapeColorIndex } from '../../../../src/components'
import { solid } from '../../../../src/components/solid'
import * as render from '../../../../src/render'
import Spy = jasmine.Spy
import { Outline } from '../../../../src/space'
import * as to from '../../../../src/utilities/to'

describe('solid', () => {
	const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(8)
	const outline: Outline = to.Outline([])

	const shapeColor: render.Color = { a: 1 }
	const transparentColor: render.Color = { a: 0 }

	let getColorSpy: Spy
	beforeEach(() => {
		spyOn(render, 'fill')
		getColorSpy = spyOn(render, 'getColor').and.returnValue(shapeColor)
	})

	it('gets the color from the pattern\'s color set, using the provided index', () => {
		solid({ outline, shapeColorIndex })

		expect(render.getColor).toHaveBeenCalledWith({ index: shapeColorIndex })
	})

	it('when the color is not completely transparent, it renders', () => {
		solid({ outline, shapeColorIndex })

		expect(render.fill).toHaveBeenCalledWith({ outline, shapeColor })
	})

	it('when the color turns out to be completely transparent, it does not render', () => {
		getColorSpy.and.returnValue(transparentColor)

		solid({ outline, shapeColorIndex })

		expect(render.fill).not.toHaveBeenCalled()
	})
})
