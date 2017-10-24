import { texture } from '../../../../src/components/texture'
import * as render from '../../../../src/render'
import * as to from '../../../../src/utilities/to'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(render, 'setClip')
		spyOn(render, 'resetClip')

		const shapeColorCount = 2
		const tileOrigin = to.Coordinate([])
		const tileSize = to.Unit(11)
		const shapeColorIndex = to.ShapeColorIndex(3)
		const outline = to.Outline([])
		const executeTexture = jasmine.createSpy('executeTexture')

		texture({ outline, executeTexture, shapeColorCount, shapeColorIndex, tileOrigin, tileSize })

		expect(render.setClip).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, shapeColorCount, tileOrigin, tileSize })
		expect(render.resetClip).toHaveBeenCalled()
	})
})
