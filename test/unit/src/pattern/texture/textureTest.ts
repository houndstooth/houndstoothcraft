import { Outline, resetClip, setClip, ShapeColorIndex, texture, TextureParams, to, Unit } from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

const subject: (_: TextureParams) => void = texture.default

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		spyOn(setClip, 'default')
		spyOn(resetClip, 'default')

		const tileSize: Unit = to.Unit(11)
		const shapeColorIndex: ShapeColorIndex = to.ShapeColorIndex(3)
		const outline: Outline = to.Outline([])
		const executeTexture: Spy = jasmine.createSpy('executeTexture')

		subject({ outline, executeTexture, shapeColorIndex, tileSize })

		expect(setClip.default).toHaveBeenCalledWith({ outline })
		expect(executeTexture).toHaveBeenCalledWith({ shapeColorIndex, tileSize })
		expect(resetClip.default).toHaveBeenCalled()
	})
})
