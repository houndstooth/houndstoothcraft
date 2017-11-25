import { applyViewForShape, buildPath, clipPath, Outline, Path, setClip, to } from '../../../../../src'

describe('set clip', () => {
	it('builds a path from the outline and clips the context on it', () => {
		const path: Path = to.Path([])
		spyOn(applyViewForShape, 'main').and.returnValue(path)
		spyOn(buildPath, 'main')
		spyOn(clipPath, 'main')
		const outline: Outline = to.Outline([])

		setClip.main({ outline })

		expect(applyViewForShape.main).toHaveBeenCalledWith(outline)
		expect(buildPath.main).toHaveBeenCalledWith({ path })
		expect(clipPath.main).toHaveBeenCalled()
	})
})
