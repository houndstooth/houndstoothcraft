import { X_INDEX, Y_INDEX } from '../constants'
import { ColorAssignmentSettings, getFromBaseOrDefaultPattern } from '../store'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import * as from from '../utilities/from'
import { Address, AssignmentMode, Supertile, ShapeColorIndex, Weave } from './types'

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
	addressOffset: Address, gridAddress: Address, weave: Weave,
}) => ShapeColorIndex[] = ({ addressOffset, gridAddress, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })

	return to.ShapeColorIndices([ rowsIndex, columnsIndex ])
}

const getBySupertile: (_: {
	addressOffset: Address, gridAddress: Address, supertile: Supertile,
}) => ShapeColorIndex[] = ({ addressOffset, gridAddress, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})

	return to.ShapeColorIndices(wrappedIndex({
		array: supertileColumn,
		index: gridAddress[ 1 ] + addressOffset[ 1 ],
	}))
}

const SWITCHEROO_SIZE = 4

const applySwitcheroo: (_: {
	gridAddress: Address[], shapeColorIndices: ShapeColorIndex[],
}) => ShapeColorIndex[] = ({ gridAddress, shapeColorIndices }) => {
	const xMod = from.Address(gridAddress[ X_INDEX ]) % SWITCHEROO_SIZE
	const yMod = from.Address(gridAddress[ Y_INDEX ]) % SWITCHEROO_SIZE
	if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
		return to.ShapeColorIndices(reversed(shapeColorIndices))
	}

	return shapeColorIndices
}

export { getShapeColorIndices }
