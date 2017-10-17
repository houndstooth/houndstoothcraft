import { Coordinate } from '../space'
import { TileOriginAndSize } from './types'

const tileCenter: (_: TileOriginAndSize) => Coordinate = ({ tileOrigin, tileSize }) => {
	const halfTileSize = tileSize as any / 2 as any

	return [
		tileOrigin[ 0 ] as any + halfTileSize,
		tileOrigin[ 1 ] as any + halfTileSize,
	] as Coordinate
}

export default tileCenter
