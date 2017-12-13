import {
	codeUtilities,
	Coordinate,
	Outline,
	OutlineOptions,
	patternState,
	resetClip,
	setClip,
	shape,
	ShapeColorIndex,
	ShapeParams,
	solid,
	to,
	Unit,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('shape', () => {
	let subject: (_: ShapeParams) => void
	let tileOrigin: Coordinate
	let tileSize: Unit
	let shapeColorIndices: ShapeColorIndex[]
	const stripeIndex: number = 7
	const shapeColorIndex: number = 45
	let outlineOptions: OutlineOptions

	let getOutlineSpy: Spy

	beforeEach(() => {
		tileOrigin = to.Coordinate([ 11, 13 ])
		tileSize = to.Unit(45)
		shapeColorIndices = to.ShapeColorIndices([])
		outlineOptions = { stripeStart: to.StripePosition(0), stripeEnd: to.StripePosition(1) }

		subject = shape.default
		getOutlineSpy = jasmine.createSpy('getOutlineSpy')

		spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)
		spyOn(solid, 'default')
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => getOutlineSpy.and.returnValue(undefined))

		it('returns early, not rendering', () => {
			subject({
				getOutline: getOutlineSpy,
				outlineOptions,
				shapeColorIndices,
				stripeIndex,
				tileOrigin,
				tileSize,
			})

			expect(getOutlineSpy).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(solid.default).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline: Outline = to.Outline([])
		beforeEach(() => getOutlineSpy.and.returnValue(outline))

		it('gets the outline', () => {
			subject({
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
			subject({
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
			let executeTextureSpy: Spy
			beforeEach(() => {
				executeTextureSpy = jasmine.createSpy('executeTexture')
				patternState.textureSettings.executeTexture = executeTextureSpy
			})

			it('calls it, in between setting and resetting the clip', () => {
				spyOn(setClip, 'default')
				spyOn(resetClip, 'default')

				subject({
					getOutline: getOutlineSpy,
					outlineOptions,
					shapeColorIndices,
					stripeIndex,
					tileOrigin,
					tileSize,
				})

				expect(setClip.default).toHaveBeenCalledWith({ outline })
				expect(executeTextureSpy).toHaveBeenCalledWith({ shapeColorIndex, tileSize })
				expect(resetClip.default).toHaveBeenCalled()
			})
		})

		describe('when an executeTexture method is not supplied', () => {
			it('passes it to the solid component to be rendered', () => {
				subject({
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
