import tile from '../../../src/components/tile'
import componentUtilities from '../../../src/utilities/componentUtilities'
import colorUtilities from '../../../src/utilities/colorUtilities'
import stripeUtilities from '../../../src/utilities/stripeUtilities'
import { PERIMETER_SCALAR } from '../../../src/constants'
import store from '../../../store'

describe('tile', () => {
	const gridAddress = [ 3, 5 ]

	let shapeSpy
	let squareOutlineSpy
	let stripeOutlineSpy
	let gatherOptionsSpy

	let getColorsForTileSpy
	let colorUtilitiesIsTileUniformSpy

	beforeEach(() => {
		shapeSpy = jasmine.createSpy()
		tile.__Rewire__('shape', shapeSpy)
		squareOutlineSpy = jasmine.createSpy()
		tile.__Rewire__('squareOutline', squareOutlineSpy)
		stripeOutlineSpy = jasmine.createSpy()
		tile.__Rewire__('stripeOutline', stripeOutlineSpy)
		gatherOptionsSpy = jasmine.createSpy()
		tile.__Rewire__('gatherOptions', gatherOptionsSpy)

		getColorsForTileSpy = spyOn(colorUtilities, 'getColorsForTile')
		colorUtilitiesIsTileUniformSpy = spyOn(colorUtilities, 'isTileUniform')
	})

	afterEach(() => {
		tile.__ResetDependency__('shape')
		tile.__ResetDependency__('squareOutline')
		tile.__ResetDependency__('stripeOutline')
		tile.__ResetDependency__('gatherOptions')
	})

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(componentUtilities, 'getTileOriginAndSize').and.returnValue({ tileOrigin: null, tileSize: 10 })
		})

		it('returns early, not getting colors', () => {
			tile({ gridAddress })

			expect(getColorsForTileSpy).not.toHaveBeenCalled()
		})
	})

	describe('when the tile is assigned an origin on the canvas', () => {
		let stripePositionsForTile
		let tileColors
		let options
		let tileOrigin
		let tileSize
		beforeEach(() => {
			tileOrigin = [ 7, 11 ]
			tileSize = 13
			spyOn(componentUtilities, 'getTileOriginAndSize').and.returnValue({ tileOrigin, tileSize })

			stripePositionsForTile = [ 0, 0.5, 1, 1.5 ]
			spyOn(stripeUtilities, 'getStripePositionsForTile').and.returnValue(stripePositionsForTile)

			store.mainHoundstooth.basePattern.tileSettings = {}

			tileColors = {}
			getColorsForTileSpy.and.returnValue(tileColors)

			options = {}
			gatherOptionsSpy.and.returnValue(options)
		})

		it('gathers options', () => {
			tile({ gridAddress })

			expect(gatherOptionsSpy).toHaveBeenCalled()
		})

		describe('if a function for converting a tile into shapes is not specified', () => {
			it('defaults to using the shape method directly', () => {
				tile({ gridAddress })

				expect(shapeSpy).toHaveBeenCalled()
			})
		})

		describe('if a function for converting a tile into shapes is specified', () => {
			it('uses it', () => {
				const tileToShapesSpy = jasmine.createSpy()
				store.mainHoundstooth.basePattern.tileSettings.tileToShapes = tileToShapesSpy

				tile({ gridAddress })

				expect(tileToShapesSpy).toHaveBeenCalled()
				expect(shapeSpy).not.toHaveBeenCalled()
			})
		})

		it('gets colors', () => {
			tile({ gridAddress })

			expect(getColorsForTileSpy).toHaveBeenCalledWith({ gridAddress })
		})

		it('gets options', () => {
			tile({ gridAddress })

			expect(gatherOptionsSpy).toHaveBeenCalledWith({ gridAddress })
		})

		describe('when collapsing same colored shapes within a tile is enabled', () => {
			beforeEach(() => {
				store.mainHoundstooth.basePattern.tileSettings.collapseSameColoredShapesWithinTile = true
			})

			describe('when a function for checking the uniformity of the tile is specified', () => {
				it('uses it to see if the tile is uniform', () => {
					const isTileUniformSpy = jasmine.createSpy()
					store.mainHoundstooth.basePattern.tileSettings.isTileUniform = isTileUniformSpy

					tile({ gridAddress })

					expect(isTileUniformSpy).toHaveBeenCalledWith({ tileColors, options })
					expect(colorUtilitiesIsTileUniformSpy).not.toHaveBeenCalled()
				})
			})

			describe('when a function for checking the uniformity of the tile is not specified', () => {
				it('uses the default tile uniformity check', () => {
					tile({ gridAddress })

					expect(colorUtilitiesIsTileUniformSpy).toHaveBeenCalledWith({ tileColors, options })
				})
			})

			describe('when the tile is uniform', () => {
				beforeEach(() => {
					colorUtilitiesIsTileUniformSpy.and.returnValue(true)
				})

				it('does not look for stripe positions', () => {
					tile({ gridAddress })

					expect(stripeUtilities.getStripePositionsForTile).not.toHaveBeenCalled()
				})

				describe('if a function for getting the outline of the shape when the tile is uniform is not specified', () => {
					it('converts the tile into a shape with the outline of a square', () => {
						tile({ gridAddress })

						expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: squareOutlineSpy }))
					})
				})

				describe('if a function for getting the outline of the shape when the tile is uniform is specified', () => {
					it('converts the tile into a shape with the outline gotten from using it', () => {
						const whenTileIsUniform = () => {
						}
						store.mainHoundstooth.basePattern.tileSettings.getOutline = { whenTileIsUniform }

						tile({ gridAddress })

						expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: whenTileIsUniform }))
					})
				})

				it('converts the tile into shapes with the grid address, colors, origin, size, and options for the tile', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColors,
						tileOrigin,
						tileSize,
						options,
					}))
				})
			})

			describe('when the tile is not uniform', () => {
				beforeEach(() => {
					colorUtilitiesIsTileUniformSpy.and.returnValue(false)
				})

				it('looks for stripe positions', () => {
					tile({ gridAddress })

					expect(stripeUtilities.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				})

				it('converts the tile into a number of shapes equal to the number of stripes', () => {
					tile({ gridAddress })

					expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				})

				describe('if a function for getting the outline of the shape when the tile is multiform is not specified', () => {
					it('converts the tile into shapes with the outlines of stripes', () => {
						tile({ gridAddress })

						expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripeOutlineSpy }))
					})
				})

				describe('if a function for getting the outline of the shape when the tile is multiform is specified', () => {
					it('converts the tile into shapes with the outline gotten from using it', () => {
						const whenTileIsMultiform = () => {
						}
						store.mainHoundstooth.basePattern.tileSettings.getOutline = { whenTileIsMultiform }

						tile({ gridAddress })

						expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: whenTileIsMultiform }))
					})
				})

				it('converts the tile into shapes with the grid address, colors, origin, size, and options for the tile', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						gridAddress,
						tileColors,
						tileOrigin,
						tileSize,
						options,
					}))
				})

				it('converts the tile into shapes, each one a stripe, each one knowing the index within the tile\'s stripes', () => {
					tile({ gridAddress })

					const shapes = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ stripeIndex: 3 }))
				})

				it('converts the tile into shapes, each one a stripe, each one to choose which of its colors based on its index within the tile\'s stripes', () => {
					tile({ gridAddress })

					const shapes = shapeSpy.calls.all()

					expect(shapes[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ colorsIndex: 0 }))
					expect(shapes[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ colorsIndex: 1 }))
					expect(shapes[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ colorsIndex: 2 }))
					expect(shapes[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ colorsIndex: 3 }))
				})

				it('tells each stripe the tile converts into how many stripes total it is converting into', () => {
					tile({ gridAddress })

					expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({
						stripeCount: stripePositionsForTile.length,
					}))
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
				store.mainHoundstooth.basePattern.tileSettings.collapseSameColoredShapesWithinTile = false
			})

			it('always calculates stripes and calls shape once for each one, even if the tile is uniform', () => {
				colorUtilitiesIsTileUniformSpy.and.returnValue(true)

				tile({ gridAddress })

				expect(stripeUtilities.getStripePositionsForTile).toHaveBeenCalledWith({ gridAddress })
				expect(shapeSpy.calls.all().length).toEqual(stripePositionsForTile.length)
				expect(shapeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ getOutline: stripeOutlineSpy }))
			})
		})
	})
})
