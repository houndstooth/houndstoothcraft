import { GetOutline } from '../space'

type ShapeArgs = {
	tileOrigin: number[],
	tileSize: number,
	tileColorIndices: number[],
	getOutline: GetOutline,
	stripeIndex?: number,
	outlineOptions?: { stripeStart?: number, stripeEnd?: number },
}

export default ShapeArgs
