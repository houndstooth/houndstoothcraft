import { StripePosition, TileOriginAndSize, Unit } from '../components'

enum _CoordinateBrand {}

type Coordinate = _CoordinateBrand & Unit[]

type GetOutline = (_: GetOutlineParams) => Coordinate[]

interface GetOutlineParams extends TileOriginAndSize {
	outlineOptions?: OutlineOptions
}

type GetStripeOutline = (_: GetStripeOutlineParams) => Coordinate[]

interface GetStripeOutlineParams extends TileOriginAndSize {
	outlineOptions: OutlineOptions
}

type Outline = Coordinate[]

interface OutlineOptions { stripeEnd?: StripePosition, stripeStart?: StripePosition }

type Point = (_: PointParams) => Coordinate

interface PointParams extends TileOriginAndSize {
	stripePosition?: StripePosition,
}

interface PointsParams extends TileOriginAndSize, OutlineOptions {
	outline: Outline,
	stripeEndsInBottomRightHalf?: boolean,
	stripeStartsInTopLeftHalf?: boolean,
}

interface Radian extends Number {
	// tslint:disable-next-line:no-any
	_RadianBrand: any
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
