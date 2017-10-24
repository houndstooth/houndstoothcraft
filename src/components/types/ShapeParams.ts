import { ShapeColorIndex, TileOriginAndSize } from '../'
import { GetOutline, OutlineOptions } from '../../space'

interface ShapeParams extends TileOriginAndSize {
	getOutline: GetOutline,
	outlineOptions?: OutlineOptions,
	shapeColorIndices: ShapeColorIndex[],
	stripeIndex?: number,
}

export { ShapeParams }
