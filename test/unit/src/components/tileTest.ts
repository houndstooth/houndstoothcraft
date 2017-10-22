import * as getStripePositionsForTile from '../../../../src/components/getStripePositionsForTile'
import * as getTileColorIndices from '../../../../src/components/getTileColorIndices'
import * as getTileOriginAndSize from '../../../../src/components/getTileOriginAndSize'
import * as isTileUniform from '../../../../src/components/isTileUniform'
import { tile } from '../../../../src/components/tile'
import { PERIMETER_SCALAR } from '../../../../src/constants'
import * as render from '../../../../src/render'
import * as space from '../../../../src/space'
import { state } from '../../../../src/state'
import { getSetting } from '../../../../src/store/getSetting'
import { TileSettings } from '../../../../src/store/types/settings/TileSettings'
import * as to from '../../../../src/utilities/to'

describe('tile', () => {
	const gridAddress = to.Address([ 3, 5 ])
	let shapeSpy
	let getTileColorIndicesSpy
	let isTileUniformSpy
	beforeEach(() => {
		shapeSpy = spyOn(render, 'shape')
		spyOn(space, 'squareOutline')
		spyOn(space, 'stripeOutline')
		getTileColorIndicesSpy = spyOn(getTileColorIndices, 'getTileColorIndices')
		isTileUniformSpy = spyOn(isTileUniform, 'isTileUniform')
	})

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin: undefined, tileSize: 10 })
		})

		it('returns early, not getting colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndices.getTileColorIndices).not.toHaveBeenCalled()
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
			spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = [ 0, 0.5, 1, 1.5 ]
			spyOn(getStripePositionsForTile, 'getStripePositionsForTile').and.returnValue(stripePositionsForTile)

			state.mainHoundstooth.basePattern.tileSettings = {}

			tileColorIndices = []
			getTileColorIndicesSpy.and.returnValue(tileColorIndices)
		})

		it('gets colors', () => {
			tile({ gridAddress })

			expect(getTileColorIndices.getTileColorIndices).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				const tileSettings: TileSettings = getSetting('tile')
				tileSettings.collapseSameColoredShapesWithinTile = true
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

					expect(getStripePositionsForTile.getStripePositionsForTile).not.toHaveBeenCalled()
				})

				it('converts the tile into shapes with the correct arguments, and uses square outline', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						getOutline: space.squareOutline,
						gridAddress,
						tileColorIndices,
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
						tileColorIndices,
						tileOrigin,
						tileSize,
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
				const tileSettings: TileSettings = getSetting('tile')
				tileSettings.collapseSameColoredShapesWithinTile = false
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
