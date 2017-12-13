import { Color } from '../../types'
import { Address, AddressAsParam, Grid } from '../grid'
import { ShapeColorIndicesAsParam } from '../texture'

enum AssignmentMode {
	Supertile,
	Weave,
}

interface ColorOptions {
	shapeColorIndex: ShapeColorIndex,
}

enum _ColorSetBrand {}
type ColorSet = _ColorSetBrand & Color[]

interface GetShapeColorIndicesWithOffsetParams extends AddressAsParam {
	addressOffset: Address,
}

type GetShapeColorIndices = (_: AddressAsParam) => ShapeColorIndex[]

type GetShapeColorIndicesWithOffset = (_: GetShapeColorIndicesWithOffsetParams) => ShapeColorIndex[]

enum _SupertileBrand {}
type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

type TransformShapeColorIndices = (_: TransformShapeColorIndicesParams) => ShapeColorIndex[]

interface TransformShapeColorIndicesParams extends AddressAsParam, ShapeColorIndicesAsParam {
}

interface Weave {
	columns: number[],
	rows: number[],
}

interface ShapeColorIndex extends Number {
	// tslint:disable-next-line:no-any
	_ShapeColorIndexBrand: any,
}

type OffsetAddress = (_: AddressAsParam) => Address

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
