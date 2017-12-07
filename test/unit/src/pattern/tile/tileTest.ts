import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import {
	Address,
	constants,
	Coordinate,
	getShapeColorIndices,
	getStripePositionsForTile,
	getTileOriginAndSize,
	isTileUniform,
	shape,
	ShapeColorIndex,
	squareOutline,
	stripeOutline,
	StripePosition,
	tile,
	to,
	Unit,
} from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

const { PERIMETER_SCALAR } = constants

describe('tile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])
	const tileOrigin: Coordinate = to.Coordinate([ 7, 11 ])
	const tileSize: Unit = to.Unit(13)
	let shapeSpy: Spy
	let getShapeColorIndicesSpy: Spy
	let isTileUniformSpy: Spy
	beforeEach(() => {
		shapeSpy = spyOn(shape, 'default')
		spyOn(squareOutline, 'default')
		spyOn(stripeOutline, 'default')
		getShapeColorIndicesSpy = spyOn(getShapeColorIndices, 'default')
		isTileUniformSpy = spyOn(isTileUniform, 'default')
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile: StripePosition[]
		let shapeColorIndices: ShapeColorIndex[]
		beforeEach(() => {
			spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = to.StripePositions([ 0, 0.5, 1, 1.5 ])
			spyOn(getStripePositionsForTile, 'default').and.returnValue(stripePositionsForTile)

			setPatternStateForTest('tileSettings', {})

			shapeColorIndices = []
			getShapeColorIndicesSpy.and.returnValue(shapeColorIndices)
		})

		it('gets colors', () => {
			tile.default({ gridAddress, tileOrigin, tileSize })

			expect(getShapeColorIndices.default).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				setPatternStateForTest('collapseSameColoredShapesWithinTile', true)
			})

			it('checks if the tile is uniform', () => {
				tile.default({ gridAddress, tileOrigin, tileSize })

				expect(isTileUniformSpy).toHaveBeenCalledWith({ shapeColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

					expect(getStripePositionsForTile.default).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the correct arguments, and uses square outline', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: squareOutline.default,
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
					tile.default({ gridAddress, tileOrigin, tileSize })

					expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})

				it('converts the tile into shapes with the correct arguments, and uses the shape outline', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: stripeOutline.default,
						shapeColorIndices,
						tileOrigin,
						tileSize,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

					const shapes: CallInfo[] = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					tile.default({ gridAddress, tileOrigin, tileSize })

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
				setPatternStateForTest('collapseSameColoredShapesWithinTile', false)
			})

			it('always calculates stripes and calls shape once for each one, even if the tile is uniform', () => {
				isTileUniformSpy.and.returnValue(true)

				tile.default({ gridAddress, tileOrigin, tileSize })

				expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripeOutline.default }))
			})
		})
	})
})
