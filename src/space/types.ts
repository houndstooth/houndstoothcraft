import { StripePosition, TileOriginAndSize, Unit } from '../components'

enum _CoordinateBrand {}

type Coordinate = _CoordinateBrand & Unit[]

type GetOutline = (_: GetOutlineParams) => Coordinate[]

interface GetOutlineParams extends TileOriginAndSize {
	readonly outlineOptions?: OutlineOptions,
}

type GetStripeOutline = (_: GetStripeOutlineParams) => Coordinate[]

interface GetStripeOutlineParams extends TileOriginAndSize {
	readonly outlineOptions: OutlineOptions,
}

type Outline = Coordinate[]

interface OutlineOptions {
	readonly stripeEnd: StripePosition,
	readonly stripeStart: StripePosition
}

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

interface Radian extends Number {
	// tslint:disable-next-line:no-any
	_RadianBrand: any,
}

interface RotateCoordinateParams {
	readonly coordinate: Coordinate,
	readonly fixedCoordinate: Coordinate,
	readonly rotation: Radian
}

export {
	GetOutline,
	GetOutlineParams,
	OutlineOptions,
	Coordinate,
	Outline,
	GetStripeOutline,
	GetStripeOutlineParams,
	Point,
	PointParams,
	PointsParams,
	PointsParamsPlusStripeEnd,
	PointsParamsPlusStripeStart,
	PointWithKnownPosition,
	Radian,
	RotateCoordinateParams,
}
