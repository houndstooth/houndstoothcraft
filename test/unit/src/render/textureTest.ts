import { ShapeColorIndex, Unit } from '../../../../src/components'
import { texture } from '../../../../src/components/texture'
import * as render from '../../../../src/render'
import { Outline } from '../../../../src/space'
import Spy = jasmine.Spy
import * as to from '../../../../src/utilities/to'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(render, 'setClip')
		spyOn(render, 'resetClip')

		const tileSize: Unit = to.Unit(11)
		const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(3)
		const outline: Outline = to.Outline([])
		const executeTexture: Spy = jasmine.createSpy('executeTexture')

		texture({ outline, executeTexture, shapeColorIndex, tileSize })

		expect(render.setClip).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, tileSize })
		expect(render.resetClip).toHaveBeenCalled()
	})
})
