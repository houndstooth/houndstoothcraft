import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import {
	Address,
	constants,
	Coordinate,
	DefinedTileParams,
	getShapeColorIndices,
	getStripePositionsForTile,
	getTileOriginAndSize,
	isTileUniform,
	patternState,
	shape,
	ShapeColorIndex,
	squareOutline,
	stripeOutline,
	StripePosition,
	tile,
	to,
	Unit,
} from '../../../../../src/indexForTest'

describe('tile', () => {
	const { PERIMETER_SCALAR } = constants
	let gridAddress: Address
	let tileOrigin: Coordinate
	let tileSize: Unit
	let shapeSpy: Spy
	let getShapeColorIndicesSpy: Spy
	let isTileUniformSpy: Spy
	let subject: (_: DefinedTileParams) => void

	beforeEach(() => {
		subject = tile.default
		gridAddress = to.Address([ 3, 5 ])
		tileOrigin = to.Coordinate([ 7, 11 ])
		tileSize = to.Unit(13)
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

			shapeColorIndices = []
			getShapeColorIndicesSpy.and.returnValue(shapeColorIndices)
		})

		it('gets colors', () => {
			subject({ gridAddress, tileOrigin, tileSize })

			expect(getShapeColorIndices.default).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				patternState.tileSettings.collapseSameColoredShapesWithinTile = true
			})

			it('checks if the tile is uniform', () => {
				subject({ gridAddress, tileOrigin, tileSize })

				expect(isTileUniformSpy).toHaveBeenCalledWith({ shapeColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					subject({ gridAddress, tileOrigin, tileSize })

					expect(getStripePositionsForTile.default).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the correct arguments, and uses square outline', () => {
					subject({ gridAddress, tileOrigin, tileSize })

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
					subject({ gridAddress, tileOrigin, tileSize })

					expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					subject({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})

				it('converts the tile into shapes with the correct arguments, and uses the shape outline', () => {
					subject({ gridAddress, tileOrigin, tileSize })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: stripeOutline.default,
						shapeColorIndices,
						tileOrigin,
						tileSize,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					subject({ gridAddress, tileOrigin, tileSize })

					const shapes: CallInfo[] = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					subject({ gridAddress, tileOrigin, tileSize })

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
				patternState.tileSettings.collapseSameColoredShapesWithinTile = false
			})

			it('always calculates stripes and calls shape once for each one, even if the tile is uniform', () => {
				isTileUniformSpy.and.returnValue(true)

				subject({ gridAddress, tileOrigin, tileSize })

				expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripeOutline.default }))
			})
		})
	})
})
