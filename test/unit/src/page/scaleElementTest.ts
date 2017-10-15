import scaleElement from '../../../../src/page/scaleElement'
import Dimensions from '../../../../src/page/types/Dimensions'
import buildMockElement from '../../helpers/buildMockElement'

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element = buildMockElement()

		scaleElement({ element, dimensions: [ 400, 500 ] as Dimensions })

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
