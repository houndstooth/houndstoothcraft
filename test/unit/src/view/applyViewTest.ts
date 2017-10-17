import * as applyScroll from '../../../../src/view/applyScroll'
import * as applyTilt from '../../../../src/view/applyTilt'
import applyView from '../../../../src/view/applyView'
import * as applyZoom from '../../../../src/view/applyZoom'

describe('adjusts outline for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline = []
		const zoomedOutline = []
		const zoomedAndScrolledOutline = []
		const zoomedAndScrolledAndTiltedOutline = []

		spyOn(applyZoom, 'default').and.returnValue(zoomedOutline)
		spyOn(applyScroll, 'default').and.returnValue(zoomedAndScrolledOutline)
		spyOn(applyTilt, 'default').and.returnValue(zoomedAndScrolledAndTiltedOutline)

		const actualOutline = applyView(outline)

		expect(applyZoom.default).toHaveBeenCalledWith(outline)
		expect(applyScroll.default).toHaveBeenCalledWith(zoomedOutline)
		expect(applyTilt.default).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(zoomedAndScrolledAndTiltedOutline)
	})
})
