import {
	Address,
	from,
	getStandardTileOriginAndSize,
	patternState,
	TileOriginAndSize,
	to,
	Unit,
} from '../../../../../src/indexForTest'

describe('get tile origin and size', () => {
	let subject: (_: { address: Address }) => TileOriginAndSize | undefined
	let gridAddressForSubject: Address
	let tileSize: Unit
	beforeEach(() => {
		subject = getStandardTileOriginAndSize.default
		gridAddressForSubject = to.Address([ 7, 11 ])
		tileSize = to.Unit(40)
	})

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		patternState.tileSettings.tileSize = tileSize

		expect(subject({ address: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 7, from.Unit(tileSize) * 11 ]),
			tileSize: to.Unit(from.Unit(tileSize)),
		})
	})
})
