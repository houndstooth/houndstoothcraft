import applyView from '../../../src/render/applyView'
import viewUtilities from '../../../src/utilities/viewUtilities'

describe('adjusts outline for view', () => {
	it('applies any relevant zoom, scroll, and rotation', () => {
		const tileOrigin = []
		const tileSize = 45

		const outline = []
		const zoomedAndScrolledOutline = []
		const rotatedOutline = []

		spyOn(viewUtilities, 'applyZoomAndScroll').and.returnValue(zoomedAndScrolledOutline)
		spyOn(viewUtilities, 'rotateOutlineAboutCanvasCenter').and.returnValue(rotatedOutline)
		const actualOutline = applyView(outline, { tileOrigin, tileSize })

		expect(viewUtilities.applyZoomAndScroll).toHaveBeenCalledWith(outline)
		expect(viewUtilities.rotateOutlineAboutCanvasCenter).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(rotatedOutline)
	})
})
