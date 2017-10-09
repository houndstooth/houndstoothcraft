import getTileColorIndices from '../../../../src/components/getTileColorIndices'
import { iterator } from '../../../../src/utilities/codeUtilities'
import state from '../../../../src/state'

describe('get tile color indices', () => {
	const gridAddress = [ 3, 5 ]

	describe('assignment (of the indices of the colors of the overall pattern that this tile will use)', () => {
		it('can use a weave-based assignment scheme', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				assignment: {
					assignmentMode: 'WEAVE',
					weave: {
						columns: [ undefined, 1 ],
						rows: [ undefined, undefined, 3 ],
					},
				},
			}

			expect(getTileColorIndices({ gridAddress })).toEqual([ 3, 1 ])
		})

		it('can use a supertile-based assignment scheme', () => {
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]

			state.mainHoundstooth.basePattern.colorSettings = {
				assignment: {
					assignmentMode: 'SUPERTILE',
					supertile: [
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					],
				},
			}

			expect(getTileColorIndices({ gridAddress })).toEqual(expectedSupertileEntry)
		})
	})

	describe('allowing offsetting of the grid address', () => {
		it('works when in weave mode', () => {
			const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 2 / 5 ]
			state.mainHoundstooth.basePattern.colorSettings = {
				assignment: {
					assignmentMode: 'WEAVE',
					offsetAddress,
					weave: {
						columns: [ 1, undefined ],
						rows: [ undefined, 3, undefined ],
					},
				},
			}

			expect(getTileColorIndices({ gridAddress })).toEqual([ 3, 1 ])
		})

		it('works when in supertile mode', () => {
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const offsetAddress = ({ gridAddress }) => [ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 3 / 5 ]
			state.mainHoundstooth.basePattern.colorSettings = {
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

			expect(getTileColorIndices({ gridAddress })).toEqual(expectedSupertileEntry)
		})
	})

	describe('re-ordering of chosen color indices', () => {
		it('can flip the grain of the houndstooth (by reversing order)', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				assignment: {
					assignmentMode: 'WEAVE',
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const notFlippedResult = getTileColorIndices({ gridAddress })

			state.mainHoundstooth.basePattern.colorSettings.assignment.flipGrain = true
			const flippedResult = getTileColorIndices({ gridAddress })

			expect(notFlippedResult.reverse()).toEqual(flippedResult)
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
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
			const addresses = iterator(4).map(x => iterator(4).map(y => [ x, y ]))
			const setOfTileColorIndices = addresses.map(col => col.map(gridAddress => getTileColorIndices({
				gridAddress,
			})))

			const expectedSetOfTileColorIndices = [
				[ [ 0, 1 ], [ 1, 2 ], [ 3, 2 ], [ 3, 4 ] ],
				[ [ 4, 5 ], [ 6, 5 ], [ 6, 7 ], [ 7, 8 ] ],
				[ [ 9, 8 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
				[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 16, 15 ] ],
			]
			expectedSetOfTileColorIndices.forEach((col, x) => col.forEach((expectedTileColorIndices, y) => {
				expect(expectedTileColorIndices).toEqual(setOfTileColorIndices[ x ][ y ])
			}))
		})

		it('calls an arbitrary transformation, if provided', () => {
			const transformTileColorIndices = ({ tileColorIndices, gridAddress }) => {
				return gridAddress[ 0 ] === 1 ? tileColorIndices.concat(tileColorIndices) : tileColorIndices
			}
			state.mainHoundstooth.basePattern.colorSettings = {
				assignment: {
					transformTileColorIndices,
					assignmentMode: 'WEAVE',
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const addresses = iterator(2).map(x => iterator(2).map(y => [ x, y ]))
			const setOfTileColorIndices = addresses.map(col => col.map(gridAddress => getTileColorIndices({
				gridAddress,
			})))

			const expectedSetOfTileColorIndices = [
				[
					[ 1, 0 ],
					[ 0, 0 ],
				],
				[
					[ 1, 1, 1, 1 ],
					[ 0, 1, 0, 1 ],
				],
			]
			expectedSetOfTileColorIndices.forEach((col, x) => col.forEach((expectedTileColorIndices, y) => {
				expect(expectedTileColorIndices).toEqual(setOfTileColorIndices[ x ][ y ])
			}))
		})
	})
})