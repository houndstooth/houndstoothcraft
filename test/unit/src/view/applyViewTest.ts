import * as to from '../../../../src/utilities/to'
import * as applyScroll from '../../../../src/view/applyScroll'
import * as applyTilt from '../../../../src/view/applyTilt'
import { applyView } from '../../../../src/view/applyView'
import * as applyZoom from '../../../../src/view/applyZoom'

describe('adjusts path for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline = to.Outline([ [ 3, 4 ], [ 5, 6 ] ])
		const path = to.Path([ [ 3, 4 ], [ 5, 6 ] ])

		const zoomedPath = to.Path([])
		const zoomedAndScrolledPath = to.Path([])
		const zoomedAndScrolledAndTiltedPath = to.Path([])

		spyOn(applyZoom, 'applyZoom').and.returnValue(zoomedPath)
		spyOn(applyScroll, 'applyScroll').and.returnValue(zoomedAndScrolledPath)
		spyOn(applyTilt, 'applyTilt').and.returnValue(zoomedAndScrolledAndTiltedPath)

		const actualPath = applyView(outline)

		expect(applyZoom.applyZoom).toHaveBeenCalledWith(path)
		expect(applyScroll.applyScroll).toHaveBeenCalledWith(zoomedPath)
		expect(applyTilt.applyTilt).toHaveBeenCalledWith(zoomedAndScrolledPath)
		expect(actualPath).toBe(zoomedAndScrolledAndTiltedPath)
	})
})
