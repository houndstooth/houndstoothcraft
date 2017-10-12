import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import state from '../state'
import { Address, TileColorIndices, Assignment, Supertile, Weave } from './types'

const getTileColorIndices: { ({}: { gridAddress: Address }): TileColorIndices } = ({ gridAddress }) => {
	const assignment = state.mainHoundstooth.basePattern.colorSettings.assignment

	const tileColorIndices = getIndices({ gridAddress, assignment })

	return maybeAdjustTileColorIndices({ assignment, gridAddress, tileColorIndices })
}

type MaybeAdjustTileColorIndices = {
	({}: { assignment: Assignment, gridAddress: Address, tileColorIndices: TileColorIndices }): TileColorIndices,
}

const maybeAdjustTileColorIndices: MaybeAdjustTileColorIndices = ({ assignment, gridAddress, tileColorIndices }) => {
	const { transformTileColorIndices, flipGrain, switcheroo } = assignment

	if (flipGrain) {
		tileColorIndices = reversed(tileColorIndices)
	}
	if (switcheroo) {
		tileColorIndices = applySwitcheroo({ tileColorIndices, gridAddress })
	}
	if (transformTileColorIndices) {
		tileColorIndices = transformTileColorIndices({ tileColorIndices, gridAddress })
	}

	return tileColorIndices
}

type GetIndices = { ({}: { gridAddress: Address, assignment: Assignment }): TileColorIndices }

const getIndices: GetIndices = ({ gridAddress, assignment }) => {
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

type GetByWeave = { ({}: { gridAddress: Address, addressOffset: Address, weave: Weave }): TileColorIndices }

const getByWeave: GetByWeave = ({ gridAddress, addressOffset, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
	return [ rowsIndex, columnsIndex ]
}

type GetBySupertile = { ({}: { gridAddress: Address, addressOffset: Address, supertile: Supertile }): TileColorIndices }

const getBySupertile: GetBySupertile = ({ gridAddress, addressOffset, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})
	return wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
}

type ApplySwitcheroo = {({}: { tileColorIndices: TileColorIndices, gridAddress: Address }): TileColorIndices }

const applySwitcheroo: ApplySwitcheroo = ({ tileColorIndices, gridAddress }) => {
	const xMod = gridAddress[ 0 ] % 4
	const yMod = gridAddress[ 1 ] % 4
	if (
		xMod === 1 && yMod === 1 ||
		xMod === 3 && yMod === 3 ||
		xMod === 2 && yMod === 0 ||
		xMod === 0 && yMod === 2
	) {
		return reversed(tileColorIndices)
	}

	return tileColorIndices
}

export default getTileColorIndices
