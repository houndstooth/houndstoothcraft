import * as getTileOriginAndSize from '../../../../src/components/getTileOriginAndSize'
import { maybeTile } from '../../../../src/components/maybeTile'
import * as tile from '../../../../src/components/tile'
import { Address, Unit } from '../../../../src/components/types'
import { Coordinate } from '../../../../src/space/types'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'

describe('maybe tile', () => {
	const gridAddress: Address = to.Address([ 5, 3 ])
	const tileOrigin: Coordinate = to.Coordinate([ 4, 4 ])
	const tileSize: Unit = to.Unit(7)

	beforeEach(() => {
		spyOn(tile, 'tile')
	})

	it('calls tile if an origin and size are got', () => {
		spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin, tileSize })

		maybeTile({ gridAddress })

		expect(tile.tile).toHaveBeenCalledWith({ gridAddress, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue(undefined)

		maybeTile({ gridAddress })

		expect(tile.tile).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileOrigin })

		maybeTile({ gridAddress })

		expect(tile.tile).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		spyOn(getTileOriginAndSize, 'getTileOriginAndSize').and.returnValue({ tileSize })

		maybeTile({ gridAddress })

		expect(tile.tile).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		state.tilesCompleted = 5

		maybeTile({ gridAddress })

		expect(state.tilesCompleted).toBe(6)
	})
})
