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
	readonly stripeEnd?: StripePosition,
	readonly stripeStart?: StripePosition
}

type Point = (_: PointParams) => Coordinate

interface PointParams extends TileOriginAndSize {
	readonly stripePosition?: StripePosition,
}

interface PointsParams extends TileOriginAndSize, OutlineOptions {
	readonly outline: Outline,
	readonly stripeEndsInBottomRightHalf?: boolean,
	readonly stripeStartsInTopLeftHalf?: boolean,
}

interface Radian extends Number {
	// tslint:disable-next-line:no-any
	_RadianBrand: any,
}

export {
	GetOutline,
	GetOutlineParams,
	OutlineOptions,
	Coordinate,
	Outline,
	GetStripeOutline,
	Point,
	PointsParams,
	Radian,
}
