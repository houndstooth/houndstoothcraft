import { reversed, wrappedIndex } from '../utilities/codeUtilities'
import state from '../state'

const getTileColorIndices: { ({}: { gridAddress: number[] }): number[] } = ({ gridAddress }) => {
	const assignment = state.mainHoundstooth.basePattern.colorSettings.assignment

	const tileColorIndices = getIndices({ gridAddress, assignment })

	return maybeAdjustTileColorIndices({ assignment, gridAddress, tileColorIndices })
}

type MaybeAdjustTileColorIndices = {
	({}: { assignment: any, gridAddress: number[], tileColorIndices: number[] }): number[],
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

const getIndices: { ({}: { gridAddress: number[], assignment: any }): number[] } = ({ gridAddress, assignment }) => {
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

type GetByWeave = { ({}: { gridAddress: number[], addressOffset: number, weave: any }): number[] }
const getByWeave: GetByWeave = ({ gridAddress, addressOffset, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
	return [ rowsIndex, columnsIndex ]
}

type GetBySupertile = { ({}: { gridAddress: number[], addressOffset: number, supertile: any }): number[] }
const getBySupertile: GetBySupertile = ({ gridAddress, addressOffset, supertile }) => {
	const supertileColumn = wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})
	return wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
}

type ApplySwitcheroo = {({}: { tileColorIndices: number[], gridAddress: number[] }): number[] }
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
