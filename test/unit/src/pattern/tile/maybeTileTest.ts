import {
	Address,
	Coordinate,
	getTileOriginAndSize,
	incrementTilesCompleted,
	maybeTile,
	ReferencedAddress,
	tile,
	to,
	Unit,
} from '../../../../../src/indexForTest'

const subject: (_: ReferencedAddress) => void = maybeTile.default

describe('maybe tile', () => {
	let address: Address
	let tileOrigin: Coordinate
	let tileSize: Unit
	const thisPatternRef: number = 99

	beforeEach(() => {
		address = to.Address([ 5, 3 ])
		tileOrigin = to.Coordinate([ 4, 4 ])
		tileSize = to.Unit(7)
		spyOn(tile, 'default')
		spyOn(incrementTilesCompleted, 'default')
	})

	it('calls tile if an origin and size are got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin, tileSize })

		subject({ address, thisPatternRef })

		expect(tile.default).toHaveBeenCalledWith({ address, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue(undefined)

		subject({ address, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin })

		subject({ address, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileSize })

		subject({ address, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		subject({ address, thisPatternRef })

		expect(incrementTilesCompleted.default).toHaveBeenCalled()
	})
})
