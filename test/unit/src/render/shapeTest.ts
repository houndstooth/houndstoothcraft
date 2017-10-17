import * as canvas from '../../../../src/canvas'
import shape from '../../../../src/render/shape'
import * as solid from '../../../../src/render/solid'
import * as texture from '../../../../src/render/texture'
import Coordinate from '../../../../src/space/types/Coordinate'
import state from '../../../../src/state'
import * as codeUtilities from '../../../../src/utilities/codeUtilities'
import noop from '../../../helpers/noop'

describe('shape', () => {
	const tileOrigin = [ 11 as any, 13 as any ] as Coordinate
	const tileSize = 45 as any
	const tileColorIndices = [] as any
	const stripeIndex = 7
	const shapeColorIndex = 45
	const outlineOptions = {}

	const context = {}

	let getOutlineSpy

	beforeEach(() => {
		getOutlineSpy = jasmine.createSpy('getOutlineSpy')

		spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)
		spyOn(texture, 'default')
		spyOn(solid, 'default')
		spyOn(canvas, 'getCurrentContext').and.returnValue(context)
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => getOutlineSpy.and.returnValue(undefined))

		it('returns early, not rendering', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				stripeIndex,
				tileColorIndices,
				tileOrigin,
				tileSize,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(texture.default).not.toHaveBeenCalled()
			expect(solid.default).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline = []
		beforeEach(() => getOutlineSpy.and.returnValue(outline))

		it('gets the outline', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				stripeIndex,
				tileColorIndices,
				tileOrigin,
				tileSize,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({
				outlineOptions,
				tileOrigin,
				tileSize,
			})
		})

		it('gets the current context', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				stripeIndex,
				tileColorIndices,
				tileOrigin,
				tileSize,
			})

			expect(canvas.getCurrentContext).toHaveBeenCalled()
		})

		// tslint:disable-next-line:max-line-length
		it('gets the index of the color in the central colorSet, from the array of such indicies for the tile, using the stripe index', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				stripeIndex,
				tileColorIndices,
				tileOrigin,
				tileSize,
			})

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({
				array: tileColorIndices,
				index: stripeIndex,
			})
		})

		describe('when a renderTexture method is supplied', () => {
			const renderTexture = noop
			beforeEach(() => {
				const basePattern = state.mainHoundstooth.basePattern || {}
				basePattern.textureSettings = { renderTexture }
			})

			it('passes it to the texture component to be rendered', () => {
				shape({
					getOutline: getOutlineSpy,
					outlineOptions,
					stripeIndex,
					tileColorIndices,
					tileOrigin,
					tileSize,
				})

				expect(texture.default).toHaveBeenCalledWith({
					context,
					outline,
					renderTexture,
					shapeColorIndex,
					tileColorIndices,
					tileOrigin,
					tileSize,
				})
			})
		})

		describe('when a renderTexture method is not supplied', () => {
			it('passes it to the solid component to be rendered', () => {
				shape({
					getOutline: getOutlineSpy,
					outlineOptions,
					stripeIndex,
					tileColorIndices,
					tileOrigin,
					tileSize,
				})

				expect(solid.default).toHaveBeenCalledWith(
					jasmine.objectContaining({
						context,
						outline,
						shapeColorIndex,
						tileOrigin,
						tileSize,
					}),
				)
			})
		})
	})
})
