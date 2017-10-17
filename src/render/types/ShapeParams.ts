import { TileColorIndices, Units } from '../../components'
import { Coordinate, GetOutline, OutlineOptions } from '../../space'

type ShapeParams = {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	stripeIndex?: number,
	tileColorIndices: TileColorIndices,
	tileOrigin: Coordinate,
	tileSize: Units,
}

export default ShapeParams
