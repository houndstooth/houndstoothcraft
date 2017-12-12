import { from, to } from '../../utilities'
import { HALF } from '../constants'
import { Coordinate } from '../stripe'
import { TileOriginAndSize } from './types'

const X_INDEX: number = 0
const Y_INDEX: number = 1

const tileCenter: (_: TileOriginAndSize) => Coordinate =
	({ tileOrigin, tileSize }: TileOriginAndSize): Coordinate => {
		const halfTileSize: number = from.Unit(tileSize) * HALF

		return to.Coordinate([
			from.Unit(tileOrigin[ X_INDEX ]) + halfTileSize,
			from.Unit(tileOrigin[ Y_INDEX ]) + halfTileSize,
		])
	}

export default tileCenter
