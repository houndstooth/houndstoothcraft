import { Path } from '../../../../src/render'
import { Outline } from '../../../../src/space'
import * as to from '../../../../src/utilities/to'
import * as applyScroll from '../../../../src/view/applyScroll'
import * as applyTilt from '../../../../src/view/applyTilt'
import { applyViewForShape } from '../../../../src/view/applyViewForShape'
import * as applyZoom from '../../../../src/view/applyZoom'

describe('adjusts a shape\'s path for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline: Outline = to.Outline([ [ 3, 4 ], [ 5, 6 ] ])
		const path: Path = to.Path([ [ 3, 4 ], [ 5, 6 ] ])

		const zoomedPath: Path = to.Path([])
		const zoomedAndScrolledPath: Path = to.Path([])
		const zoomedAndScrolledAndTiltedPath: Path = to.Path([])

		spyOn(applyZoom, 'applyZoom').and.returnValue(zoomedPath)
		spyOn(applyScroll, 'applyScroll').and.returnValue(zoomedAndScrolledPath)
		spyOn(applyTilt, 'applyTilt').and.returnValue(zoomedAndScrolledAndTiltedPath)

		const actualPath: Path = applyViewForShape(outline)

		expect(applyZoom.applyZoom).toHaveBeenCalledWith(path)
		expect(applyScroll.applyScroll).toHaveBeenCalledWith(zoomedPath)
		expect(applyTilt.applyTilt).toHaveBeenCalledWith(zoomedAndScrolledPath)
		expect(actualPath).toBe(zoomedAndScrolledAndTiltedPath)
	})
})
