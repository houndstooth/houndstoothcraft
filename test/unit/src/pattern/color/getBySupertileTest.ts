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
	let address: Address
	beforeEach(() => {
		subject = getBySupertile.default
		address = to.Address([ 3, 5 ])
	})

	it('can use a supertile-based assignment scheme', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 0, 0 ])

		patternState.colorSettings.colorAssignmentSettings.supertile = to.Supertile([
			[ [], expectedSupertileEntry ],
			[ [], [] ],
			[ [], [] ],
		])

		const actualSupertileEntry: ShapeColorIndex[] = subject({ address, addressOffset })
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

		const actualSupertileEntry: ShapeColorIndex[] = subject({ address, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})
})
