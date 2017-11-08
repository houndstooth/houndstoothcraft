// tslint:disable:member-ordering

import { Address, Grid, GridAddressParam } from '../grid'

interface Color {
	readonly r?: number,
	readonly g?: number,
	readonly b?: number,
	readonly a: number,
	readonly [index: string]: number | undefined,
}

enum AssignmentMode {
	Supertile,
	Weave,
}

interface ColorOptions {
	readonly shapeColorIndex: ShapeColorIndex,
}

enum _ColorSetBrand {}

type ColorSet = _ColorSetBrand & Color[]

export {
	Color,
}

interface GetShapeColorIndicesWithOffsetParams extends GridAddressParam {
	readonly addressOffset: Address,
}

type GetShapeColorIndices = (_: GridAddressParam) => ShapeColorIndex[]

type GetShapeColorIndicesWithOffset = (_: GetShapeColorIndicesWithOffsetParams) => ShapeColorIndex[]

enum _SupertileBrand {}

type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

type TransformShapeColorIndices = (_: TransformShapeColorIndicesParams) => ShapeColorIndex[]

interface TransformShapeColorIndicesParams {
	readonly gridAddress: Address,
	readonly shapeColorIndices: ShapeColorIndex[],
}

interface Weave {
	readonly columns: number[],
	readonly rows: number[],
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
