import { X_INDEX, Y_INDEX } from '../constants'
import { ColorAssignmentSettings, getFromBaseOrDefaultPattern } from '../store'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { Address, AssignmentMode, Supertile, TileColorIndices, Weave } from './types'

const getTileColorIndices: (_: { gridAddress: Address }) => TileColorIndices = ({ gridAddress }) => {
	const colorAssignment: ColorAssignmentSettings = getFromBaseOrDefaultPattern('colorAssignment')

	const tileColorIndices = getIndices({ gridAddress, colorAssignment })

	return maybeAdjustTileColorIndices({ colorAssignment, gridAddress, tileColorIndices })
}

const maybeAdjustTileColorIndices: (_: {
	colorAssignment: ColorAssignmentSettings, gridAddress: Address, tileColorIndices: TileColorIndices,
}) => TileColorIndices = ({ colorAssignment, gridAddress, tileColorIndices }) => {
	const { transformTileColorIndices, flipGrain, switcheroo } = colorAssignment

	let maybeAdjustedTileColorIndices = tileColorIndices
	if (flipGrain) {
		maybeAdjustedTileColorIndices = to.TileColorIndices(reversed(tileColorIndices))
	}
	if (switcheroo) {
		maybeAdjustedTileColorIndices = applySwitcheroo({
			gridAddress,
			tileColorIndices: maybeAdjustedTileColorIndices,
		})
	}
	if (transformTileColorIndices) {
		maybeAdjustedTileColorIndices = transformTileColorIndices({
			gridAddress,
			tileColorIndices: maybeAdjustedTileColorIndices,
		})
	}

	return maybeAdjustedTileColorIndices
}

const getIndices: (_: {
	colorAssignment: ColorAssignmentSettings, gridAddress: Address,
}) => TileColorIndices = ({ colorAssignment, gridAddress }) => {
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
}) => TileColorIndices = ({ addressOffset, gridAddress, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })

	return to.TileColorIndices([ rowsIndex, columnsIndex ])
}

const getBySupertile: (_: {
	addressOffset: Address, gridAddress: Address, supertile: Supertile,
}) => TileColorIndices = ({ addressOffset, gridAddress, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})

	return to.TileColorIndices(wrappedIndex({
		array: supertileColumn,
		index: gridAddress[ 1 ] + addressOffset[ 1 ],
	}))
}

const SWITCHEROO_SIZE = 4

const applySwitcheroo: (_: {
	gridAddress: Address, tileColorIndices: TileColorIndices,
}) => TileColorIndices = ({ gridAddress, tileColorIndices }) => {
	const xMod = gridAddress[ X_INDEX ] % SWITCHEROO_SIZE
	const yMod = gridAddress[ Y_INDEX ] % SWITCHEROO_SIZE
	if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
		return to.TileColorIndices(reversed(tileColorIndices))
	}

	return tileColorIndices
}

export { getTileColorIndices }
