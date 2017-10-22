import { TileColorIndex, TileOriginAndSize } from '../../components'
import { GetOutline, OutlineOptions } from '../../space'

interface ShapeParams extends TileOriginAndSize {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	stripeIndex?: number,
	tileColorIndices: TileColorIndex[],
}

export { ShapeParams }
