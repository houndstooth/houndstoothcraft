// tslint:disable:max-file-line-count

import { ShapeArgs } from '../texture'
import { Coordinate, Outline, TileOriginAndSize } from '../tile'

enum BaseStripeDiagonal {
	Minor,
	Principal,
}

type GetOutline = (_: GetOutlineParams) => Outline

interface GetOutlineParams extends TileOriginAndSize {
	outlineOptions?: OutlineOptions,
}

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
