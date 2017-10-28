import { PageElement } from '../../../../src/page'
import { scaleElement } from '../../../../src/page/scaleElement'
import * as to from '../../../../src/utilities/to'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element: PageElement = buildMockElement()
		element.style = {}

		scaleElement({ element, dimensions: to.Dimensions([ 400, 500 ]) })

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
