import OutlineOptions from './OutlineOptions'
import Coordinate from './Coordinate'

type GetOutline = {
	({}: { tileOrigin: Coordinate, tileSize: number, outlineOptions?: OutlineOptions }): Coordinate[],
}

export default GetOutline
