import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import state from '../state'
import { Address, TileColorIndices, Assignment, Supertile, Weave } from './types'

const getTileColorIndices: { ({}: { gridAddress: Address }): TileColorIndices } = ({ gridAddress }) => {
	const assignment = state.mainHoundstooth.basePattern.colorSettings.assignment

	const tileColorIndices = getIndices({ gridAddress, assignment })

	return maybeAdjustTileColorIndices({ assignment, gridAddress, tileColorIndices })
}

const maybeAdjustTileColorIndices: {
	({}: { assignment: Assignment, gridAddress: Address, tileColorIndices: TileColorIndices }): TileColorIndices,
} = ({ assignment, gridAddress, tileColorIndices }) => {
	const { transformTileColorIndices, flipGrain, switcheroo } = assignment

	let maybeAdjustedTileColorIndices = tileColorIndices
	if (flipGrain) {
		maybeAdjustedTileColorIndices = reversed(tileColorIndices) as TileColorIndices
	}
	if (switcheroo) {
		maybeAdjustedTileColorIndices = applySwitcheroo({
			tileColorIndices: maybeAdjustedTileColorIndices,
			gridAddress,
		})
	}
	if (transformTileColorIndices) {
		maybeAdjustedTileColorIndices = transformTileColorIndices({
			tileColorIndices: maybeAdjustedTileColorIndices,
			gridAddress,
		})
	}

	return maybeAdjustedTileColorIndices
}

const getIndices: {
	({}: { gridAddress: Address, assignment: Assignment }): TileColorIndices,
} = ({ gridAddress, assignment }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]

	let getter
	if (assignmentMode === 'WEAVE') {
		getter = getByWeave
	}
	else if (assignmentMode === 'SUPERTILE') {
		getter = getBySupertile
	}

	return getter({ gridAddress, addressOffset, weave, supertile })
}

const getByWeave: {
	({}: { gridAddress: Address, addressOffset: Address, weave: Weave }): TileColorIndices,
} = ({ gridAddress, addressOffset, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })

	return [ rowsIndex, columnsIndex ] as TileColorIndices
}

const getBySupertile: {
	({}: { gridAddress: Address, addressOffset: Address, supertile: Supertile }): TileColorIndices,
} = ({ gridAddress, addressOffset, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})

	return wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] }) as TileColorIndices
}

const applySwitcheroo: {
	({}: { tileColorIndices: TileColorIndices, gridAddress: Address }): TileColorIndices,
} = ({ tileColorIndices, gridAddress }) => {
	const xMod = gridAddress[ 0 ] % 4
	const yMod = gridAddress[ 1 ] % 4
	if (
		xMod === 1 && yMod === 1 ||
		xMod === 3 && yMod === 3 ||
		xMod === 2 && yMod === 0 ||
		xMod === 0 && yMod === 2
	) {
		return reversed(tileColorIndices) as TileColorIndices
	}

	return tileColorIndices
}

export default getTileColorIndices
