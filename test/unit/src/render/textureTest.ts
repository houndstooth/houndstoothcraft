import texture from '../../../../src/render/texture'
import * as buildPath from '../../../../src/render/buildPath'
import * as clipPath from '../../../../src/render/clipPath'
import * as resetClip from '../../../../src/render/resetClip'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		const calls = []

		spyOn(buildPath, 'default').and.callFake(args => calls.push({ call: 'buildPath', args }))
		spyOn(clipPath, 'default').and.callFake(args => calls.push({ call: 'clipPath', args }))
		spyOn(resetClip, 'default').and.callFake(args => calls.push({ call: 'resetClip', args }))

		const context = {} as CanvasRenderingContext2D
		const tileColorIndices = []
		const tileOrigin = []
		const tileSize = 11
		const shapeColorIndex = 3
		const outline = []
		const renderTexture = args => calls.push({ call: 'renderTexture', args })

		texture({ context, tileColorIndices, tileOrigin, tileSize, outline, renderTexture, shapeColorIndex })

		const expectedRenderTextureArgs = jasmine.objectContaining({
			context,
			tileColorIndices,
			tileOrigin,
			tileSize,
			shapeColorIndex,
		})
		expect(calls).toEqual([
			{ call: 'buildPath', args: { context, outline } },
			{ call: 'clipPath', args: { context } },
			{ call: 'renderTexture', args: expectedRenderTextureArgs },
			{ call: 'resetClip', args: { context } },
		])
	})
})
