import { GetOutline, OutlineOptions, Coordinate } from '../../space'
import { TileColorIndices, Units } from '../../components'

type ShapeParams = {
	tileOrigin: Coordinate,
	tileSize: Units,
	tileColorIndices: TileColorIndices,
	getOutline: GetOutline,
	stripeIndex?: number,
	outlineOptions?: OutlineOptions,
}

export default ShapeParams
