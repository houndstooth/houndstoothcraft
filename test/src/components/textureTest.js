import texture from '../../../src/components/texture'
import renderUtilities from '../../../src/utilities/renderUtilities'

describe('texture', () => {
	it('builds a path from the outline, clips the context on it, renders the texture, then resets the clip', () => {
		const calls = []
		spyOn(renderUtilities, 'buildPath').and.callFake(args => calls.push({ call: 'buildPath', args }))
		spyOn(renderUtilities, 'clipPath').and.callFake(args => calls.push({ call: 'clipPath', args }))
		spyOn(renderUtilities, 'resetClip').and.callFake(args => calls.push({ call: 'resetClip', args }))

		const context = {}
		const tileColors = []
		const tileOrigin = []
		const tileSize = 11
		const colorsIndex = 3
		const outline = []
		const renderTexture = args => calls.push({ call: 'renderTexture', args })

		texture({ context, tileColors, tileOrigin, tileSize, colorsIndex, outline, renderTexture })

		expect(calls).toEqual([
			{ call: 'buildPath', args: { context, outline } },
			{ call: 'clipPath', args: { context } },
			{ call: 'renderTexture', args: { tileColors, tileOrigin, tileSize, colorsIndex } },
			{ call: 'resetClip', args: { context } },
		])
	})
})
