import { setSetting } from '../../../../../src/app/store/setSetting'
import { getByWeave } from '../../../../../src/pattern/color/getByWeave'
import { Address } from '../../../../../src/pattern/grid/types'
import * as to from '../../../../../src/to'

describe('get by weave', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a weave-based assignment scheme', () => {
		setSetting('weave', {
			columns: [ 0, 1 ],
			rows: [ 0, 0, 3 ],
		})
		const addressOffset: Address = to.Address([ 0, 0 ])

		expect(getByWeave({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})

	it('handles offset', () => {
		setSetting('weave', {
			columns: [ 1, 0 ],
			rows: [ 0, 3, 0 ],
		})
		const addressOffset: Address = to.Address([ 1, 2 ])

		expect(getByWeave({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})
})
