import { applyScroll, applyTilt, applyViewForShape, applyZoom, Outline, Path, to } from '../../../../../src'

const subject: (_: Outline) => Path = applyViewForShape.default

describe('adjusts a shape\'s path for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline: Outline = to.Outline([ [ 3, 4 ], [ 5, 6 ] ])
		const path: Path = to.Path([ [ 3, 4 ], [ 5, 6 ] ])

		const zoomedPath: Path = to.Path([])
		const zoomedAndScrolledPath: Path = to.Path([])
		const zoomedAndScrolledAndTiltedPath: Path = to.Path([])

		spyOn(applyZoom, 'default').and.returnValue(zoomedPath)
		spyOn(applyScroll, 'default').and.returnValue(zoomedAndScrolledPath)
		spyOn(applyTilt, 'default').and.returnValue(zoomedAndScrolledAndTiltedPath)

		const actualPath: Path = subject(outline)

		expect(applyZoom.default).toHaveBeenCalledWith(path)
		expect(applyScroll.default).toHaveBeenCalledWith(zoomedPath)
		expect(applyTilt.default).toHaveBeenCalledWith(zoomedAndScrolledPath)
		expect(actualPath).toBe(zoomedAndScrolledAndTiltedPath)
	})
})
