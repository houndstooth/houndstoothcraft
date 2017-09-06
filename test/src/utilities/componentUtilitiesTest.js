import componentUtilities from '../../../src/utilities/componentUtilities'
import codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import coordinatesMatch from '../helpers/coordinatesMatch'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('component utilities', () => {
	beforeEach(() => {
		resetStore(store)
		composeMainHoundstooth()
	})

	describe('#getSetIndicesForTile', () => {
		let getSetIndicesForTile
		const gridAddress = [ 3, 5 ]

		beforeEach(() => getSetIndicesForTile = componentUtilities.getSetIndicesForTile)

		describe('assignment', () => {
			it('can use a weave-based assignment scheme and a grid address to choose the indices of the tile\'s set to later get stuff from', () => {
				store.mainHoundstooth.basePattern.colorSettings = {
					assignment: {
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ undefined, 1 ],
							rows: [ undefined, undefined, 3 ],
						},
					},
				}

				expect(getSetIndicesForTile({ gridAddress })).toEqual([ 3, 1 ])
			})

			it('can use a supertile-based assignment scheme and a grid address to choose the tile\'s set from the overall grid set', () => {
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]

				store.mainHoundstooth.basePattern.colorSettings = {
					assignment: {
						assignmentMode: 'SUPERTILE',
						supertile: [
							[ [], expectedSupertileEntry ],
							[ [], [] ],
							[ [], [] ],
						],
					},
				}

				expect(getSetIndicesForTile({ gridAddress })).toEqual(expectedSupertileEntry)
			})
		})

		describe('address offset', () => {
			it('when in weave mode, it allows offsetting of the grid address', () => {
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 2 / 5 ]
				store.mainHoundstooth.basePattern.colorSettings = {
					assignment: {
						assignmentMode: 'WEAVE',
						offsetAddress,
						weave: {
							columns: [ 1, undefined ],
							rows: [ undefined, 3, undefined ],
						},
					},
				}

				expect(getSetIndicesForTile({ gridAddress })).toEqual([ 3, 1 ])
			})

			it('when in supertile mode, it allows offsetting of the grid address', () => {
				const expectedSupertileEntry = [ 2, 3, 0, 1 ]
				const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 3 / 5 ]
				store.mainHoundstooth.basePattern.colorSettings = {
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

				expect(getSetIndicesForTile({ gridAddress })).toEqual(expectedSupertileEntry)
			})
		})

		describe('re-ordering of chosen set', () => {
			it('can flip the grain of the houndstooth (by reversing the set)', () => {
				const notFlippedResult = getSetIndicesForTile({ gridAddress })

				store.mainHoundstooth.basePattern.colorSettings = {
					assignment: {
						flipGrain: true,
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ 0, 1 ],
							rows: [ 1, 0 ],
						},
					},
				}
				const flippedResult = getSetIndicesForTile({ gridAddress })

				expect(notFlippedResult.reverse()).toEqual(flippedResult)
			})

			it('can turn the grain of the pattern into switcheroo', () => {
				store.mainHoundstooth.basePattern.colorSettings = {
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
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetIndicesForTile({
					gridAddress,
				})))

				const expectedSetsForTiles = [
					[ [ 0, 1 ], [ 1, 2 ], [ 3, 2 ], [ 3, 4 ] ],
					[ [ 4, 5 ], [ 6, 5 ], [ 6, 7 ], [ 7, 8 ] ],
					[ [ 9, 8 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
					[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 16, 15 ] ],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})

			it('calls an arbitrary set transformation function if provided', () => {
				const transformAssignedSet = ({ setForTile, gridAddress }) => {
					return gridAddress[ 0 ] === 1 ? setForTile.concat(setForTile) : setForTile
				}
				store.mainHoundstooth.basePattern.colorSettings = {
					assignment: {
						transformAssignedSet,
						assignmentMode: 'WEAVE',
						weave: {
							columns: [ 0, 1 ],
							rows: [ 1, 0 ],
						},
					},
				}
				const iterator = codeUtilities.iterator
				const addresses = iterator(2).map(x => iterator(2).map(y => [ x, y ]))
				const setsForTiles = addresses.map(col => col.map(gridAddress => getSetIndicesForTile({
					gridAddress,
				})))

				const expectedSetsForTiles = [
					[
						[ 1, 0 ],
						[ 0, 0 ],
					],
					[
						[ 1, 1, 1, 1 ],
						[ 0, 1, 0, 1 ],
					],
				]
				expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
					expect(expectedSetForTile).toEqual(setsForTiles[ x ][ y ])
				}))
			})
		})
	})

	describe('#adjustForBaseStripeDiagonal', () => {
		const coordinates = [
			[ 0, 0 ],
			[ 5, 0 ],
			[ 0, 5 ],
		]

		let adjustForBaseStripeDiagonal
		beforeEach(() => adjustForBaseStripeDiagonal = componentUtilities.adjustForBaseStripeDiagonal)

		describe('when principal', () => {
			beforeEach(() => {
				store.mainHoundstooth.basePattern.stripeSettings = {
					baseStripeDiagonal: 'PRINCIPAL',
				}
			})

			it('rotates the outline a quarter of the way around, about the tile\'s center', () => {
				const tileOrigin = [ 0, 0 ]
				const tileSize = 5

				const result = adjustForBaseStripeDiagonal({ coordinates, tileOrigin, tileSize })

				const expectedCoordinates = [
					[ 5, 0 ],
					[ 5, 5 ],
					[ 0, 0 ],
				]
				result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
					expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
				}))
			})

			it('handles the situation where the center of the shape is outside its outline', () => {
				const tileOrigin = [ 0, 0 ]
				const tileSize = 10

				const result = adjustForBaseStripeDiagonal({ coordinates, tileOrigin, tileSize })

				const expectedCoordinates = [
					[ 10, 0 ],
					[ 10, 5 ],
					[ 5, 0 ],
				]
				result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
					expect(dimension).toBeCloseTo(expectedCoordinates[ x ][ y ])
				}))
			})

			it('handles the situation where the origin of the shape is outside its outline', () => {
				const tileOrigin = [ 5, 5 ]
				const tileSize = 5

				const actualCoordinates = adjustForBaseStripeDiagonal({ coordinates, tileOrigin, tileSize })

				const expectedCoordinates = [
					[ 15, 0 ],
					[ 15, 5 ],
					[ 10, 0 ],
				]
				expect(coordinatesMatch(expectedCoordinates, actualCoordinates)).toBe(true)
			})
		})

		it('defaults basePattern stripe diagonal to minor, i.e. no rotation', () => {
			const coordinates = [
				[ 0, 0 ],
				[ 5, 0 ],
				[ 0, 5 ],
			]
			const tileOrigin = [ 0, 0 ]
			const tileSize = 5

			expect(adjustForBaseStripeDiagonal({ coordinates, tileOrigin, tileSize })).toEqual(coordinates)
		})
	})

	describe('#getTileOriginAndSize', () => {
		const gridAddress = [ 7, 11 ]
		const tileSizeSetting = 40
		let getTileOriginAndSize
		beforeEach(() => getTileOriginAndSize = componentUtilities.getTileOriginAndSize)

		it('returns the tile size, and scales the grid address by it to get the origin', () => {
			store.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

			expect(getTileOriginAndSize({ gridAddress })).toEqual({
				tileSize: tileSizeSetting,
				tileOrigin: [ 7 * tileSizeSetting, 11 * tileSizeSetting ],
			})
		})

		it('uses a custom get tile origin and sized unit function if provided', () => {
			const custom = ({ gridAddress }) => ({
				tileSize: tileSizeSetting * tileSizeSetting,
				tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting, gridAddress[ 0 ] * tileSizeSetting ],
			})
			store.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize = custom

			expect(getTileOriginAndSize({ gridAddress })).toEqual({
				tileSize: tileSizeSetting * tileSizeSetting,
				tileOrigin: [ 11 * tileSizeSetting, 7 * tileSizeSetting ],
			})
		})
	})

	describe('#tileCenter', () => {
		let tileCenter
		beforeEach(() => tileCenter = componentUtilities.tileCenter)

		it('finds the center of the tile', () => {
			const tileOrigin = [ 12, 14 ]
			const tileSize = 3
			expect(tileCenter({ tileOrigin, tileSize })).toEqual([ 13.5, 15.5 ])
		})
	})
})
