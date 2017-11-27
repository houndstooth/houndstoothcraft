import { Outline, resetClip, setClip, ShapeColorIndex, texture, to, Unit } from '../../../../../src'
import Spy = jasmine.Spy

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(setClip, 'default')
		spyOn(resetClip, 'default')

		const tileSize: Unit = to.Unit(11)
		const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(3)
		const outline: Outline = to.Outline([])
		const executeTexture: Spy = jasmine.createSpy('executeTexture')

		texture.default({ outline, executeTexture, shapeColorIndex, tileSize })

		expect(setClip.default).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, tileSize })
		expect(resetClip.default).toHaveBeenCalled()
	})
})
