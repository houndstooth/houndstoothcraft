// tslint:disable:max-file-line-count

import { Unit } from '../grid'
import { ShapeArgs } from '../texture'
import { TileOriginAndSize } from '../tile'

enum BaseStripeDiagonal {
	Minor,
	Principal,
}

enum _CoordinateBrand {}

type Coordinate = _CoordinateBrand & Unit[]

type GetOutline = (_: GetOutlineParams) => Coordinate[]

interface GetOutlineParams extends TileOriginAndSize {
	readonly outlineOptions?: OutlineOptions,
}

type Outline = Coordinate[]

interface OutlineOptions {
	readonly stripeEnd: StripePosition,
	readonly stripeStart: StripePosition
}

interface Radian extends Number {
	// tslint:disable-next-line:no-any
	_RadianBrand: any,
}

interface RotateCoordinateParams {
	readonly coordinate: Coordinate,
	readonly fixedCoordinate: Coordinate,
	readonly rotation: Radian
}

interface GetStripeArgsParams {
	readonly args: ShapeArgs,
	readonly stripeIndex: number,
	readonly stripePositions: StripePosition[],
	readonly stripeStart: StripePosition,
}

type GetStripePosition = (_: GetStripePositionParams) => StripePosition

interface GetStripePositionParams {
	readonly stripeCount: number,
	readonly stripeIndex: number,
}

interface OutlineAsParam {
	readonly outline: Outline,
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
