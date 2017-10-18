import { X_INDEX, Y_INDEX } from '../constants'
import state from '../state'
import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import { Address, Assignment, AssignmentMode, Supertile, TileColorIndices, Weave } from './types'

const getTileColorIndices: (_: { gridAddress: Address }) => TileColorIndices = ({ gridAddress }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const colorSettings = basePattern.colorSettings || {}
	const assignment = colorSettings.assignment || {}

	const tileColorIndices = getIndices({ gridAddress, assignment })

	return maybeAdjustTileColorIndices({ assignment, gridAddress, tileColorIndices })
}

const maybeAdjustTileColorIndices: (_: {
	assignment: Assignment, gridAddress: Address, tileColorIndices: TileColorIndices,
}) => TileColorIndices = ({ assignment, gridAddress, tileColorIndices }) => {
	const { transformTileColorIndices, flipGrain, switcheroo } = assignment

	let maybeAdjustedTileColorIndices = tileColorIndices
	if (flipGrain) {
		maybeAdjustedTileColorIndices = reversed(tileColorIndices) as TileColorIndices
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
	assignment: Assignment, gridAddress: Address,
}) => TileColorIndices = ({ assignment, gridAddress }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]

	let getter
	if (assignmentMode === AssignmentMode.WEAVE) {
		getter = getByWeave
	}
	else if (assignmentMode === AssignmentMode.SUPERTILE) {
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

	return [ rowsIndex, columnsIndex ] as TileColorIndices
}

const getBySupertile: (_: {
	addressOffset: Address, gridAddress: Address, supertile: Supertile,
}) => TileColorIndices = ({ addressOffset, gridAddress, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})

	return wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] }) as TileColorIndices
}

const SWITCHEROO_SIZE = 4

const applySwitcheroo: (_: {
	gridAddress: Address, tileColorIndices: TileColorIndices,
}) => TileColorIndices = ({ gridAddress, tileColorIndices }) => {
	const xMod = gridAddress[ X_INDEX ] % SWITCHEROO_SIZE as any
	const yMod = gridAddress[ Y_INDEX ] % SWITCHEROO_SIZE as any
	if (!((xMod + yMod) % SWITCHEROO_SIZE)) {
		return reversed(tileColorIndices) as TileColorIndices
	}

	return tileColorIndices
}

export default getTileColorIndices
