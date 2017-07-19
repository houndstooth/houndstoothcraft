import componentUtilities from '../../../src/utilities/componentUtilities'
import codeUtilities from '../../../src/utilities/codeUtilities'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import setup from '../../../src/settings/setup'

describe('component utilities', () => {
	let getSetForTile
	let settings
	const address = [ 3, 5 ]
	beforeEach(() => {
		setup()
		getSetForTile = componentUtilities.getSetForTile
	})

	describe('#getSetForTile', () => {
		describe('assignment', () => {
			it('can use a weave-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})

			it('can use a supertile-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
				// expected set for the tile takes the indicies of the supertile entry
				// and maps them to entries in the set for grid
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]

				// expected enty is in the 3rd column, 5th row, per the address, 
				// modulus the rank of this supertile
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('defaults', () => {
			it('defaults the set to a basic color set', () => {
				const expectedSetForTile = [ TRANSPARENT, BLACK ]
				settings = {
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 0 ],
							rows: [ undefined, 1 ],
						},
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})

			it('defaults assignment to a basic weave, binary alternating and offset', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				settings = { set: setForGrid }

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})

			describe('when the assignment settings object is present', () => {
				describe('but the mode is missing from it', () => {
					it('defaults the mode property individually to the default color settings assignment mode', () => {
						const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]
						settings = {
							set: setForGrid,
							assignment: {
								weave: {
									columns: [ undefined, 1 ],
									rows: [ undefined, undefined, 3 ],
								},
							},
						}

						expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
					})
				})

				describe('but weave is missing from it', () => {
					it('defaults the weave property individually to the default color settings assignment weave', () => {
						const setForGrid = [ 'FIRST', 'SECOND' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]
						settings = {
							set: setForGrid,
							assignment: { assignmentMode: 'WEAVE' },
						}

						expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
					})
				})

				describe('but supertile is missing from it', () => {
					it('defaults the supertile property individually to the default color settings assignment supertile', () => {
						const setForGrid = [ 'FIRST', 'SECOND' ]
						const expectedSetForTile = [ 'FIRST', 'SECOND' ]

						settings = {
							set: setForGrid,
							assignment: { assignmentMode: 'SUPERTILE' },
						}

						expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
					})
				})
			})
		})

		describe('address offset', () => {
			it('when in weave mode, it allows offsetting of the address', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'FIRST', 'SECOND' ]
				const offsetAddress = ({ address }) => [ address[ 0 ] / 3, address[ 1 ] * 2 / 5 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						offsetAddress,
						weave: {
							columns: [ 1, undefined ],
							rows: [ undefined, 3, undefined ],
						},
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})

			it('when in supertile mode, it allows offsetting of the address', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]
				const offsetAddress = ({ address }) => [ address[ 0 ] / 3, address[ 1 ] * 3 / 5 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						offsetAddress,
						supertile: [
							[ [], [] ],
							[ expectedSupertileEntry, [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('set for grid offset', () => {
			it('when in weave mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSetForTile = [ 'THIRD', 'FIRST' ]
				const offsetSetForGridIndex = ({ address }) => address[ 0 ] + address[ 1 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'WEAVE',
						offsetSetForGridIndex,
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})

			it('when in supertile mode, it allows offsetting of the choice within the set for the whole grid', () => {
				const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const expectedSetForTile = [ 'SECOND', 'THIRD', 'THIRD', 'FIRST' ]
				const offsetSetForGridIndex = ({ address }) => address[ 0 ] + address[ 1 ]
				settings = {
					set: setForGrid,
					assignment: {
						assignmentMode: 'SUPERTILE',
						offsetSetForGridIndex,
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetForTile({ address, settings })).toEqual(expectedSetForTile)
			})
		})

		describe('re-ordering of chosen set effects', () => {
			it('can flip the grain of the houndstooth (by reversing the set)', () => {
				const notFlippedResult = getSetForTile({ address })
				settings = { assignment: { flipGrain: true } }

				expect(notFlippedResult.reverse()).toEqual(getSetForTile({ address, settings }))
			})

			it('can turn the grain of the pattern into switcheroo', () => {
				const setForGrid = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q' ]
				settings = {
					set: setForGrid,
					assignment: {
						switcheroo: true,
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
							[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 7, 8 ] ],
							[ [ 8, 9 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
							[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 15, 16 ] ],
						],
					},
				}
				const iterator = codeUtilities.iterator
				const addresses = iterator(4).map(x => iterator(4).map(y => [ x, y ]))
				const setsForTiles = addresses.map(col => col.map(address => getSetForTile({ address, settings })))

				const expectedSetsForTiles = [
					[ [ 'a', 'b' ], [ 'b', 'c' ], [ 'd', 'c' ], [ 'd', 'e' ] ],
					[ [ 'e', 'f' ], [ 'g', 'f' ], [ 'g', 'h' ], [ 'h', 'i' ] ],
					[ [ 'j', 'i' ], [ 'j', 'k' ], [ 'k', 'l' ], [ 'l', 'm' ] ],
					[ [ 'm', 'n' ], [ 'n', 'o' ], [ 'o', 'p' ], [ 'q', 'p' ] ],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})

			it('calls an arbitrary set transformation function if provided', () => {
				const transformAssignedSet = ({ setForTile, address }) => {
					return address[ 0 ] === 1 ? setForTile.concat(setForTile) : setForTile
				}
				settings = { assignment: { transformAssignedSet } }
				const iterator = codeUtilities.iterator
				const addresses = iterator(2).map(x => iterator(2).map(y => [ x, y ]))
				const setsForTiles = addresses.map(col => col.map(address => getSetForTile({ address, settings })))

				const expectedSetsForTiles = [
					[
						[ TRANSPARENT, BLACK ],
						[ BLACK, BLACK ],
					],
					[
						[ TRANSPARENT, TRANSPARENT, TRANSPARENT, TRANSPARENT ],
						[ BLACK, TRANSPARENT, BLACK, TRANSPARENT ],
					],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})
		})
	})

	describe('#rotateShapeAboutShapeCenter', () => {
		const coordinates = [
			[ 0, 0 ],
			[ 5, 0 ],
			[ 0, 5 ],
		]

		let rotateShapeAboutShapeCenter
		beforeEach(() => rotateShapeAboutShapeCenter = componentUtilities.rotateShapeAboutShapeCenter)

		describe('base stripe diagonal', () => {
			describe('when principal', () => {
				beforeEach(() => {
					current.settings.initial.baseStripeDiagonal = 'PRINCIPAL'
				})

				it('rotates the coordinates a quarter of the way around, about the shape\'s center', () => {
					const zoomedAndScrolledTileOrigin = [ 0, 0 ]
					const zoomedTileSize = 5

					const result = rotateShapeAboutShapeCenter({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize })

					const expectedCoordinates = [
						[ 5, 0 ],
						[ 5, 5 ],
						[ 0, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
					}))
				})

				it('handles the situation where the center of the shape is outside its coordinates', () => {
					const zoomedAndScrolledTileOrigin = [ 0, 0 ]
					const zoomedTileSize = 10

					const result = rotateShapeAboutShapeCenter({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize })

					const expectedCoordinates = [
						[ 10, 0 ],
						[ 10, 5 ],
						[ 5, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
					}))
				})

				it('handles the situation where the origin of the shape is outside its coordinates', () => {
					const zoomedAndScrolledTileOrigin = [ 5, 5 ]
					const zoomedTileSize = 5

					const result = rotateShapeAboutShapeCenter({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize })

					const expectedCoordinates = [
						[ 15, 0 ],
						[ 15, 5 ],
						[ 10, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
					}))
				})
			})

			it('defaults base stripe diagonal to minor, i.e. no rotation', () => {
				const coordinates = [
					[ 0, 0 ],
					[ 5, 0 ],
					[ 0, 5 ],
				]
				const zoomedAndScrolledTileOrigin = [ 0, 0 ]
				const zoomedTileSize = 5

				expect(rotateShapeAboutShapeCenter({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize })).toEqual(coordinates)
			})
		})
	})

	describe('#getTileOriginAndSize', () => {
		const address = [ 7, 11 ]
		const tileSize = 40
		let getTileOriginAndSize
		beforeEach(() => getTileOriginAndSize = componentUtilities.getTileOriginAndSize)

		it('returns the tile size, and scales the address by it to get the origin', () => {
			current.settings.initial.tileSettings = { tileSize }

			expect(getTileOriginAndSize({ address })).toEqual({
				tileSize,
				tileOrigin: [ 7 * tileSize, 11 * tileSize ],
			})
		})

		it('uses a custom get tile origin and sized unit function if provided', () => {
			const custom = ({ address }) => ({
				tileSize: tileSize * tileSize,
				tileOrigin: [ address[ 1 ] * tileSize, address[ 0 ] * tileSize ],
			})
			current.settings.initial.getTileOriginAndSize = custom

			expect(getTileOriginAndSize({ address })).toEqual({
				tileSize: tileSize * tileSize,
				tileOrigin: [ 11 * tileSize, 7 * tileSize ],
			})
		})
	})
})
