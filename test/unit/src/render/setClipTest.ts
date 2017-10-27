import * as buildPath from '../../../../src/render/buildPath'
import * as clipPath from '../../../../src/render/clipPath'
import { setClip } from '../../../../src/render/setClip'
import { Path } from '../../../../src/render/types/Path'
import { Outline } from '../../../../src/space/types/Outline'
import * as to from '../../../../src/utilities/to'
import * as view from '../../../../src/view'

describe('set clip', () => {
	it('builds a path from the outline and clips the context on it', () => {
		const path: Path = to.Path([])
		spyOn(view, 'applyView').and.returnValue(path)
		spyOn(buildPath, 'buildPath')
		spyOn(clipPath, 'clipPath')
		const outline: Outline = to.Outline([])

		setClip({ outline })

		expect(view.applyView).toHaveBeenCalledWith(outline)
		expect(buildPath.buildPath).toHaveBeenCalledWith({ path })
		expect(clipPath.clipPath).toHaveBeenCalled()
	})
})
