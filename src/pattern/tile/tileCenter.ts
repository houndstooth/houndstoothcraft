import { HALF, X_INDEX, Y_INDEX } from '../../constants'
import * as from from '../../from'
import * as to from '../../to'
import { Coordinate } from '../stripe'
import { TileOriginAndSize } from './types'

const tileCenter: (_: TileOriginAndSize) => Coordinate =
	({ tileOrigin, tileSize }: TileOriginAndSize): Coordinate => {
		const halfTileSize: number = from.Unit(tileSize) * HALF

		return to.Coordinate([
			from.Unit(tileOrigin[ X_INDEX ]) + halfTileSize,
			from.Unit(tileOrigin[ Y_INDEX ]) + halfTileSize,
		])
	}

export { tileCenter }
