import applyView from '../../../src/view/applyView'

describe('adjusts outline for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline = []
		const zoomedOutline = []
		const zoomedAndScrolledOutline = []
		const zoomedAndScrolledAndTiltedOutline = []

		const applyZoomSpy = jasmine.createSpy().and.returnValue(zoomedOutline)
		applyView.__Rewire__('applyZoom', applyZoomSpy)
		const applyScrollSpy = jasmine.createSpy().and.returnValue(zoomedAndScrolledOutline)
		applyView.__Rewire__('applyScroll', applyScrollSpy)
		const applyTiltSpy = jasmine.createSpy().and.returnValue(zoomedAndScrolledAndTiltedOutline)
		applyView.__Rewire__('applyTilt', applyTiltSpy)

		const actualOutline = applyView(outline, { tileOrigin: [], tileSize: 3 })

		expect(applyZoomSpy).toHaveBeenCalledWith(outline)
		expect(applyScrollSpy).toHaveBeenCalledWith(zoomedOutline)
		expect(applyTiltSpy).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(zoomedAndScrolledAndTiltedOutline)
	})
})
