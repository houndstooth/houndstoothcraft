import { Address, getBySupertile, setSetting, ShapeColorIndex, to } from '../../../../../src'

describe('get by supertile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a supertile-based assignment scheme', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 0, 0 ])

		setSetting.main('supertile', to.Supertile([
			[ [], expectedSupertileEntry ],
			[ [], [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile.main({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})

	it('handles offset', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 1, 1 ])

		setSetting.main('supertile', to.Supertile([
			[ [], [] ],
			[ expectedSupertileEntry, [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile.main({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})
})
