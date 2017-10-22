import { state, to } from '../../../../src'
import { getTileColorIndices } from '../../../../src/components/getTileColorIndices'
import { AssignmentMode } from '../../../../src/components/types/AssignmentMode'
import { setSetting } from '../../../../src/store/setSetting'
import { iterator } from '../../../../src/utilities/codeUtilities'

describe('get tile color indices', () => {
	const gridAddressForSubject = to.Address([ 3, 5 ])

	describe('assignment (of the indices of the colors of the overall pattern that this tile will use)', () => {
		it('can use a weave-based assignment scheme', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Weave,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 0, 0, 3 ],
					},
				},
			}

			expect(getTileColorIndices({ gridAddress: gridAddressForSubject })).toEqual(to.TileColorIndices([ 3, 1 ]))
		})

		it('can use a supertile-based assignment scheme', () => {
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]

			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Supertile,
					supertile: to.Supertile([
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					]),
				},
			}

			const actualSupertileEntry = getTileColorIndices({ gridAddress: gridAddressForSubject })
			expect(actualSupertileEntry).toEqual(to.TileColorIndices(expectedSupertileEntry))
		})
	})

	describe('allowing offsetting of the grid address', () => {
		it('works when in weave mode', () => {
			const offsetAddress = ({ gridAddress }) => to.Address([ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 2 / 5 ])
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Weave,
					offsetAddress,
					weave: {
						columns: [ 1, 0 ],
						rows: [ 0, 3, 0 ],
					},
				},
			}

			expect(getTileColorIndices({ gridAddress: gridAddressForSubject })).toEqual(to.TileColorIndices([ 3, 1 ]))
		})

		it('works when in supertile mode', () => {
			const expectedSupertileEntry = [ 2, 3, 0, 1 ]
			const offsetAddress = ({ gridAddress }) => to.Address([ gridAddress[ 0 ] / 3, gridAddress[ 1 ] * 3 / 5 ])
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Supertile,
					offsetAddress,
					supertile: to.Supertile([
						[ [], [] ],
						[ expectedSupertileEntry, [] ],
						[ [], [] ],
					]),
				},
			}

			let actualSupertileEntry = getTileColorIndices({ gridAddress: gridAddressForSubject })
			expect(actualSupertileEntry).toEqual(to.TileColorIndices(expectedSupertileEntry))
		})
	})

	describe('re-ordering of chosen color indices', () => {
		it('can flip the grain of the houndstooth (by reversing order)', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Weave,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const notFlippedResult = getTileColorIndices({ gridAddress: gridAddressForSubject })

			setSetting('flipGrain', true)
			const flippedResult = getTileColorIndices({ gridAddress: gridAddressForSubject })

			expect(notFlippedResult.reverse()).toEqual(flippedResult)
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Supertile,
					supertile: to.Supertile([
						[ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
						[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 7, 8 ] ],
						[ [ 8, 9 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
						[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 15, 16 ] ],
					]),
					switcheroo: true,
				},
			}
			const addresses = iterator(4).map(x => iterator(4).map(y => to.Address([ x, y ])))
			const setOfTileColorIndices = addresses.map(col => col.map(gridAddress => getTileColorIndices({
				gridAddress,
			})))

			const expectedSetOfTileColorIndices = [
				[ [ 1, 0 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
				[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 8, 7 ] ],
				[ [ 8, 9 ], [ 9, 10 ], [ 11, 10 ], [ 11, 12 ] ],
				[ [ 12, 13 ], [ 14, 13 ], [ 14, 15 ], [ 15, 16 ] ],
			]
			expectedSetOfTileColorIndices.forEach((col, x) => {
				col.forEach((expectedTileColorIndices, y) => {
					expect(setOfTileColorIndices[ x ][ y ]).toEqual(to.TileColorIndices(expectedTileColorIndices))
				})
			})
		})

		it('calls an arbitrary transformation, if provided', () => {
			const transformTileColorIndices = ({ tileColorIndices, gridAddress }) =>
				gridAddress[ 0 ] === 1 ? tileColorIndices.concat(tileColorIndices) : tileColorIndices
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignment: {
					assignmentMode: AssignmentMode.Weave,
					transformTileColorIndices,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const addresses = iterator(2).map(x => iterator(2).map(y => to.Address([ x, y ])))
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
			expectedSetOfTileColorIndices.forEach((col, x) => {
				col.forEach((expectedTileColorIndices, y) => {
					expect(setOfTileColorIndices[ x ][ y ]).toEqual(to.TileColorIndices(expectedTileColorIndices))
				})
			})
		})
	})
})
