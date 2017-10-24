import { ColorAssignmentSettings, getFromBaseOrDefaultPattern } from '../store'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { Address, AssignmentMode, ShapeColorIndex, Supertile, Weave } from './types'

const getShapeColorIndices: (_: { gridAddress: Address[] }) => ShapeColorIndex[] = ({ gridAddress }) => {
	const colorAssignment: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignmentSettings')

	const shapeColorIndices = getIndices({ gridAddress, colorAssignment })

	return maybeAdjustShapeColorIndices({ colorAssignment, gridAddress, shapeColorIndices })
}

const maybeAdjustShapeColorIndices: (_: {
	colorAssignment: ColorAssignmentSettings, gridAddress: Address[], shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[] = ({ colorAssignment, gridAddress, shapeColorIndices }) => {
	const { transformShapeColorIndices, flipGrain, switcheroo } = colorAssignment

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
	colorAssignment: ColorAssignmentSettings, gridAddress: Address[],
}) => ShapeColorIndex[] = ({ colorAssignment, gridAddress }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = colorAssignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]

	let getter
	if (assignmentMode === AssignmentMode.Weave) {
		getter = getByWeave
	}
	else if (assignmentMode === AssignmentMode.Supertile) {
		getter = getBySupertile
	}

	return getter({ gridAddress, addressOffset, weave, supertile })
}

const getByWeave: (_: {
	addressOffset: Address[], gridAddress: Address[], weave: Weave,
}) => ShapeColorIndex[] = ({ addressOffset, gridAddress, weave }) => {
	const { rows, columns } = weave
	const [ x, y ] = from.Address(gridAddress)
	const [ xOffset, yOffset ] = from.Address(addressOffset)

	const columnsIndex = wrappedIndex({ array: columns, index: x + xOffset })
	const rowsIndex = wrappedIndex({ array: rows, index: y + yOffset })

	return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
}

const getBySupertile: (_: {
	addressOffset: Address[], gridAddress: Address[], supertile: Supertile,
}) => ShapeColorIndex[] = ({ addressOffset, gridAddress, supertile }) => {
	const [ x, y ] = from.Address(gridAddress)
	const [ xOffset, yOffset ] = from.Address(addressOffset)
	const supertileColumn = wrappedIndex({ array: supertile, index: x + xOffset })

	return wrappedIndex({ array: supertileColumn, index: y + yOffset })
}

const SWITCHEROO_SIZE = 4

const applySwitcheroo: (_: {
	gridAddress: Address[], shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[] = ({ gridAddress, shapeColorIndices }) => {
	const [ x, y ] = from.Address(gridAddress)
	const xMod = x % SWITCHEROO_SIZE
	const yMod = y % SWITCHEROO_SIZE
	if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
		return to.ShapeColorIndices(reversed(shapeColorIndices))
	}

	return shapeColorIndices
}

export { getShapeColorIndices }
