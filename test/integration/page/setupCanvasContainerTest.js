import setupCanvasContainer from '../../../src/page/setupCanvasContainer'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer()

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer).toBe(realCanvasContainer)
	})
})
