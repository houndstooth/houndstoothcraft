import { Path } from '../../../../../src/app/render'
import * as buildPath from '../../../../../src/app/render/buildPath'
import * as clipPath from '../../../../../src/app/render/clipPath'
import { setClip } from '../../../../../src/app/render/setClip'
import * as pattern from '../../../../../src/pattern'
import { Outline } from '../../../../../src/pattern/stripe'
import * as to from '../../../../../src/to'

describe('set clip', () => {
	it('builds a path from the outline and clips the context on it', () => {
		const path: Path = to.Path([])
		spyOn(pattern, 'applyViewForShape').and.returnValue(path)
		spyOn(buildPath, 'buildPath')
		spyOn(clipPath, 'clipPath')
		const outline: Outline = to.Outline([])

		setClip({ outline })

		expect(pattern.applyViewForShape).toHaveBeenCalledWith(outline)
		expect(buildPath.buildPath).toHaveBeenCalledWith({ path })
		expect(clipPath.clipPath).toHaveBeenCalled()
	})
})
