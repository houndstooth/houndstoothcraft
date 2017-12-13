// tslint:disable:max-file-line-count

import { ShapeArgs } from '../texture'
import { TileOriginAndSize, Unit } from '../tile'

enum BaseStripeDiagonal {
	Minor,
	Principal,
}

enum _CoordinateBrand {}

type Coordinate = _CoordinateBrand & Unit[]

type GetOutline = (_: GetOutlineParams) => Coordinate[]

interface GetOutlineParams extends TileOriginAndSize {
	outlineOptions?: OutlineOptions,
}

type Outline = Coordinate[]

interface OutlineOptions {
	stripeEnd: StripePosition,
	stripeStart: StripePosition
}

interface Radian extends Number {
	// tslint:disable-next-line:no-any
	_RadianBrand: any,
}

interface RotateCoordinateParams {
	coordinate: Coordinate,
	fixedCoordinate: Coordinate,
	rotation: Radian
}

interface GetStripeArgsParams {
	args: ShapeArgs,
	stripeIndex: number,
	stripePositions: StripePosition[],
	stripeStart: StripePosition,
}

type GetStripePosition = (_: GetStripePositionParams) => StripePosition

interface GetStripePositionParams {
	stripeCount: number,
	stripeIndex: number,
}

interface OutlineAsParam {
	outline: Outline,
}

enum StripeCountMode {
	Standard,
	GinghamChevronContinuum,
}

interface StripePosition extends Number {
	// tslint:disable-next-line:no-any
	_StripePositionBrand: any,
}

// tslint:disable-next-line:no-any
type GetStripePositions = (p?: any) => StripePosition[]

export {
	BaseStripeDiagonal,
	GetStripeArgsParams,
	GetStripePosition,
	OutlineAsParam,
	StripeCountMode,
	GetStripePositions,
	StripePosition,
	GetOutline,
	GetStripePositionParams,
	GetOutlineParams,
	OutlineOptions,
	Coordinate,
	Outline,
	Radian,
	RotateCoordinateParams,
}
