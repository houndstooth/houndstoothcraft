import { GetOutline, OutlineOptions, Coordinate } from '../../space'
import { TileColorIndices, Units } from '../../components'

type ShapeParams = {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	stripeIndex?: number,
	tileColorIndices: TileColorIndices,
	tileOrigin: Coordinate,
	tileSize: Units,
}

export default ShapeParams
