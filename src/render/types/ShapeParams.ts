import { GetOutline, OutlineOptions, Coordinate } from '../../space'
import { TileColorIndices } from '../../components'

type ShapeParams = {
	tileOrigin: Coordinate,
	tileSize: number,
	tileColorIndices: TileColorIndices,
	getOutline: GetOutline,
	stripeIndex?: number,
	outlineOptions?: OutlineOptions,
}

export default ShapeParams
