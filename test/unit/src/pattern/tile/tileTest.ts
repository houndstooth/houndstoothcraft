import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { setSetting } from '../../../../../src/app/store/setSetting'
import { PERIMETER_SCALAR } from '../../../../../src/constants'
import * as color from '../../../../../src/pattern/color'
import { ShapeColorIndex } from '../../../../../src/pattern/color/types'
import { Address, Unit } from '../../../../../src/pattern/grid/types'
import * as stripe from '../../../../../src/pattern/stripe'
import { StripePosition } from '../../../../../src/pattern/stripe/types'
import * as texture from '../../../../../src/pattern/texture'
import * as getTileOriginAndSize from '../../../../../src/pattern/tile/getTileOriginAndSize'
import { tile } from '../../../../../src/pattern/tile/tile'
import * as to from '../../../../../src/to'

describe('tile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])
	const tileOrigin: stripe.Coordinate = to.Coordinate([ 7, 11 ])
	const tileSize: Unit = to.Unit(13)
	let shapeSpy: Spy
	let getShapeColorIndicesSpy: Spy
	let isTileUniformSpy: Spy
	beforeEach(() => {
		shapeSpy = spyOn(texture, 'shape')
		spyOn(stripe, 'squareOutline')
		spyOn(stripe, 'stripeOutline')
		getShapeColorIndicesSpy = spyOn(color, 'getShapeColorIndices')
		isTileUniformSpy = spyOn(color, 'isTileUniform')
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile: StripePosition[]
		let shapeColorIndices: ShapeColorIndex[]
		beforeEach(() => {
			spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = to.StripePositions([ 0, 0.5, 1, 1.5 ])
			spyOn(stripe, 'getStripePositionsForTile').and.returnValue(stripePositionsForTile)

			setSetting('tileSettings', {})

			shapeColorIndices = []
			getShapeColorIndicesSpy.and.returnValue(shapeColorIndices)
		})

		it('gets colors', () => {
			tile({ gridAddress, tileOrigin, tileSize })

			expect(color.getShapeColorIndices).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				setSetting('collapseSameColoredShapesWithinTile', true)
			})

			it('checks if the tile is uniform', () => {
				tile({ gridAddress, tileOrigin, tileSize })

				expect(isTileUniformSpy).toHaveBeenCalledWith({ shapeColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					expect(stripe.getStripePositionsForTile).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the correct arguments, and uses square outline', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: stripe.squareOutline,
						shapeColorIndices,
						tileOrigin,
						tileSize,
					}))
				})
			})

			describe('when the tile is not uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(false)
				})

				it('looks for stripe positions', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					expect(stripe.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})

				it('converts the tile into shapes with the correct arguments, and uses the shape outline', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: stripe.stripeOutline,
						shapeColorIndices,
						tileOrigin,
						tileSize,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					const shapes: CallInfo[] = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					tile({ gridAddress, tileOrigin, tileSize })

					const shapes: CallInfo[] = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeEnd: stripePositionsForTile[ 1 ],
							stripeStart: stripePositionsForTile[ 0 ],
						},
					}))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeEnd: stripePositionsForTile[ 2 ],
							stripeStart: stripePositionsForTile[ 1 ],
						},
					}))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeEnd: stripePositionsForTile[ 3 ],
							stripeStart: stripePositionsForTile[ 2 ],
						},
					}))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeEnd: PERIMETER_SCALAR,
							stripeStart: stripePositionsForTile[ 3 ],
						},
					}))
				})
			})
		})

		describe('when collapsing same colored shapes within tile is not enabled', () => {
			beforeEach(() => {
				setSetting('collapseSameColoredShapesWithinTile', false)
			})

			it('always calculates stripes and calls shape once for each one, even if the tile is uniform', () => {
				isTileUniformSpy.and.returnValue(true)

				tile({ gridAddress, tileOrigin, tileSize })

				expect(stripe.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripe.stripeOutline }))
			})
		})
	})
})