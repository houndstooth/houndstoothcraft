import shape from '../../../src/render/shape'
import * as codeUtilities from '../../../src/utilities/codeUtilities'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import * as canvas from '../../../src/canvas'
import * as texture from '../../../src/render/texture'
import * as solid from '../../../src/render/solid'
import noop from '../helpers/noop'

describe('shape', () => {
	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColorIndices = []
	const stripeIndex = 7
	const shapeColorIndex = 45
	const outlineOptions = {}

	const context = {}

	let getOutlineSpy

	beforeEach(() => {
		resetState(state)

		getOutlineSpy = jasmine.createSpy()

		spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)
		spyOn(texture, 'default')
		spyOn(solid, 'default')
		spyOn(canvas, 'getCurrentContext').and.returnValue(context)
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => getOutlineSpy.and.returnValue(null))

		it('returns early, not rendering', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline: getOutlineSpy,
				outlineOptions,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(texture.default).not.toHaveBeenCalled()
			expect(solid.default).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline = []
		beforeEach(() => getOutlineSpy.and.returnValue(outline))

		it('rotates the outline', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline: getOutlineSpy,
				outlineOptions,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({
				tileOrigin,
				tileSize,
				outlineOptions,
			})
		})

		it('gets the current context', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline: getOutlineSpy,
				outlineOptions,
			})

			expect(canvas.getCurrentContext).toHaveBeenCalled()
		})

		it('gets the index of the color in the central colorSet, from the array of such indicies for the tile, using the stripe index', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline: getOutlineSpy,
				outlineOptions,
			})

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({
				array: tileColorIndices,
				index: stripeIndex,
			})
		})

		describe('when a renderTexture method is supplied', () => {
			const renderTexture = noop
			beforeEach(() => {
				state.mainHoundstooth.basePattern.textureSettings = { renderTexture }
			})

			it('passes it to the texture component to be rendered', () => {
				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline: getOutlineSpy,
					outlineOptions,
				})

				expect(texture.default).toHaveBeenCalledWith({
					context,
					outline,
					tileColorIndices,
					tileOrigin,
					tileSize,
					renderTexture,
					shapeColorIndex,
				})
			})
		})

		describe('when a renderTexture method is not supplied', () => {
			it('passes it to the solid component to be rendered', () => {
				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline: getOutlineSpy,
					outlineOptions,
				})

				expect(solid.default).toHaveBeenCalledWith(
					jasmine.objectContaining({
						context,
						shapeColorIndex,
						outline,
						tileSize,
						tileOrigin,
					})
				)
			})
		})
	})
})
