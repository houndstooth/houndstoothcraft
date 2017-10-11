import { Coordinate } from '../space'
import { TileOriginAndSize } from './types'

const tileCenter: { ({}: TileOriginAndSize): Coordinate } = ({ tileOrigin, tileSize }) => [
	tileOrigin[ 0 ] + tileSize / 2,
	tileOrigin[ 1 ] + tileSize / 2,
]

export default tileCenter
