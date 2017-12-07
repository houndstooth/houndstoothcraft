import {
	Address,
	Coordinate,
	getTileOriginAndSize,
	incrementTilesCompleted,
	maybeTile,
	ReferencedGridAddress,
	tile,
	to,
	Unit,
} from '../../../../../src'

const subject: (_: ReferencedGridAddress) => void = maybeTile.default

describe('maybe tile', () => {
	const gridAddress: Address = to.Address([ 5, 3 ])
	const tileOrigin: Coordinate = to.Coordinate([ 4, 4 ])
	const tileSize: Unit = to.Unit(7)
	const thisPatternRef: number = 99

	beforeEach(() => {
		spyOn(tile, 'default')
		spyOn(incrementTilesCompleted, 'default')
	})

	it('calls tile if an origin and size are got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin, tileSize })

		subject({ gridAddress, thisPatternRef })

		expect(tile.default).toHaveBeenCalledWith({ gridAddress, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue(undefined)

		subject({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin })

		subject({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileSize })

		subject({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		subject({ gridAddress, thisPatternRef })

		expect(incrementTilesCompleted.default).toHaveBeenCalled()
	})
})
