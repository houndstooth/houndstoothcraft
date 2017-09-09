import applyView from '../../../src/outlines/applyView'

describe('adjusts outline for view', () => {
	it('applies any relevant zoom, scroll, and rotation', () => {
		const tileOrigin = []
		const tileSize = 45

		const outline = []
		const zoomedAndScrolledOutline = []
		const rotatedOutline = []

		const applyZoomAndScrollSpy = jasmine.createSpy().and.returnValue(zoomedAndScrolledOutline)
		applyView.__Rewire__('applyZoomAndScroll', applyZoomAndScrollSpy)
		const rotateOutlineAboutCanvasCenterSpy = jasmine.createSpy().and.returnValue(rotatedOutline)
		applyView.__Rewire__('rotateOutlineAboutCanvasCenter', rotateOutlineAboutCanvasCenterSpy)

		const actualOutline = applyView(outline, { tileOrigin, tileSize })

		expect(applyZoomAndScrollSpy).toHaveBeenCalledWith(outline)
		expect(rotateOutlineAboutCanvasCenterSpy).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(rotatedOutline)
	})
})
