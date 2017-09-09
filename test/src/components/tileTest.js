import tile from '../../../src/components/tile'
import { PERIMETER_SCALAR } from '../../../src/constants'
import state from '../../../state'
import render from '../../../src/render'
import outlines from '../../../src/outlines'

describe('tile', () => {
	const gridAddress = [ 3, 5 ]

	let shapeSpy
	let squareOutlineSpy
	let stripeOutlineSpy

	let getTileColorIndicesSpy
	let isTileUniformSpy

	beforeEach(() => {
		shapeSpy = spyOn(render, 'shape')
		squareOutlineSpy = spyOn(outlines, 'squareOutline')
		stripeOutlineSpy = spyOn(outlines, 'stripeOutline')

		getTileColorIndicesSpy = jasmine.createSpy()
		tile.__Rewire__('getTileColorIndices', getTileColorIndicesSpy)
		isTileUniformSpy = jasmine.createSpy()
		tile.__Rewire__('isTileUniform', isTileUniformSpy)
	})

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			const getTileOriginAndSizeSpy = jasmine.createSpy().and.returnValue({ tileOrigin: null, tileSize: 10 })
			tile.__Rewire__('getTileOriginAndSize', getTileOriginAndSizeSpy)
		})

		it('returns early, not getting colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndicesSpy).not.toHaveBeenCalled()
		})
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile
		let tileColorIndices
		let tileOrigin
		let tileSize
		let getStripePositionsForTileSpy
		beforeEach(() => {
			tileOrigin = [ 7, 11 ]
			tileSize = 13
			const getTileOriginAndSizeSpy = jasmine.createSpy().and.returnValue({ tileOrigin, tileSize })
			tile.__Rewire__('getTileOriginAndSize', getTileOriginAndSizeSpy)

			stripePositionsForTile = [ 0, 0.5, 1, 1.5 ]
			getStripePositionsForTileSpy = jasmine.createSpy().and.returnValue(stripePositionsForTile)
			tile.__Rewire__('getStripePositionsForTile', getStripePositionsForTileSpy)

			state.mainHoundstooth.basePattern.tileSettings = {}

			tileColorIndices = []
			getTileColorIndicesSpy.and.returnValue(tileColorIndices)
		})

		it('gets colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndicesSpy).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				state.mainHoundstooth.basePattern.tileSettings.collapseSameColoredShapesWithinTile = true
			})

			it('checks if the tile is uniform', () => {
				tile({ gridAddress })

				expect(isTileUniformSpy).toHaveBeenCalledWith({ tileColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile({ gridAddress })

					expect(getStripePositionsForTileSpy).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the grid address, colors, origin, and size for the tile, and uses square outline', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColorIndices,
						tileOrigin,
						tileSize,
						getOutline: squareOutlineSpy,
					}))
				})
			})

			describe('when the tile is not uniform', () => {
				beforeEach(() => {
					isTileUniformSpy.and.returnValue(false)
				})

				it('looks for stripe positions', () => {
					tile({ gridAddress })

					expect(getStripePositionsForTileSpy).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile({ gridAddress })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})


				it('converts the tile into shapes with the grid address, colors, origin, and size for the tile, and uses the shape outline', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColorIndices,
						tileOrigin,
						tileSize,
						getOutline: stripeOutlineSpy,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					tile({ gridAddress })

					const shapes = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					tile({ gridAddress })

					const shapes = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeStart: stripePositionsForTile[ 0 ],
							stripeEnd: stripePositionsForTile[ 1 ],
						},
					}))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeStart: stripePositionsForTile[ 1 ],
							stripeEnd: stripePositionsForTile[ 2 ],
						},
					}))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeStart: stripePositionsForTile[ 2 ],
							stripeEnd: stripePositionsForTile[ 3 ],
						},
					}))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({
						outlineOptions: {
							stripeStart: stripePositionsForTile[ 3 ],
							stripeEnd: PERIMETER_SCALAR,
						},
					}))
				})
			})
		})

		describe('when collapsing same colored shapes within tile is not enabled', () => {
			beforeEach(() => {
				state.mainHoundstooth.basePattern.tileSettings.collapseSameColoredShapesWithinTile = false
			})

			it('always calculates stripes and calls shape once for each one, even if the tile is uniform', () => {
				isTileUniformSpy.and.returnValue(true)

				tile({ gridAddress })

				expect(getStripePositionsForTileSpy).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripeOutlineSpy }))
			})
		})
	})
})
