import {
	Address,
	AssignmentMode,
	codeUtilities,
	from,
	getBySupertile,
	getByWeave,
	GetShapeColorIndices,
	getShapeColorIndices,
	Grid,
	OffsetAddress,
	patternState,
	ShapeColorIndex,
	Supertile,
	to,
	TransformShapeColorIndices,
} from '../../../../../src/indexForTest'

describe('get shape color indices', () => {
	let address: Address
	let subject: GetShapeColorIndices
	beforeEach(() => {
		address = to.Address([ 3, 5 ])
		subject = getShapeColorIndices.default
	})

	describe('assignment (of the indices of the colors of the overall pattern that this tile will use)', () => {
		it('gets by weave when assignment mode is weave', () => {
			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Weave
			spyOn(getByWeave, 'default')

			subject({ address })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({ address }))
		})

		it('gets by supertile when assignment mode is supertile', () => {
			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Supertile
			spyOn(getBySupertile, 'default')

			subject({ address })

			expect(getBySupertile.default).toHaveBeenCalledWith(jasmine.objectContaining({ address }))
		})
	})

	describe('allowing offsetting of the grid address', () => {
		beforeEach(() => {
			spyOn(getByWeave, 'default')
		})

		it('calculates the offset using the method, if there is one', () => {
			const offsetAddress: OffsetAddress =
				({ address: gridAddressToOffset }: { address: Address }): Address =>
					to.Address([
						from.AddressElement(gridAddressToOffset[ 0 ]) / 3,
						from.AddressElement(gridAddressToOffset[ 1 ]) * 2 / 5,
					])

			patternState.colorSettings.colorAssignmentSettings.offsetAddress = offsetAddress
			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Weave
			const expectedAddressOffset: Address = to.Address([ 1, 2 ])

			subject({ address })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({
				addressOffset: expectedAddressOffset,
			}))

		})

		it('defaults to no offset', () => {
			const expectedAddressOffset: Address = to.Address([ 0, 0 ])

			subject({ address })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({
				addressOffset: expectedAddressOffset,
			}))
		})
	})

	describe('re-ordering of chosen color indices', () => {
		it('can flip the grain of the houndstooth (by reversing order)', () => {
			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Weave
			patternState.colorSettings.colorAssignmentSettings.weave = {
				columns: [ 0, 1 ],
				rows: [ 1, 0 ],
			}
			const notFlippedResult: ShapeColorIndex[] = subject({ address })

			patternState.colorSettings.colorAssignmentSettings.flipGrain = true
			const flippedResult: ShapeColorIndex[] = subject({ address })

			expect(notFlippedResult.reverse()).toEqual(flippedResult)
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Supertile
			patternState.colorSettings.colorAssignmentSettings.supertile = to.Supertile([
				[ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ],
				[ [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 7, 8 ] ],
				[ [ 8, 9 ], [ 9, 10 ], [ 10, 11 ], [ 11, 12 ] ],
				[ [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 15, 16 ] ],
			])
			patternState.colorSettings.colorAssignmentSettings.switcheroo = true

			const addresses: Grid<Address> = codeUtilities.iterator(4).map((x: number) =>
				codeUtilities.iterator(4).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddressToTest: Address) =>
					subject({ address: gridAddressToTest }))))

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
			const transformShapeColorIndices: TransformShapeColorIndices =
				({ address: gridAddressToTransform, shapeColorIndices }: {
					address: Address, shapeColorIndices: ShapeColorIndex[],
				}): ShapeColorIndex[] => {
					if (from.AddressElement(gridAddressToTransform[ 0 ]) === 1) {
						return shapeColorIndices.concat(shapeColorIndices)
					}
					else {
						return shapeColorIndices
					}
				}

			patternState.colorSettings.colorAssignmentSettings.assignmentMode = AssignmentMode.Weave
			patternState.colorSettings.colorAssignmentSettings.transformShapeColorIndices = transformShapeColorIndices
			patternState.colorSettings.colorAssignmentSettings.weave = {
				columns: [ 0, 1 ],
				rows: [ 1, 0 ],
			}
			const addresses: Grid<Address> = codeUtilities.iterator(2).map((x: number) =>
				codeUtilities.iterator(2).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddressToTest: Address) =>
					subject({ address: gridAddressToTest }))))

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
