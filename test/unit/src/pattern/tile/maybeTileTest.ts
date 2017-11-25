import { Address, Coordinate, getTileOriginAndSize, maybeTile, state, tile, to, Unit } from '../../../../../src'

describe('maybe tile', () => {
	const gridAddress: Address = to.Address([ 5, 3 ])
	const tileOrigin: Coordinate = to.Coordinate([ 4, 4 ])
	const tileSize: Unit = to.Unit(7)
	const thisPatternRef: number = 99

	beforeEach(() => {
		spyOn(tile, 'main')
	})

	it('calls tile if an origin and size are got', () => {
		spyOn(getTileOriginAndSize, 'main').and.returnValue({ tileOrigin, tileSize })

		maybeTile.main({ gridAddress, thisPatternRef })

		expect(tile.main).toHaveBeenCalledWith({ gridAddress, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		spyOn(getTileOriginAndSize, 'main').and.returnValue(undefined)

		maybeTile.main({ gridAddress, thisPatternRef })

		expect(tile.main).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		spyOn(getTileOriginAndSize, 'main').and.returnValue({ tileOrigin })

		maybeTile.main({ gridAddress, thisPatternRef })

		expect(tile.main).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		spyOn(getTileOriginAndSize, 'main').and.returnValue({ tileSize })

		maybeTile.main({ gridAddress, thisPatternRef })

		expect(tile.main).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		state.tilesCompleted = 5

		maybeTile.main({ gridAddress, thisPatternRef })

		expect(state.tilesCompleted).toBe(6)
	})
})
