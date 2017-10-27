import * as getShapeColorIndices from '../../../../src/components/getShapeColorIndices'
import * as getStripePositionsForTile from '../../../../src/components/getStripePositionsForTile'
import * as getTileOriginAndSize from '../../../../src/components/getTileOriginAndSize'
import * as isTileUniform from '../../../../src/components/isTileUniform'
import * as shape from '../../../../src/components/shape'
import { tile } from '../../../../src/components/tile'
import CallInfo = jasmine.CallInfo
import { Address } from '../../../../src/components/types/Address'
import { ShapeColorIndex } from '../../../../src/components/types/ShapeColorIndex'
import { StripePosition } from '../../../../src/components/types/StripePosition'
import Spy = jasmine.Spy
import { Unit } from '../../../../src/components/types/Unit'
import { PERIMETER_SCALAR } from '../../../../src/constants'
import * as space from '../../../../src/space'
import { Coordinate } from '../../../../src/space/types/Coordinate'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'

describe('tile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])
	let shapeSpy: Spy
	let getShapeColorIndicesSpy: Spy
	let isTileUniformSpy: Spy
	beforeEach(() => {
		shapeSpy = spyOn(shape, 'shape')
		spyOn(space, 'squareOutline')
		spyOn(space, 'stripeOutline')
		getShapeColorIndicesSpy = spyOn(getShapeColorIndices, 'getShapeColorIndices')
		isTileUniformSpy = spyOn(isTileUniform, 'isTileUniform')
	})

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin: undefined, tileSize: 10 })
		})

		it('returns early, not getting colors', () => {
			tile({ gridAddress })

			expect(getShapeColorIndices.getShapeColorIndices).not.toHaveBeenCalled()
		})
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile: StripePosition[]
		let shapeColorIndices: ShapeColorIndex[]
		let tileOrigin: Coordinate
		let tileSize: Unit
		beforeEach(() => {
			tileOrigin = to.Coordinate([ 7, 11 ])
			tileSize = to.Unit(13)
			spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = to.StripePositions([ 0, 0.5, 1, 1.5 ])
			spyOn(getStripePositionsForTile, 'getStripePositionsForTile').and.returnValue(stripePositionsForTile)

			state.mainHoundstooth.basePattern.tileSettings = {}

			shapeColorIndices = []
			getShapeColorIndicesSpy.and.returnValue(shapeColorIndices)
		})

		it('gets colors', () => {
			tile({ gridAddress })

			expect(getShapeColorIndices.getShapeColorIndices).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				setSetting('collapseSameColoredShapesWithinTile', true)
			})

			it('checks if the tile is uniform', () => {
				tile({ gridAddress })

				expect(isTileUniformSpy).toHaveBeenCalledWith({ shapeColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile({ gridAddress })

					expect(getStripePositionsForTile.getStripePositionsForTile).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the correct arguments, and uses square outline', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: space.squareOutline,
						gridAddress,
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
					tile({ gridAddress })

					expect(getStripePositionsForTile.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile({ gridAddress })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})

				it('converts the tile into shapes with the correct arguments, and uses the shape outline', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: space.stripeOutline,
						gridAddress,
						shapeColorIndices,
						tileOrigin,
						tileSize,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					tile({ gridAddress })

					const shapes: CallInfo[] = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					tile({ gridAddress })

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

				tile({ gridAddress })

				expect(getStripePositionsForTile.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: space.stripeOutline }))
			})
		})
	})
})
