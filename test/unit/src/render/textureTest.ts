import * as buildPath from '../../../../src/render/buildPath'
import * as clipPath from '../../../../src/render/clipPath'
import * as resetClip from '../../../../src/render/resetClip'
import { texture } from '../../../../src/render/texture'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		const calls = [] as any

		spyOn(buildPath, 'buildPath').and.callFake(args => calls.push({ call: 'buildPath', args }))
		spyOn(clipPath, 'clipPath').and.callFake(args => calls.push({ call: 'clipPath', args }))
		spyOn(resetClip, 'resetClip').and.callFake(args => calls.push({ call: 'resetClip', args }))

		const context = {}
		const tileColorIndices = [] as any
		const tileOrigin = [] as any
		const tileSize = 11 as any
		const shapeColorIndex = 3
		const outline = []
		const renderTexture = args => calls.push({ call: 'renderTexture', args })

		texture({ context, tileColorIndices, tileOrigin, tileSize, outline, renderTexture, shapeColorIndex })

		const expectedRenderTextureArgs = jasmine.objectContaining({
			context,
			shapeColorIndex,
			tileColorIndices,
			tileOrigin,
			tileSize,
		})
		expect(calls).toEqual([
			{ call: 'buildPath', args: { context, outline } },
			{ call: 'clipPath', args: { context } },
			{ call: 'renderTexture', args: expectedRenderTextureArgs },
			{ call: 'resetClip', args: { context } },
		])
	})
})
