import { Color } from '../../types'
import { Address, Grid, GridAddressParam } from '../grid'

enum AssignmentMode {
	Supertile,
	Weave,
}

interface ColorOptions {
	shapeColorIndex: ShapeColorIndex,
}

enum _ColorSetBrand {}
type ColorSet = _ColorSetBrand & Color[]

interface GetShapeColorIndicesWithOffsetParams extends GridAddressParam {
	addressOffset: Address,
}

type GetShapeColorIndices = (_: GridAddressParam) => ShapeColorIndex[]

type GetShapeColorIndicesWithOffset = (_: GetShapeColorIndicesWithOffsetParams) => ShapeColorIndex[]

enum _SupertileBrand {}
type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

type TransformShapeColorIndices = (_: TransformShapeColorIndicesParams) => ShapeColorIndex[]

interface TransformShapeColorIndicesParams {
	gridAddress: Address,
	shapeColorIndices: ShapeColorIndex[],
}

interface Weave {
	columns: number[],
	rows: number[],
}

interface ShapeColorIndex extends Number {
	// tslint:disable-next-line:no-any
	_ShapeColorIndexBrand: any,
}

type OffsetAddress = (_: { gridAddress: Address }) => Address

export {
	AssignmentMode,
	ColorOptions,
	ColorSet,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	Supertile,
	TransformShapeColorIndices,
	Weave,
	ShapeColorIndex,
	OffsetAddress,
	TransformShapeColorIndicesParams,
}
