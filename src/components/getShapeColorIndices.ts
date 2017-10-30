import { ColorAssignmentSettings, getFromBaseOrDefaultPattern } from '../store'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import {
	Address, AssignmentMode, GetShapeColorIndices, ShapeColorIndex, TransformShapeColorIndices,
} from './types'

const getShapeColorIndices: (_: { gridAddress: Address }) => ShapeColorIndex[] = ({ gridAddress }) => {
	const colorAssignmentSettings: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignmentSettings')

	const shapeColorIndices = getIndices({ gridAddress, colorAssignmentSettings })

	return maybeAdjustShapeColorIndices({ colorAssignmentSettings, gridAddress, shapeColorIndices })
}

const maybeAdjustShapeColorIndices: (_: {
	colorAssignmentSettings: ColorAssignmentSettings, gridAddress: Address, shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[] = ({ colorAssignmentSettings, gridAddress, shapeColorIndices }) => {
	const { transformShapeColorIndices, flipGrain, switcheroo } = colorAssignmentSettings

	let maybeAdjustedShapeColorIndices = shapeColorIndices
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

const getIndices: (_: {
	colorAssignmentSettings: ColorAssignmentSettings, gridAddress: Address,
}) => ShapeColorIndex[] = ({ colorAssignmentSettings, gridAddress }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = colorAssignmentSettings

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : to.Address([ 0, 0 ])

	let getter: GetShapeColorIndices
	if (assignmentMode === AssignmentMode.Weave) {
		getter = getByWeave
	}
	else if (assignmentMode === AssignmentMode.Supertile) {
		getter = getBySupertile
	}
	else {
		return []
	}

	return getter({ gridAddress, addressOffset, weave, supertile })
}

const getByWeave: GetShapeColorIndices = ({ addressOffset, gridAddress, weave }) => {
	const { rows = [], columns = [] } = weave || {}
	const [ x, y ] = from.Address(gridAddress)
	const [ xOffset, yOffset ] = from.Address(addressOffset)

	const columnsIndex = wrappedIndex({ array: columns, index: x + xOffset })
	const rowsIndex = wrappedIndex({ array: rows, index: y + yOffset })

	return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
}

const getBySupertile: GetShapeColorIndices = ({ addressOffset, gridAddress, supertile = [] }) => {
	const [ x, y ] = from.Address(gridAddress)
	const [ xOffset, yOffset ] = from.Address(addressOffset)
	const supertileColumn = wrappedIndex({ array: supertile, index: x + xOffset })

	return wrappedIndex({ array: supertileColumn, index: y + yOffset })
}

const SWITCHEROO_SIZE = 4

const applySwitcheroo: TransformShapeColorIndices = ({ gridAddress, shapeColorIndices }) => {
	const [ x, y ] = from.Address(gridAddress)
	const xMod = x % SWITCHEROO_SIZE
	const yMod = y % SWITCHEROO_SIZE
	if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
		return to.ShapeColorIndices(reversed(shapeColorIndices))
	}

	return shapeColorIndices
}

export { getShapeColorIndices }
