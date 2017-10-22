import { HALF, X_INDEX, Y_INDEX } from '../constants'
import { Coordinate } from '../space'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { TileOriginAndSize } from './types'

const tileCenter: (_: TileOriginAndSize) => Coordinate = ({ tileOrigin, tileSize }) => {
	const halfTileSize = from.Unit(tileSize) * HALF

	return to.Coordinate([
		from.Unit(tileOrigin[ X_INDEX ]) + halfTileSize,
		from.Unit(tileOrigin[ Y_INDEX ]) + halfTileSize,
	])
}

export { tileCenter }
