import { PageElement, scaleElement, to } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element: PageElement = buildMockElement()
		element.style = {}

		scaleElement.main({ element, dimensions: to.Dimensions([ 400, 500 ]) })

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
