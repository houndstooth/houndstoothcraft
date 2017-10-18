import * as applyScroll from '../../../../src/view/applyScroll'
import * as applyTilt from '../../../../src/view/applyTilt'
import { applyView } from '../../../../src/view/applyView'
import * as applyZoom from '../../../../src/view/applyZoom'

describe('adjusts outline for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline = []
		const zoomedOutline = []
		const zoomedAndScrolledOutline = []
		const zoomedAndScrolledAndTiltedOutline = []

		spyOn(applyZoom, 'applyZoom').and.returnValue(zoomedOutline)
		spyOn(applyScroll, 'applyScroll').and.returnValue(zoomedAndScrolledOutline)
		spyOn(applyTilt, 'applyTilt').and.returnValue(zoomedAndScrolledAndTiltedOutline)

		const actualOutline = applyView(outline)

		expect(applyZoom.applyZoom).toHaveBeenCalledWith(outline)
		expect(applyScroll.applyScroll).toHaveBeenCalledWith(zoomedOutline)
		expect(applyTilt.applyTilt).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(zoomedAndScrolledAndTiltedOutline)
	})
})
