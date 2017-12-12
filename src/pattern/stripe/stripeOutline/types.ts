import { TileOriginAndSize } from '../../tile'
import { Coordinate, GetOutlineParams, Outline, StripePosition } from '../types'

type GetStripeOutline = (_: GetOutlineParams) => Coordinate[]

type Point = (_: PointParams) => Coordinate

interface PointParams extends TileOriginAndSize {
	stripePosition: StripePosition,
}

interface PointsParams extends TileOriginAndSize {
	outline: Outline,
	stripeEndsInBottomRightHalf?: boolean,
	stripeStartsInTopLeftHalf?: boolean,
}

interface PointsParamsPlusStripeEnd extends PointsParams {
	stripeEnd: StripePosition,
}

interface PointsParamsPlusStripeStart extends PointsParams {
	stripeStart: StripePosition,
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
