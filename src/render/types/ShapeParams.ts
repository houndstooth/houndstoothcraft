import { TileColorIndices, TileOriginAndSize } from '../../components'
import { GetOutline, OutlineOptions } from '../../space'

interface ShapeParams extends TileOriginAndSize {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	stripeIndex?: number,
	tileColorIndices: TileColorIndices,
}

export { ShapeParams }
