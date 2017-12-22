import { Address, getAddresses, Grid, patternState, to } from '../../../../../src/indexForTest'

describe('get addresses', () => {
	let subject: () => Grid<Address>
	beforeEach(() => {
		subject = getAddresses.default
	})

	it('returns a grid of addresses', () => {
		patternState.gridSettings.tileResolution = 3

		const actualGridAddresses: Grid<Address> = subject()

		const expectedGridAddresses: Grid<Address> = [
			[
				to.Address([ 0, 0 ]),
				to.Address([ 0, 1 ]),
				to.Address([ 0, 2 ]),
			],
			[
				to.Address([ 1, 0 ]),
				to.Address([ 1, 1 ]),
				to.Address([ 1, 2 ]),
			],
			[
				to.Address([ 2, 0 ]),
				to.Address([ 2, 1 ]),
				to.Address([ 2, 2 ]),
			],
		]
		expect(actualGridAddresses).toEqual(expectedGridAddresses)
	})

	it('returns the right grid when including negative quadrants', () => {
		patternState.gridSettings.tileResolution = 2
		patternState.gridSettings.includeNegativeQuadrants = true

		const actualGridAddresses: Grid<Address> = subject()

		const expectedGridAddresses: Grid<Address> = [
			[
				to.Address([ -2, -2 ]),
				to.Address([ -2, -1 ]),
				to.Address([ -2, 0 ]),
				to.Address([ -2, 1 ]),
			],
			[
				to.Address([ -1, -2 ]),
				to.Address([ -1, -1 ]),
				to.Address([ -1, 0 ]),
				to.Address([ -1, 1 ]),
			],
			[
				to.Address([ 0, -2 ]),
				to.Address([ 0, -1 ]),
				to.Address([ 0, 0 ]),
				to.Address([ 0, 1 ]),
			],
			[
				to.Address([ 1, -2 ]),
				to.Address([ 1, -1 ]),
				to.Address([ 1, 0 ]),
				to.Address([ 1, 1 ]),
			],
		]
		expect(actualGridAddresses).toEqual(expectedGridAddresses)
	})
})
