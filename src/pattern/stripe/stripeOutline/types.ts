import { TileOriginAndSize } from '../../tile'
import { Coordinate, GetOutlineParams, Outline, StripePosition } from '../types'

type GetStripeOutline = (_: GetOutlineParams) => Coordinate[]

type Point = (_: PointParams) => Coordinate

interface PointParams extends TileOriginAndSize {
	readonly stripePosition: StripePosition,
}

interface PointsParams extends TileOriginAndSize {
	readonly outline: Outline,
	readonly stripeEndsInBottomRightHalf?: boolean,
	readonly stripeStartsInTopLeftHalf?: boolean,
}

interface PointsParamsPlusStripeEnd extends PointsParams {
	readonly stripeEnd: StripePosition,
}

interface PointsParamsPlusStripeStart extends PointsParams {
	readonly stripeStart: StripePosition,
}

type PointWithKnownPosition = (_: TileOriginAndSize) => Coordinate

export {
	Point,
	GetStripeOutline,
	PointParams,
	PointsParams,
	PointsParamsPlusStripeEnd,
	PointsParamsPlusStripeStart,
	PointWithKnownPosition,
}
