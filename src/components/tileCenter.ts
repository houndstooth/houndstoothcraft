import { HALF, X_INDEX, Y_INDEX } from '../constants'
import * as from from '../from'
import { Coordinate } from '../space'
import * as to from '../to'
import { TileOriginAndSize } from './types'

const tileCenter: (_: TileOriginAndSize) => Coordinate = ({ tileOrigin, tileSize }) => {
	const halfTileSize = from.Units(tileSize) * HALF

	return to.Coordinate([
		from.Units(tileOrigin[ X_INDEX ]) + halfTileSize,
		from.Units(tileOrigin[ Y_INDEX ]) + halfTileSize,
	])
}

export { tileCenter }
