import {
	Address,
	AssignmentMode,
	codeUtilities,
	from,
	getBySupertile,
	getByWeave,
	getShapeColorIndices,
	Grid,
	OffsetAddress,
	setSetting,
	ShapeColorIndex,
	Supertile,
	to,
	TransformShapeColorIndices,
} from '../../../../../src'

const { iterator } = codeUtilities

describe('get tile color indices', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	describe('assignment (of the indices of the colors of the overall pattern that this tile will use)', () => {
		it('gets by weave when assignment mode is weave', () => {
			setSetting.default('assignmentMode', AssignmentMode.Weave)
			spyOn(getByWeave, 'default')

			getShapeColorIndices.default({ gridAddress })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({ gridAddress }))
		})

		it('gets by supertile when assignment mode is supertile', () => {
			setSetting.default('assignmentMode', AssignmentMode.Supertile)
			spyOn(getBySupertile, 'default')

			getShapeColorIndices.default({ gridAddress })

			expect(getBySupertile.default).toHaveBeenCalledWith(jasmine.objectContaining({ gridAddress }))
		})
	})

	describe('allowing offsetting of the grid address', () => {
		beforeEach(() => {
			spyOn(getByWeave, 'default')
		})

		it('calculates the offset using the method, if there is one', () => {
			const offsetAddress: OffsetAddress =
				({ gridAddress: gridAddressToOffset }: { gridAddress: Address }): Address =>
					to.Address([
						from.AddressElement(gridAddressToOffset[ 0 ]) / 3,
						from.AddressElement(gridAddressToOffset[ 1 ]) * 2 / 5,
					])
			setSetting.default('offsetAddress', offsetAddress)
			const expectedAddressOffset: Address = to.Address([ 1, 2 ])

			getShapeColorIndices.default({ gridAddress })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({
				addressOffset: expectedAddressOffset,
			}))

		})

		it('defaults to no offset', () => {
			const expectedAddressOffset: Address = to.Address([ 0, 0 ])

			getShapeColorIndices.default({ gridAddress })

			expect(getByWeave.default).toHaveBeenCalledWith(jasmine.objectContaining({
				addressOffset: expectedAddressOffset,
			}))
		})
	})

	describe('re-ordering of chosen color indices', () => {
		it('can flip the grain of the houndstooth (by reversing order)', () => {
			setSetting.default('colorSettings', {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			})
			const notFlippedResult: ShapeColorIndex[] = getShapeColorIndices.default({ gridAddress })

			setSetting.default('flipGrain', true)
			const flippedResult: ShapeColorIndex[] = getShapeColorIndices.default({ gridAddress })

			expect(notFlippedResult.reverse()).toEqual(flippedResult)
		})

		it('can turn the grain of the pattern into switcheroo', () => {
			setSetting.default('colorSettings', {
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
			})
			const addresses: Grid<Address> = iterator(4).map((x: number) =>
				iterator(4).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddressToTest: Address) =>
					getShapeColorIndices.default({ gridAddress: gridAddressToTest }))))

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
				({ gridAddress: gridAddressToTransform, shapeColorIndices }: {
					gridAddress: Address, shapeColorIndices: ShapeColorIndex[],
				}): ShapeColorIndex[] => {
					if (from.AddressElement(gridAddressToTransform[ 0 ]) === 1) {
						return shapeColorIndices.concat(shapeColorIndices)
					}
					else {
						return shapeColorIndices
					}
				}

			setSetting.default('colorSettings', {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					transformShapeColorIndices,
					weave: {
						columns: [ 0, 1 ],
						rows: [ 1, 0 ],
					},
				},
			})
			const addresses: Grid<Address> = iterator(2).map((x: number) =>
				iterator(2).map((y: number) =>
					to.Address([ x, y ])))
			const setOfShapeColorIndices: Supertile = to.Supertile(addresses.map((col: Address[]) =>
				col.map((gridAddressToTest: Address) =>
					getShapeColorIndices.default({ gridAddress: gridAddressToTest }))))

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
