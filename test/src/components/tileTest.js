import tile from '../../../src/components/tile'
import { PERIMETER_SCALAR } from '../../../src/constants'
import state from '../../../state'
import render from '../../../src/render'
import space from '../../../src/space'
import * as getTileOriginAndSize from '../../../src/components/getTileOriginAndSize'
import * as getStripePositionsForTile from '../../../src/components/getStripePositionsForTile'
import * as getTileColorIndices from '../../../src/components/getTileColorIndices'
import * as isTileUniform from '../../../src/components/isTileUniform'

describe('tile', () => {
	const gridAddress = [ 3, 5 ]

	beforeEach(() => {
		spyOn(render, 'shape')
		spyOn(space, 'squareOutline')
		spyOn(space, 'stripeOutline')
		spyOn(getTileColorIndices, 'default')
		spyOn(isTileUniform, 'default')
	})

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin: null, tileSize: 10 })
		})

		it('returns early, not getting colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndices.default).not.toHaveBeenCalled()
		})
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile
		let tileColorIndices
		let tileOrigin
		let tileSize
		beforeEach(() => {
			tileOrigin = [ 7, 11 ]
			tileSize = 13
			spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = [ 0, 0.5, 1, 1.5 ]
			spyOn(getStripePositionsForTile, 'default').and.returnValue(stripePositionsForTile)

			state.mainHoundstooth.basePattern.tileSettings = {}

			tileColorIndices = []
			getTileColorIndices.default.and.returnValue(tileColorIndices)
		})

		it('gets colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndices.default).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				state.mainHoundstooth.basePattern.tileSettings.collapseSameColoredShapesWithinTile = true
			})

			it('checks if the tile is uniform', () => {
				tile({ gridAddress })

				expect(isTileUniform.default).toHaveBeenCalledWith({ tileColorIndices })
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					isTileUniform.default.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile({ gridAddress })

					expect(getStripePositionsForTile.default).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the grid address, colors, origin, and size for the tile, and uses square outline', () => {
					tile({ gridAddress })

					expect(render.shape).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColorIndices,
						tileOrigin,
						tileSize,
						getOutline: space.squareOutline,
					}))
				})
			})

			describe('when the tile is not uniform', () => {
				beforeEach(() => {
					isTileUniform.default.and.returnValue(false)
				})

				it('looks for stripe positions', () => {
					tile({ gridAddress })

					expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile({ gridAddress })

					expect(render.shape.calls.all().length).toEqual(stripePositionsForTile.length)
				})


				it('converts the tile into shapes with the grid address, colors, origin, and size for the tile, and uses the shape outline', () => {
					tile({ gridAddress })

					expect(render.shape).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColorIndices,
						tileOrigin,
						tileSize,
						getOutline: space.stripeOutline,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing its stripe index', () => {
					tile({ gridAddress })

					const shapes = render.shape.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('passes along options that the outline getting function will need', () => {
					tile({ gridAddress })

					const shapes = render.shape.calls.all()

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
				isTileUniform.default.and.returnValue(true)

				tile({ gridAddress })

				expect(getStripePositionsForTile.default).toHaveBeenCalledWith({ gridAddress })
				expect(render.shape.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(render.shape).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: space.stripeOutline }))
			})
		})
	})
})
