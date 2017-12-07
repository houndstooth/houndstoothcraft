import { Address, appState, Coordinate, getTileOriginAndSize, maybeTile, tile, to, Unit } from '../../../../../src'

describe('maybe tile', () => {
	const gridAddress: Address = to.Address([ 5, 3 ])
	const tileOrigin: Coordinate = to.Coordinate([ 4, 4 ])
	const tileSize: Unit = to.Unit(7)
	const thisPatternRef: number = 99

	beforeEach(() => {
		spyOn(tile, 'default')
	})

	it('calls tile if an origin and size are got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin, tileSize })

		maybeTile.default({ gridAddress, thisPatternRef })

		expect(tile.default).toHaveBeenCalledWith({ gridAddress, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue(undefined)

		maybeTile.default({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileOrigin })

		maybeTile.default({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		spyOn(getTileOriginAndSize, 'default').and.returnValue({ tileSize })

		maybeTile.default({ gridAddress, thisPatternRef })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		appState.execute.tilesCompleted = 5

		maybeTile.default({ gridAddress, thisPatternRef })

		expect(appState.execute.tilesCompleted).toBe(6)
	})
})
