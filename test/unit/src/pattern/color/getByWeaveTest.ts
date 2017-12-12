import { Address, getByWeave, GetShapeColorIndicesWithOffset, to } from '../../../../../src/indexForTest'
import { setPatternSettingForTest } from '../../../helpers'

describe('get by weave', () => {
	let gridAddress: Address
	let subject: GetShapeColorIndicesWithOffset
	beforeEach(() => {
		gridAddress = to.Address([ 3, 5 ])
		subject = getByWeave.default
	})

	it('can use a weave-based assignment scheme', () => {
		setPatternSettingForTest('weave', {
			columns: [ 0, 1 ],
			rows: [ 0, 0, 3 ],
		})
		const addressOffset: Address = to.Address([ 0, 0 ])

		expect(subject({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})

	it('handles offset', () => {
		setPatternSettingForTest('weave', {
			columns: [ 1, 0 ],
			rows: [ 0, 3, 0 ],
		})
		const addressOffset: Address = to.Address([ 1, 2 ])

		expect(subject({ gridAddress, addressOffset })).toEqual(to.ShapeColorIndices([ 3, 1 ]))
	})
})
