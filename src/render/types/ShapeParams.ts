import { ShapeColorIndex, TileOriginAndSize } from '../../components'
import { GetOutline, OutlineOptions } from '../../space'

interface ShapeParams extends TileOriginAndSize {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	shapeColorIndices: ShapeColorIndex[],
	stripeIndex?: number,
}

export { ShapeParams }
