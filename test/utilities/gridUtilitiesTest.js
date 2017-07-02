import gridUtilities from '../../src/utilities/gridUtilities'
import { COLOR_SET } from '../../src/defaults'
import codeUtilities from '../../src/utilities/codeUtilities'
import { BLACK, TRANSPARENT } from '../../src/constants'

describe('grid utilities', () => {
	let getSetForTile
	let config
	const address = [ 3, 5 ]
	beforeEach(() => getSetForTile = gridUtilities.getSetForTile)

	describe('assignment', () => {
		it('can use a weave-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSetForTile = [ 'FIRST', 'SECOND' ]
			config = {
				set: setForGrid,
				assignment: {
					mode: 'WEAVE',
					weave: {
						columns: [ undefined, 1 ],
						rows: [ undefined, undefined, 3 ],
					},
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})

		it('can use a supertile-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
			// expected set for the tile takes the indicies of the supertile entry
			// and maps them to entries in the set for grid
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]

			// expected enty is in the 3rd column, 5th row, per the address, 
			// modulus the rank of this supertile
			config = {
				set: setForGrid,
				assignment: {
					mode: 'SUPERTILE',
					supertile: [
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					],
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})
	})

	describe('defaults', () => {
		it('defaults the entire config to the initial color config, if present', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]
			settings.initial.colorConfig = {
				set: setForGrid,
				assignment: {
					mode: 'SUPERTILE',
					supertile: [
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					],
				},
			}

			expect(getSetForTile({ address })).toEqual(expectedSetForTile)
		})

		it('defaults the set to a basic color set', () => {
			const expectedSetForTile = [ COLOR_SET[ 1 ], COLOR_SET[ 0 ] ]
			config = {
				assignment: {
					mode: 'WEAVE',
					weave: {
						columns: [ undefined, 0 ],
						rows: [ undefined, 1 ],
					},
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})

		it('defaults assignment to a basic weave, binary alternating and offset', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSetForTile = [ 'FIRST', 'SECOND' ]
			config = { set: setForGrid }

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})

		describe('when the assigment config object is present', () => {
			describe('but the mode is missing from it', () => {
				it('defaults the mode property individually to the default color config assignment mode', () => {
					const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
					const expectedSetForTile = [ 'FIRST', 'SECOND' ]
					config = {
						set: setForGrid,
						assignment: {
							weave: {
								columns: [ undefined, 1 ],
								rows: [ undefined, undefined, 3 ],
							},
						},
					}

					expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
				})
			})

			describe('but weave is missing from it', () => {
				it('defaults the weave property individually to the default color config assignment weave', () => {
					const setForGrid = [ 'FIRST', 'SECOND' ]
					const expectedSetForTile = [ 'FIRST', 'SECOND' ]
					config = {
						set: setForGrid,
						assignment: { mode: 'WEAVE'	},
					}

					expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
				})
			})

			describe('but supertile is missing from it', () => {
				it('defaults the supertile property individually to the default color config assignment supertile', () => {
					const setForGrid = [ 'FIRST', 'SECOND' ]
					const expectedSetForTile = [ 'FIRST', 'SECOND' ]

					config = {
						set: setForGrid,
						assignment: { mode: 'SUPERTILE' },
					}

					expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
				})
			})
		})
	})

	describe('address offset', () => {
		it('when in weave mode, it allows offsetting of the address', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSetForTile = [ 'FIRST', 'SECOND' ]
			const offsetAddress = ({ address }) => [ address[0] / 3, address[1] * 2 / 5 ]
			config = {
				set: setForGrid,
				assignment: {
					mode: 'WEAVE',
					offsetAddress,
					weave: {
						columns: [ 1, undefined ],
						rows: [ undefined, 3, undefined ],
					},
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})

		it('when in supertile mode, it allows offsetting of the address', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]
			const offsetAddress = ({ address }) => [ address[0] / 3, address[1] * 3 / 5 ]
			config = {
				set: setForGrid,
				assignment: {
					mode: 'SUPERTILE',
					offsetAddress,
					supertile: [
						[ [], [] ],
						[ expectedSupertileEntry, [] ],
						[ [], [] ],
					],
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})
	})

	describe('set for grid offset', () => {
		it('when in weave mode, it allows offsetting of the choice within the set for the whole grid', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSetForTile = [ 'THIRD', 'FIRST' ]
			const offsetSetForGridIndex = ({ address }) => address[0] + address[1]
			config = {
				set: setForGrid,
				assignment: {
					mode: 'WEAVE',
					offsetSetForGridIndex,
					weave: {
						columns: [ undefined, 1 ],
						rows: [ undefined, undefined, 3 ],
					},
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})

		it('when in supertile mode, it allows offsetting of the choice within the set for the whole grid', () => {
			const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const expectedSetForTile = [ 'SECOND', 'THIRD', 'THIRD', 'FIRST' ]
			const offsetSetForGridIndex = ({ address }) => address[0] + address[1]
			config = {
				set: setForGrid,
				assignment: {
					mode: 'SUPERTILE',
					offsetSetForGridIndex,
					supertile: [
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					],
				},
			}

			expect(getSetForTile({ address, config })).toEqual(expectedSetForTile)
		})
	})

	describe('re-ordering of chosen set effects', () => {
		it('can flip the grain of the houndstooth (by reversing the set)', () => {
			const notFlippedResult = getSetForTile({ address })
			config = { assignment: { flipGrain: true } }

			expect(notFlippedResult.reverse()).toEqual(getSetForTile({ address, config }))
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			const setForGrid =[ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q' ]
			config = {
				set: setForGrid,
				assignment: {
					switcheroo: true,
					mode: 'SUPERTILE',
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
			const setsForTiles = addresses.map(col => col.map(address => getSetForTile({ address, config })))

			const expectedSetsForTiles = [
				[ [ 'a', 'b' ], [ 'b', 'c' ], [ 'd', 'c' ], [ 'd', 'e' ] ],
				[ [ 'e', 'f' ], [ 'g', 'f' ], [ 'g', 'h' ], [ 'h', 'i' ] ],
				[ [ 'j', 'i' ], [ 'j', 'k' ], [ 'k', 'l' ], [ 'l', 'm' ] ],
				[ [ 'm', 'n' ], [ 'n', 'o' ], [ 'o', 'p' ], [ 'q', 'p' ] ],
			]
			expectedSetsForTiles.forEach((col, x) => col.forEach((expectedSetForTile, y) => {
				expect(expectedSetForTile).toEqual(setsForTiles[x][y])
			}))
		})

		it('calls an arbitrary set transformation function if provided', () => {
			const transformAssignedSet = ({ setForTile, address }) => {
				return address[0] === 1 ? setForTile.concat(setForTile) : setForTile
			}
			config = { assignment: { transformAssignedSet } }
			const iterator = codeUtilities.iterator
			const addresses = iterator(2).map(x => iterator(2).map(y => [ x, y ]))
			const setsForTiles = addresses.map(col => col.map(address => getSetForTile({ address, config })))

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
				expect(expectedSetForTile).toEqual(setsForTiles[x][y])
			}))
		})
	})
})
