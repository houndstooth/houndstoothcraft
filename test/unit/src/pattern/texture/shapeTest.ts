import { setSetting } from '../../../../../src/app/store/setSetting'
import { ShapeColorIndex } from '../../../../../src/pattern/color/types'
import { Unit } from '../../../../../src/pattern/grid/types'
import Spy = jasmine.Spy
import { Coordinate, Outline, OutlineOptions } from '../../../../../src/pattern/stripe'
import { shape } from '../../../../../src/pattern/texture/shape'
import * as solid from '../../../../../src/pattern/texture/solid'
import * as texture from '../../../../../src/pattern/texture/texture'
import * as to from '../../../../../src/to'
import * as codeUtilities from '../../../../../src/utilities/codeUtilities'
import { noop } from '../../../../../src/utilities/noop'
import { NullarySideEffector } from '../../../../../src/utilities/types'

describe('shape', () => {
	const tileOrigin: Coordinate = to.Coordinate([ 11, 13 ])
	const tileSize: Unit = to.Unit(45)
	const shapeColorIndices: ShapeColorIndex[] = to.ShapeColorIndices([])
	const stripeIndex: number = 7
	const shapeColorIndex: number = 45
	const outlineOptions: OutlineOptions = { stripeStart: to.StripePosition(0), stripeEnd: to.StripePosition(1) }

	let getOutlineSpy: Spy

	beforeEach(() => {
		getOutlineSpy = jasmine.createSpy('getOutlineSpy')

		spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)
		spyOn(texture, 'texture')
		spyOn(solid, 'solid')
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
		const outline: Outline = to.Outline([])
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

		describe('when an executeTexture method is supplied', () => {
			const executeTexture: NullarySideEffector = noop
			beforeEach(() => {
				setSetting('textureSettings', { executeTexture })
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
					executeTexture,
					outline,
					shapeColorIndex,
					tileSize,
				})
			})
		})

		describe('when an executeTexture method is not supplied', () => {
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
						outline,
						shapeColorIndex,
					}),
				)
			})
		})
	})
})