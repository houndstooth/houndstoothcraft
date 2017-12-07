import { Dimensions, PageElement, scaleElement, to } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (_: { dimensions: Dimensions, element: PageElement }) => void = scaleElement.default

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element: PageElement = buildMockElement()
		element.style = {}

		subject({ element, dimensions: to.Dimensions([ 400, 500 ]) })

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
