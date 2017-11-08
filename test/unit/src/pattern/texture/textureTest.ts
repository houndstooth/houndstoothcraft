import * as app from '../../../../../src/app'
import { ShapeColorIndex } from '../../../../../src/pattern/color/types'
import { Unit } from '../../../../../src/pattern/grid/types'
import { Outline } from '../../../../../src/pattern/stripe'
import { texture } from '../../../../../src/pattern/texture/texture'
import Spy = jasmine.Spy
import * as to from '../../../../../src/to'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(app, 'setClip')
		spyOn(app, 'resetClip')

		const tileSize: Unit = to.Unit(11)
		const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(3)
		const outline: Outline = to.Outline([])
		const executeTexture: Spy = jasmine.createSpy('executeTexture')

		texture({ outline, executeTexture, shapeColorIndex, tileSize })

		expect(app.setClip).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, tileSize })
		expect(app.resetClip).toHaveBeenCalled()
	})
})
