import { applyViewForShape, buildPath, clipPath, Outline, Path, setClip, to } from '../../../../../src/indexForTest'


describe('set clip', () => {
	it('builds a path from the outline and clips the context on it', () => {
		const subject: (_: { outline: Outline }) => void = setClip.default
		const path: Path = to.Path([])
		spyOn(applyViewForShape, 'default').and.returnValue(path)
		spyOn(buildPath, 'default')
		spyOn(clipPath, 'default')
		const outline: Outline = to.Outline([])

		subject({ outline })

		expect(applyViewForShape.default).toHaveBeenCalledWith(outline)
		expect(buildPath.default).toHaveBeenCalledWith({ path })
		expect(clipPath.default).toHaveBeenCalled()
	})
})
