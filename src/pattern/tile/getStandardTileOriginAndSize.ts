import { from, to } from '../../utilities'
import { Address, Unit } from '../grid'
import { get } from '../patternState'
import { TileOriginAndSize } from './types'

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize => {
		const tileSize: Unit = get('tileSize')
		const [ x, y ]: number[] = from.Address(gridAddress)

		return {
			tileOrigin: to.Coordinate([ x * from.Unit(tileSize), y * from.Unit(tileSize) ]),
			tileSize,
		}
	}

export default getStandardTileOriginAndSize
