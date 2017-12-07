import {
	Address,
	from,
	getTileOriginAndSize,
	GetTileOriginAndSize,
	TileOriginAndSize,
	to,
	Unit,
} from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

describe('get tile origin and size', () => {
	const gridAddressForSubject: Address = to.Address([ 7, 11 ])
	const tileSize: Unit = to.Unit(40)

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		setPatternStateForTest('tileSettings', { tileSize })

		expect(getTileOriginAndSize.default({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 7, from.Unit(tileSize) * 11 ]),
			tileSize: to.Unit(from.Unit(tileSize)),
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom: GetTileOriginAndSize = ({ gridAddress }: { gridAddress: Address }): TileOriginAndSize => {
			const [ x, y ]: number[] = from.Address(gridAddress)

			return {
				tileOrigin: to.Coordinate([ y * from.Unit(tileSize), x * from.Unit(tileSize) ]),
				tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
			}
		}
		setPatternStateForTest('getTileOriginAndSize', custom)

		expect(getTileOriginAndSize.default({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 11, from.Unit(tileSize) * 7 ]),
			tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
		})
	})
})
