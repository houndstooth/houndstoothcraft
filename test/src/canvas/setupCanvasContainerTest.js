import setupCanvasContainer from '../../../src/canvas/setupCanvasContainer'
import documentUtilities from '../../../src/utilities/documentUtilities'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		documentUtilities.deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer()

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer.isSameNode(realCanvasContainer)).toBe(true)
	})
})
