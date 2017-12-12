import {
	Address,
	getBySupertile,
	GetShapeColorIndicesWithOffset,
	patternState,
	ShapeColorIndex,
	to,
} from '../../../../../src/indexForTest'

describe('get by supertile', () => {
	let subject: GetShapeColorIndicesWithOffset
	let gridAddress: Address
	beforeEach(() => {
		subject = getBySupertile.default
		gridAddress = to.Address([ 3, 5 ])
	})

	it('can use a supertile-based assignment scheme', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 0, 0 ])

		patternState.colorSettings.colorAssignmentSettings.supertile = to.Supertile([
			[ [], expectedSupertileEntry ],
			[ [], [] ],
			[ [], [] ],
		])

		const actualSupertileEntry: ShapeColorIndex[] = subject({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})

	it('handles offset', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 1, 1 ])

		patternState.colorSettings.colorAssignmentSettings.supertile = to.Supertile([
			[ [], [] ],
			[ expectedSupertileEntry, [] ],
			[ [], [] ],
		])

		const actualSupertileEntry: ShapeColorIndex[] = subject({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})
})
