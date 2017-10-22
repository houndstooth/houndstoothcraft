import { getSetting } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { Address, TileOriginAndSize, Unit } from './types'

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize = ({ gridAddress }) => {
	const tileSize: Unit = getSetting('tileSize')

	return {
		tileOrigin: to.Coordinate([ gridAddress[ 0 ] * from.Unit(tileSize), gridAddress[ 1 ] * from.Unit(tileSize) ]),
		tileSize,
	}
}

export { getStandardTileOriginAndSize }
