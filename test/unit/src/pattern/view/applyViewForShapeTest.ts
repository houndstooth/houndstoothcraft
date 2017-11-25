import { applyScroll, applyTilt, applyViewForShape, applyZoom, Outline, Path, to } from '../../../../../src'

describe('adjusts a shape\'s path for view', () => {
	it('applies any relevant zoom, scroll, and tilt', () => {
		const outline: Outline = to.Outline([ [ 3, 4 ], [ 5, 6 ] ])
		const path: Path = to.Path([ [ 3, 4 ], [ 5, 6 ] ])

		const zoomedPath: Path = to.Path([])
		const zoomedAndScrolledPath: Path = to.Path([])
		const zoomedAndScrolledAndTiltedPath: Path = to.Path([])

		spyOn(applyZoom, 'main').and.returnValue(zoomedPath)
		spyOn(applyScroll, 'main').and.returnValue(zoomedAndScrolledPath)
		spyOn(applyTilt, 'main').and.returnValue(zoomedAndScrolledAndTiltedPath)

		const actualPath: Path = applyViewForShape.main(outline)

		expect(applyZoom.main).toHaveBeenCalledWith(path)
		expect(applyScroll.main).toHaveBeenCalledWith(zoomedPath)
		expect(applyTilt.main).toHaveBeenCalledWith(zoomedAndScrolledPath)
		expect(actualPath).toBe(zoomedAndScrolledAndTiltedPath)
	})
})
