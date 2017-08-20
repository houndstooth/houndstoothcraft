import setupCanvasContainer from '../../../src/application/setupCanvasContainer'
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

describe('setup canvas container', () => {
	it('returns the canvas container it just put on the page', () => {
		interfaceUtilities.deleteElementIfExists('.canvas-container')

		const returnedCanvasContainer = setupCanvasContainer()

		const realCanvasContainer = document.querySelector('.canvas-container')
		expect(returnedCanvasContainer.isSameNode(realCanvasContainer)).toBe(true)
	})
})
