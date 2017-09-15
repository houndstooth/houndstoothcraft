import setupCanvasContainer from '../../../src/page/setupCanvasContainer'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer({ canvasSize: [ 400, 500 ] })

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer).toBe(realCanvasContainer)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		setupCanvasContainer({ canvasSize: [ 400, 500 ] })

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.style.width).toBe('400px')
		expect(canvasContainer.style.height).toBe('500px')
	})
})
