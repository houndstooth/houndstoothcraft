import { Address, getByWeave, GetShapeColorIndicesWithOffset, patternState, to } from '../../../../../src/indexForTest'

describe('get by weave', () => {
	let address: Address
	let subject: GetShapeColorIndicesWithOffset
	beforeEach(() => {
		address = to.Address([ 3, 5 ])
		subject = getByWeave.default
	})

	it('can use a weave-based assignment scheme', () => {
		patternState.colorSettings.colorAssignmentSettings.weave = {
			columns: [ 0, 1 ],
			rows: [ 0, 0, 3 ],
		}
		const addressOffset: Address = to.Address([ 0, 0 ])

		expect(subject({ address, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})

	it('handles offset', () => {
		patternState.colorSettings.colorAssignmentSettings.weave = {
			columns: [ 1, 0 ],
			rows: [ 0, 3, 0 ],
		}
		const addressOffset: Address = to.Address([ 1, 2 ])

		expect(subject({ address, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})
})
