import setupCanvasContainer from '../../../src/canvas/setupCanvasContainer'
import deleteElementIfExists from '../../../src/canvas/deleteElementIfExists'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer()

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer.isSameNode(realCanvasContainer)).toBe(true)
	})
})
