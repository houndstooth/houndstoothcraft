import {
	applyScroll,
	applyTilt,
	applyViewForShape,
	applyZoom,
	Outline,
	Path,
	to,
} from '../../../../../src/indexForTest'

describe('adjusts a shape\'s path for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const subject: (_: Outline) => Path = applyViewForShape.default
		const outline: Outline = to.Outline([ [ 3, 4 ], [ 5, 6 ] ])
		const path: Path = to.Path([ [ 3, 4 ], [ 5, 6 ] ])

		const zoomedPath: Path = to.Path([])
		const zoomedAndTiltedPath: Path = to.Path([])
		const zoomedAndTiltedAndScrolledPath: Path = to.Path([])

		spyOn(applyZoom, 'default').and.returnValue(zoomedPath)
		spyOn(applyTilt, 'default').and.returnValue(zoomedAndTiltedPath)
		spyOn(applyScroll, 'default').and.returnValue(zoomedAndTiltedAndScrolledPath)

		const actualPath: Path = subject(outline)

		expect(applyZoom.default).toHaveBeenCalledWith(path)
		expect(applyTilt.default).toHaveBeenCalledWith(zoomedPath)
		expect(applyScroll.default).toHaveBeenCalledWith(zoomedAndTiltedPath)
		expect(actualPath).toBe(zoomedAndTiltedAndScrolledPath)
	})
})
