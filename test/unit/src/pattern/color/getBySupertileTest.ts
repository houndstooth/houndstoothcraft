import { Address, getBySupertile, setSetting, ShapeColorIndex, to } from '../../../../../src'

describe('get by supertile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a supertile-based assignment scheme', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 0, 0 ])

		setSetting.default('supertile', to.Supertile([
			[ [], expectedSupertileEntry ],
			[ [], [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile.default({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})

	it('handles offset', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 1, 1 ])

		setSetting.default('supertile', to.Supertile([
			[ [], [] ],
			[ expectedSupertileEntry, [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile.default({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})
})
