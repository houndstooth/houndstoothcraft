import texture from '../../../src/components/texture'
import renderUtilities from '../../../src/utilities/renderUtilities'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		const calls = []
		spyOn(renderUtilities, 'buildPath').and.callFake(args => calls.push({ call: 'buildPath', args }))
		spyOn(renderUtilities, 'clipPath').and.callFake(args => calls.push({ call: 'clipPath', args }))
		spyOn(renderUtilities, 'resetClip').and.callFake(args => calls.push({ call: 'resetClip', args }))

		const context = {}
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
