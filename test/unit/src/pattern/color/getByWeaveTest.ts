import { Address, getByWeave, setSetting, to } from '../../../../../src'

describe('get by weave', () => {
	const gridAddress: Address = to.Address([ 3, 5 ])

	it('can use a weave-based assignment scheme', () => {
		setSetting.default('weave', {
			columns: [ 0, 1 ],
			rows: [ 0, 0, 3 ],
		})
		const addressOffset: Address = to.Address([ 0, 0 ])

		expect(getByWeave.default({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})

	it('handles offset', () => {
		setSetting.default('weave', {
			columns: [ 1, 0 ],
			rows: [ 0, 3, 0 ],
		})
		const addressOffset: Address = to.Address([ 1, 2 ])

		expect(getByWeave.default({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})
})
