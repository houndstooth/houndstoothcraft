import * as from from '../from'
import { getSetting } from '../store'
import * as to from '../to'
import { Address, TileOriginAndSize, Unit } from './types'

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize = ({ gridAddress }) => {
	const tileSize: Unit = getSetting('tileSize')

	return {
		tileOrigin: to.Coordinate([ gridAddress[ 0 ] * from.Unit(tileSize), gridAddress[ 1 ] * from.Unit(tileSize) ]),
		tileSize,
	}
}

export { getStandardTileOriginAndSize }
