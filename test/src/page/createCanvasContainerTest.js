import createCanvasContainer from '../../../src/page/createCanvasContainer'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'

describe('create canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = createCanvasContainer({ canvasSize: [ 400, 500 ] })

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer).toBe(realCanvasContainer)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		createCanvasContainer({ canvasSize: [ 400, 500 ] })

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.style.width).toBe('400px')
		expect(canvasContainer.style.height).toBe('500px')
	})
})
