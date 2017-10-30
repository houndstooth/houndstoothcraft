import { ColorAssignmentSettings, getFromBaseOrDefaultPattern } from '../store'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { applySwitcheroo } from './applySwitcheroo'
import {
	Address,
	AssignmentMode,
	GetShapeColorIndices,
	GetShapeColorIndicesParams,
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	ShapeColorIndex, Supertile,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams, Weave,
} from './types'

const getShapeColorIndices: GetShapeColorIndices =
	({ gridAddress }: GetShapeColorIndicesParams): ShapeColorIndex[] => {
		const shapeColorIndices: ShapeColorIndex[] = getIndices({ gridAddress })

		return maybeAdjustShapeColorIndices({ gridAddress, shapeColorIndices })
	}

const maybeAdjustShapeColorIndices: TransformShapeColorIndices =
	({ gridAddress, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
		const {
			flipGrain,
			switcheroo,
			transformShapeColorIndices,
		}: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignmentSettings')

		let maybeAdjustedShapeColorIndices: ShapeColorIndex[] = shapeColorIndices
		if (flipGrain) {
			maybeAdjustedShapeColorIndices = to.ShapeColorIndices(reversed(shapeColorIndices))
		}
		if (switcheroo) {
			maybeAdjustedShapeColorIndices = applySwitcheroo({
				gridAddress,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}
		if (transformShapeColorIndices) {
			maybeAdjustedShapeColorIndices = transformShapeColorIndices({
				gridAddress,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}

		return maybeAdjustedShapeColorIndices
	}

const getIndices: GetShapeColorIndices =
	({ gridAddress }: GetShapeColorIndicesParams): ShapeColorIndex[] => {
		const {
			offsetAddress,
			assignmentMode,
		}: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignmentSettings')

		const addressOffset: Address = offsetAddress ? offsetAddress({ gridAddress }) : to.Address([ 0, 0 ])

		let getter: GetShapeColorIndicesWithOffset
		if (assignmentMode === AssignmentMode.Weave) {
			getter = getByWeave
		}
		else if (assignmentMode === AssignmentMode.Supertile) {
			getter = getBySupertile
		}
		else {
			return []
		}

		return getter({ gridAddress, addressOffset })
	}

const getBySupertile: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const supertile: Supertile = getFromBaseOrDefaultPattern('supertile')
		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)
		const supertileColumn: ShapeColorIndex[][] = wrappedIndex({ array: supertile, index: x + xOffset })

		return wrappedIndex({ array: supertileColumn, index: y + yOffset })
	}

const getByWeave: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const { rows, columns }: Weave = getFromBaseOrDefaultPattern('weave')

		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const columnsIndex: ShapeColorIndex = to.ShapeColorIndex(wrappedIndex({ array: columns, index: x + xOffset }))
		const rowsIndex: ShapeColorIndex = to.ShapeColorIndex(wrappedIndex({ array: rows, index: y + yOffset }))

		return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
	}

export { getShapeColorIndices }
