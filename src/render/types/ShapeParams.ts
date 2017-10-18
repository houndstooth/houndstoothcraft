import { TileColorIndices, Units } from '../../components'
import { Coordinate, GetOutline, OutlineOptions } from '../../space'

interface ShapeParams {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	stripeIndex?: number,
	tileColorIndices: TileColorIndices,
	tileOrigin: Coordinate,
	tileSize: Units,
}

export { ShapeParams }
