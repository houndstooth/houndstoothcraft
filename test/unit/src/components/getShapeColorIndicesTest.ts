import { Address, from, state, to } from '../../../../src'
import {
	AssignmentMode,
	Grid,
	OffsetAddress,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
} from '../../../../src/components'
import { getShapeColorIndices } from '../../../../src/components/getShapeColorIndices'
import { setSetting } from '../../../../src/store/setSetting'
import { iterator } from '../../../../src/utilities/codeUtilities'

describe('get tile color indices', () => {
	const gridAddressForSubject: Address = to.Address([ 3, 5 ])

	describe('assignment (of the indices of the colors of the overall pattern that this tile will use)', () => {
		it('can use a weave-based assignment scheme', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 0, 0, 3 ],
					},
				},
			}

			expect(getShapeColorIndices({ gridAddress: gridAddressForSubject })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
		})

		it('can use a supertile-based assignment scheme', () => {
			const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])

			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
					supertile: to.Supertile([
						[ [], expectedSupertileEntry ],
						[ [], [] ],
						[ [], [] ],
					]),
				},
			}

			const actualSupertileEntry: ShapeColorIndex[] = getShapeColorIndices({ gridAddress: gridAddressForSubject })
			expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
		})
	})

	describe('allowing offsetting of the grid address', () => {
		it('works when in weave mode', () => {
			const offsetAddress: OffsetAddress = ({ gridAddress }: { gridAddress: Address }): Address =>
				to.Address([ from.AddressElement(gridAddress[ 0 ]) / 3, from.AddressElement(gridAddress[ 1 ]) * 2 / 5 ])
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					offsetAddress,
					weave: {
						columns: [ 1, 0 ],
						rows: [ 0, 3, 0 ],
					},
				},
			}

			expect(getShapeColorIndices({ gridAddress: gridAddressForSubject })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
		})

		it('works when in supertile mode', () => {
			const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
			const offsetAddress: OffsetAddress = ({ gridAddress }: { gridAddress: Address }): Address =>
				to.Address([ from.AddressElement(gridAddress[ 0 ]) / 3, from.AddressElement(gridAddress[ 1 ]) * 3 / 5 ])
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
					offsetAddress,
					supertile: to.Supertile([
						[ [], [] ],
						[ expectedSupertileEntry, [] ],
						[ [], [] ],
					]),
				},
			}

			const actualSupertileEntry: ShapeColorIndex[] = getShapeColorIndices({ gridAddress: gridAddressForSubject })
			expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
		})
	})

	describe('re-ordering of chosen color indices', () => {
		it('can flip the grain of the houndstooth (by reversing order)', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const notFlippedResult: ShapeColorIndex[] = getShapeColorIndices({ gridAddress: gridAddressForSubject })

			setSetting('flipGrain', true)
			const flippedResult: ShapeColorIndex[] = getShapeColorIndices({ gridAddress: gridAddressForSubject })

			expect(notFlippedResult.reverse()).toEqual(flippedResult)
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
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
			const addresses: Grid<Address> = iterator(4).map((x: number) =>
				iterator(4).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddress: Address) => getShapeColorIndices({ gridAddress }))))

			const expectedSetOfShapeColorIndices: Supertile = to.Supertile([
				[ [ 1, 0 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
				[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 8, 7 ] ],
				[ [ 8, 9 ], [ 9, 10 ], [ 11, 10 ], [ 11, 12 ] ],
				[ [ 12, 13 ], [ 14, 13 ], [ 14, 15 ], [ 15, 16 ] ],
			])
			expectedSetOfShapeColorIndices.forEach((col: ShapeColorIndex[][], x: number) => {
				col.forEach((expectedShapeColorIndices: ShapeColorIndex[], y: number) => {
					expect(setOfShapeColorIndices[ x ][ y ]).toEqual(to.ShapeColorIndices(expectedShapeColorIndices))
				})
			})
		})

		it('calls an arbitrary transformation, if provided', () => {
			const transformShapeColorIndices: TransformShapeColorIndices = ({ gridAddress, shapeColorIndices }: {
				gridAddress: Address, shapeColorIndices: ShapeColorIndex[],
			}): ShapeColorIndex[] => {
				if (from.AddressElement(gridAddress[ 0 ]) === 1) {
					return shapeColorIndices.concat(shapeColorIndices)
				}
				else {
					return shapeColorIndices
				}
			}

			state.mainHoundstooth.basePattern.colorSettings = {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					transformShapeColorIndices,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			}
			const addresses: Grid<Address> = iterator(2).map((x: number) =>
				iterator(2).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddress: Address) => getShapeColorIndices({ gridAddress }))))

			const expectedSetOfShapeColorIndices: Supertile = to.Supertile([
				[
					[ 1, 0 ],
					[ 0, 0 ],
				],
				[
					[ 1, 1, 1, 1 ],
					[ 0, 1, 0, 1 ],
				],
			])
			expectedSetOfShapeColorIndices.forEach((col: Grid<ShapeColorIndex>, x: number) => {
				col.forEach((expectedShapeColorIndices: ShapeColorIndex[], y: number) => {
					expect(setOfShapeColorIndices[ x ][ y ]).toEqual(to.ShapeColorIndices(expectedShapeColorIndices))
				})
			})
		})
	})
})
