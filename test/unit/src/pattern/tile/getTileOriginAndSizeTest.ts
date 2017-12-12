import {
	Address,
	from,
	getTileOriginAndSize,
	GetTileOriginAndSize,
	TileOriginAndSize,
	to,
	Unit,
} from '../../../../../src/indexForTest'
import { setPatternSettingForTest } from '../../../helpers'

describe('get tile origin and size', () => {
	let subject: (_: { gridAddress: Address }) => TileOriginAndSize | undefined
	let gridAddressForSubject: Address
	let tileSize: Unit
	beforeEach(() => {
		subject = getTileOriginAndSize.default
		gridAddressForSubject = to.Address([ 7, 11 ])
		tileSize = to.Unit(40)
	})

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		setPatternSettingForTest('tileSettings', { tileSize })

		expect(subject({ gridAddress: gridAddressForSubject })).toEqual({
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
		setPatternSettingForTest('getTileOriginAndSize', custom)

		expect(subject({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 11, from.Unit(tileSize) * 7 ]),
			tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
		})
	})
})
