import setupCanvasContainer from '../../../src/render/setupCanvasContainer'
import deleteElementIfExists from '../../../src/interface/deleteElementIfExists'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer()

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer.isSameNode(realCanvasContainer)).toBe(true)
	})
})
