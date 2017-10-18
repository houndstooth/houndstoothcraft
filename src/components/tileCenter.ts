import { HALF, X_INDEX, Y_INDEX } from '../constants'
import { Coordinate } from '../space'
import { TileOriginAndSize } from './types'

const tileCenter: (_: TileOriginAndSize) => Coordinate = ({ tileOrigin, tileSize }) => {
	const halfTileSize = tileSize as any * HALF

	return [
		tileOrigin[ X_INDEX ] as any + halfTileSize,
		tileOrigin[ Y_INDEX ] as any + halfTileSize,
	] as Coordinate
}

export { tileCenter }
