// tslint:disable:max-file-line-count

import { Color } from '../render'
import { Coordinate, GetOutline, GetOutlineParams, Outline } from '../space'

enum _AddressBrand {}

type Address = _AddressBrand & AddressElement[]

interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

enum AssignmentMode {
	Supertile,
	Weave,
}

enum BaseStripeDiagonal {
	Minor,
	Principal,
}

interface ColorOptions {
	readonly shapeColorCount: number,
	readonly shapeColorIndex: ShapeColorIndex,
}

enum _ColorSetBrand {}

type ColorSet = _ColorSetBrand & Color[]

interface ComponentParams extends TileOriginAndSize, ColorOptions, OutlineAsParam {
}

type ExecuteTexture = (_: ExecuteTextureParams) => void

interface ExecuteTextureParams extends TileOriginAndSize {
	readonly shapeColorCount: number,
	readonly shapeColorIndex: ShapeColorIndex,
}

type GetStripePosition = (_: {
	readonly stripeCount: number,
	readonly stripeIndex: number
}) => StripePosition

// tslint:disable-next-line:no-any
type GetStripePositions = (p?: any) => StripePosition[]

// tslint:disable-next-line:no-any
type GetTileOriginAndSize = (p?: any) => TileOriginAndSize | undefined

type Grid<T> = T[][]

type OffsetAddress = (_: { gridAddress: Address }) => Address

interface OutlineAsParam {
	readonly outline: Outline,
}

interface ShapeColorIndex extends Number {
	// tslint:disable-next-line:no-any
	_ShapeColorIndexBrand: any,
}

interface ShapeParams extends GetOutlineParams {
	getOutline: GetOutline,
	shapeColorIndices: ShapeColorIndex[],
	stripeIndex?: number,
}

interface SolidParams {
	readonly outline: Outline,
	readonly shapeColorIndex: ShapeColorIndex,
}

enum StripeCountMode {
	Standard,
	GinghamChevronContinuum,
}

interface StripePosition extends Number {
	// tslint:disable-next-line:no-any
	_StripePositionBrand: any,
}

enum _SupertileBrand {}

type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

interface TextureParams extends ComponentParams {
	readonly executeTexture: ExecuteTexture,
}

interface TileOriginAndSize {
	readonly tileOrigin: Coordinate,
	readonly tileSize: Unit,
}

type TransformShapeColorIndices = (_: {
	gridAddress: Address, shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[]

interface Unit extends Number {
	// tslint:disable-next-line:no-any
	_UnitsBrand: any,
}

interface Weave {
	readonly columns: number[],
	readonly rows: number[],
}

export {
	Address,
	AddressElement,
	AssignmentMode,
	BaseStripeDiagonal,
	ColorOptions,
	ColorSet,
	ComponentParams,
	ExecuteTexture,
	GetStripePosition,
	GetStripePositions,
	GetTileOriginAndSize,
	Grid,
	OffsetAddress,
	ShapeColorIndex,
	ShapeParams,
	SolidParams,
	StripeCountMode,
	StripePosition,
	Supertile,
	TextureParams,
	TileOriginAndSize,
	TransformShapeColorIndices,
	Unit,
	Weave,
}
