import { setSetting } from '../../../../../src/app/store/setSetting'
import { getBySupertile } from '../../../../../src/pattern/color/getBySupertile'
import { ShapeColorIndex } from '../../../../../src/pattern/color/types'
import { Address } from '../../../../../src/pattern/grid/types'
import * as to from '../../../../../src/to'

describe('get by supertile', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a supertile-based assignment scheme', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 0, 0 ])

		setSetting('supertile', to.Supertile([
			[ [], expectedSupertileEntry ],
			[ [], [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})

	it('handles offset', () => {
		const expectedSupertileEntry: ShapeColorIndex[] = to.ShapeColorIndices([ 2, 3, 0, 1 ])
		const addressOffset: Address = to.Address([ 1, 1 ])

		setSetting('supertile', to.Supertile([
			[ [], [] ],
			[ expectedSupertileEntry, [] ],
			[ [], [] ],
		]))

		const actualSupertileEntry: ShapeColorIndex[] = getBySupertile({ gridAddress, addressOffset })
		expect(actualSupertileEntry).toEqual(to.ShapeColorIndices(expectedSupertileEntry))
	})
})
