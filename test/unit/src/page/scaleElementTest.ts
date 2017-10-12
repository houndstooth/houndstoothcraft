import scaleElement from '../../../../src/page/scaleElement'

describe('set element dimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element = { style: {} } as HTMLElement

		scaleElement({ element, dimensions: [ 400, 500 ] })

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
