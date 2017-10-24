import { ShapeColorIndex } from '../'
import { GetOutline, GetOutlineParams } from '../../space'

interface ShapeParams extends GetOutlineParams {
	getOutline: GetOutline,
	shapeColorIndices: ShapeColorIndex[],
	stripeIndex?: number,
}

export { ShapeParams }
