import * as buildPath from '../../../../src/render/buildPath'
import * as clipPath from '../../../../src/render/clipPath'
import * as resetClip from '../../../../src/render/resetClip'
import { texture } from '../../../../src/render/texture'
import { Outline } from '../../../../src/space/types/Outline'
import * as to from '../../../../src/to'
import { MockContext } from '../../../types/MockContext'

interface ContextOrRenderTextureCall {
	call: string,
	context: MockContext,
	outline?: Outline,
}

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		const contextAndRenderTextureCallsOrder: ContextOrRenderTextureCall[] = []

		const fakeBuildPath = args => contextAndRenderTextureCallsOrder.push({ call: 'buildPath', ...args })
		const fakeClipPath = args => contextAndRenderTextureCallsOrder.push({ call: 'clipPath', ...args })
		const fakeResetClip = args => contextAndRenderTextureCallsOrder.push({ call: 'resetClip', ...args })
		const fakeRenderTexture = args => contextAndRenderTextureCallsOrder.push({ call: 'renderTexture', ...args })

		spyOn(buildPath, 'buildPath').and.callFake(fakeBuildPath)
		spyOn(clipPath, 'clipPath').and.callFake(fakeClipPath)
		spyOn(resetClip, 'resetClip').and.callFake(fakeResetClip)

		const context = {}
		const tileColorIndices = to.TileColorIndices([])
		const tileOrigin = to.Coordinate([])
		const tileSize = to.Unit(11)
		const shapeColorIndex = 3
		const outline = to.Outline([])

		texture({
			context,
			outline,
			renderTexture: fakeRenderTexture,
			shapeColorIndex,
			tileColorIndices,
			tileOrigin,
			tileSize,
		})

		const expectedContextAndRenderTextureCallsOrder = [
			{ call: 'buildPath', context, outline },
			{ call: 'clipPath', context },
			jasmine.objectContaining({
				call: 'renderTexture',
				context,
				shapeColorIndex,
				tileColorIndices,
				tileOrigin,
				tileSize,
			}),
			{ call: 'resetClip', context },
		] as any
		expect(contextAndRenderTextureCallsOrder).toEqual(expectedContextAndRenderTextureCallsOrder)
	})
})
