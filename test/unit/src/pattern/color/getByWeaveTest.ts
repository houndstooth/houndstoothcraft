import { Address, getByWeave, to } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

describe('get by weave', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a weave-based assignment scheme', () => {
		setPatternStateForTest('weave', {
			columns: [ 0, 1 ],
			rows: [ 0, 0, 3 ],
		})
		const addressOffset: Address = to.Address([ 0, 0 ])

		expect(getByWeave.default({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})

	it('handles offset', () => {
		setPatternStateForTest('weave', {
			columns: [ 1, 0 ],
			rows: [ 0, 3, 0 ],
		})
		const addressOffset: Address = to.Address([ 1, 2 ])

		expect(getByWeave.default({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})
})
