import {
	codeUtilities,
	Coordinate,
	noop,
	NullarySideEffector,
	Outline,
	OutlineOptions,
	setSetting,
	shape,
	ShapeColorIndex,
	solid,
	texture,
	to,
	Unit,
} from '../../../../../src'
import Spy = jasmine.Spy

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
		spyOn(texture, 'default')
		spyOn(solid, 'default')
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => getOutlineSpy.and.returnValue(undefined))

		it('returns early, not rendering', () => {
			shape.default({
				getOutline: getOutlineSpy,
				outlineOptions,
				shapeColorIndices,
				stripeIndex,
				tileOrigin,
				tileSize,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(texture.default).not.toHaveBeenCalled()
			expect(solid.default).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline: Outline = to.Outline([])
		beforeEach(() => getOutlineSpy.and.returnValue(outline))

		it('gets the outline', () => {
			shape.default({
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
			shape.default({
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
			const executeTexture: NullarySideEffector = noop.default
			beforeEach(() => {
				setSetting.default('textureSettings', { executeTexture })
			})

			it('passes it to the texture component to be rendered', () => {
				shape.default({
					getOutline: getOutlineSpy,
					outlineOptions,
					shapeColorIndices,
					stripeIndex,
					tileOrigin,
					tileSize,
				})

				expect(texture.default).toHaveBeenCalledWith({
					executeTexture,
					outline,
					shapeColorIndex,
					tileSize,
				})
			})
		})

		describe('when an executeTexture method is not supplied', () => {
			it('passes it to the solid component to be rendered', () => {
				shape.default({
					getOutline: getOutlineSpy,
					outlineOptions,
					shapeColorIndices,
					stripeIndex,
					tileOrigin,
					tileSize,
				})

				expect(solid.default).toHaveBeenCalledWith(
					jasmine.objectContaining({
						outline,
						shapeColorIndex,
					}),
				)
			})
		})
	})
})
