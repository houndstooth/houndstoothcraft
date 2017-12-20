import {
	Address,
	Coordinate,
	incrementTilesCompleted,
	maybeTile,
	patternState,
	ReferencedAddress,
	tile,
	to,
	Unit,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('maybe tile', () => {
	let subject: (_: ReferencedAddress) => void
	let address: Address
	let tileOrigin: Coordinate
	let tileSize: Unit
	const frameId: number = 99
	let getTileOriginAndSizeSpy: Spy

	beforeEach(() => {
		subject = maybeTile.default
		getTileOriginAndSizeSpy = jasmine.createSpy('getTileOriginAndSize')
		patternState.tileSettings.getTileOriginAndSize = getTileOriginAndSizeSpy
		address = to.Address([ 5, 3 ])
		tileOrigin = to.Coordinate([ 4, 4 ])
		tileSize = to.Unit(7)
		spyOn(tile, 'default')
		spyOn(incrementTilesCompleted, 'default')
	})

	it('calls tile if an origin and size are got', () => {
		getTileOriginAndSizeSpy.and.returnValue({ tileOrigin, tileSize })

		subject({ address, frameId })

		expect(tile.default).toHaveBeenCalledWith({ address, tileOrigin, tileSize })
	})

	it('does not call tile if neither origin nor size is got', () => {
		getTileOriginAndSizeSpy.and.returnValue(undefined)

		subject({ address, frameId })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if origin is got but size is not', () => {
		getTileOriginAndSizeSpy.and.returnValue({ tileOrigin })

		subject({ address, frameId })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('does not call tile if size is got but origin is not', () => {
		getTileOriginAndSizeSpy.and.returnValue({ tileSize })

		subject({ address, frameId })

		expect(tile.default).not.toHaveBeenCalled()
	})

	it('increments the count of tiles completed', () => {
		subject({ address, frameId })

		expect(incrementTilesCompleted.default).toHaveBeenCalled()
	})
})
