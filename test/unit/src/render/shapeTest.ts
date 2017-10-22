import * as canvas from '../../../../src/canvas'
import { shape } from '../../../../src/render/shape'
import * as solid from '../../../../src/render/solid'
import * as texture from '../../../../src/render/texture'
import { state } from '../../../../src/state'
import * as codeUtilities from '../../../../src/utilities/codeUtilities'
import * as to from '../../../../src/utilities/to'
import { noop } from '../../../helpers/noop'

describe('shape', () => {
	const tileOrigin = to.Coordinate([ 11, 13 ])
	const tileSize = to.Unit(45)
	const shapeColorIndices = to.ShapeColorIndices([])
	const stripeIndex = 7
	const shapeColorIndex = 45
	const outlineOptions = {}

	const context = {}

	let getOutlineSpy

	beforeEach(() => {
		getOutlineSpy = jasmine.createSpy('getOutlineSpy')

		spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)
		spyOn(texture, 'texture')
		spyOn(solid, 'solid')
		spyOn(canvas, 'getCurrentContext').and.returnValue(context)
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => getOutlineSpy.and.returnValue(undefined))

		it('returns early, not rendering', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				shapeColorIndices,
				stripeIndex,
				tileOrigin,
				tileSize,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(texture.texture).not.toHaveBeenCalled()
			expect(solid.solid).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline = []
		beforeEach(() => getOutlineSpy.and.returnValue(outline))

		it('gets the outline', () => {
			shape({
				getOutline: getOutlineSpy,
				outlineOptions,
				shapeColorIndices,
				stripeIndex,
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
				shapeColorIndices,
				stripeIndex,
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
				shapeColorIndices,
				stripeIndex,
				tileOrigin,
				tileSize,
			})

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({
				array: shapeColorIndices,
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
					getOutline: getOutlineSpy,
					outlineOptions,
					shapeColorIndices,
					stripeIndex,
					tileOrigin,
					tileSize,
				})

				expect(texture.texture).toHaveBeenCalledWith({
					context,
					outline,
					renderTexture,
					shapeColorCount: 0,
					shapeColorIndex,
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
					shapeColorIndices,
					stripeIndex,
					tileOrigin,
					tileSize,
				})

				expect(solid.solid).toHaveBeenCalledWith(
					jasmine.objectContaining({
						context,
						outline,
						shapeColorIndex,
					}),
				)
			})
		})
	})
})
