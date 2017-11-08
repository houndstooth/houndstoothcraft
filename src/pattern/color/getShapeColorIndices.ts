// tslint:disable:max-file-line-count

import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { Address, GridAddressParam } from '../grid'
import { applySwitcheroo } from './applySwitcheroo'
import { ColorAssignmentSettings } from './colorAssignmentSettings'
import {
	AssignmentMode,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	GetShapeColorIndicesWithOffsetParams,
	ShapeColorIndex,
	Supertile,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
	Weave,
} from './types'

const getShapeColorIndices: GetShapeColorIndices =
	({ gridAddress }: GridAddressParam): ShapeColorIndex[] => {
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
			maybeAdjustedShapeColorIndices = to.ShapeColorIndices(codeUtilities.reversed(shapeColorIndices))
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
	({ gridAddress }: GridAddressParam): ShapeColorIndex[] => {
		const {
			offsetAddress,
			assignmentMode,
		}: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignmentSettings')

		// tslint:disable-next-line:max-line-length
		const getter: GetShapeColorIndicesWithOffset = assignmentMode === AssignmentMode.Weave ? getByWeave : getBySupertile

		const addressOffset: Address = offsetAddress ? offsetAddress({ gridAddress }) : to.Address([ 0, 0 ])

		return getter({ gridAddress, addressOffset })
	}

const getBySupertile: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const supertile: Supertile = getFromBaseOrDefaultPattern('supertile')
		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)
		const supertileColumn: ShapeColorIndex[][] = codeUtilities.wrappedIndex({
			array: supertile,
			index: x + xOffset,
		})

		return codeUtilities.wrappedIndex({ array: supertileColumn, index: y + yOffset })
	}

const getByWeave: GetShapeColorIndicesWithOffset =
	({ addressOffset, gridAddress }: GetShapeColorIndicesWithOffsetParams): ShapeColorIndex[] => {
		const { rows, columns }: Weave = getFromBaseOrDefaultPattern('weave')

		const [ x, y ]: number[] = from.Address(gridAddress)
		const [ xOffset, yOffset ]: number[] = from.Address(addressOffset)

		const columnsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: columns,
			index: x + xOffset,
		}))
		const rowsIndex: ShapeColorIndex = to.ShapeColorIndex(codeUtilities.wrappedIndex({
			array: rows,
			index: y + yOffset,
		}))

		return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
	}

export { getShapeColorIndices }
